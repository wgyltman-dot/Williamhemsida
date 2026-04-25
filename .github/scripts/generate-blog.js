const fetch = (...args) => import('node-fetch').then(({default: f}) => f(...args));
const fs = require('fs');
const path = require('path');

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const GITHUB_TOKEN = process.env.TOKEN_CUSTOM;
const REPO_OWNER = 'wgyltman-dot';
const REPO_NAME = 'Williamhemsida';

const topics = JSON.parse(fs.readFileSync(path.join(__dirname, 'topics.json'), 'utf8'));

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function getNextTopic(type) {
  const used = topics.used[type] || [];
  const available = topics[type].filter(function(t) { return !used.includes(t.topic); });
  if (available.length === 0) {
    topics.used[type] = [];
    return topics[type][0];
  }
  return available[0];
}

function markTopicUsed(type, topic) {
  if (!topics.used[type]) topics.used[type] = [];
  topics.used[type].push(topic);
}

async function callClaude(prompt) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages: [{ role: 'user', content: prompt }]
    })
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.content[0].text;
}

async function publishToGitHub(filename, content, folder) {
  const filePath = folder + '/' + filename;
  const url = 'https://api.github.com/repos/' + REPO_OWNER + '/' + REPO_NAME + '/contents/' + filePath;
  const encoded = Buffer.from(content).toString('base64');

  let sha;
  const checkRes = await fetch(url, {
    headers: {
      'Authorization': 'Bearer ' + GITHUB_TOKEN,
      'Accept': 'application/vnd.github.v3+json'
    }
  });
  if (checkRes.ok) {
    const existing = await checkRes.json();
    sha = existing.sha;
  }

  const body = { message: 'auto: publish ' + filename, content: encoded };
  if (sha) body.sha = sha;

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + GITHUB_TOKEN,
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github.v3+json'
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'GitHub publish failed');
  }
  console.log('Published: ' + filePath);
}

async function main() {
  const topicData = getNextTopic('blog');
  const dateStr = new Date().toISOString().split('T')[0];
  const slug = dateStr + '-' + slugify(topicData.topic);

  console.log('Generating blog post: ' + topicData.topic);

  const prompt = 'You are a content writer for williamreviews.com, an independent software review and marketing insights site run by William Gyltman.\n\n' +
    'BRAND BIBLE CONTEXT:\n' +
    '- Target audience: CEOs and CMOs at B2B companies worried about AI search visibility\n' +
    '- Core proof points: 223% average AI visibility increase, 74% increase in one month for an ecommerce brand, 50+ brands tracked, most brands start with near-zero AI visibility\n' +
    '- Brand voice: Direct, conversational, practitioner voice - not corporate. Like a smart founder talking to a peer. Short punchy sentences. Specific numbers over vague claims.\n' +
    '- Primary category to own: GEO (Generative Engine Optimisation)\n' +
    '- Product to mention naturally: Rankad.ai - tracks and automatically optimises brand visibility in ChatGPT, Perplexity, and Google AI Overviews on autopilot\n' +
    '- Rankad.ai mention style: ' + (topicData.mentionStyle || 'Mention naturally as one of several solutions') + '\n\n' +
    'CONTENT SPECS:\n' +
    '- Topic: ' + topicData.topic + '\n' +
    '- Content pillar: ' + topicData.pillar + '\n' +
    '- Target audience: ' + topicData.audience + '\n' +
    '- Length: 1300-1600 words\n' +
    '- Include at least one comparison table or structured checklist\n' +
    '- Include FAQ section with 4-5 questions and direct answers\n' +
    '- Use specific tool names, real data points, concrete examples\n' +
    '- GEO-friendly format: direct answers, clear H2/H3 structure, specific facts\n\n' +
    'Output ONLY the complete markdown file - no preamble, no explanation:\n\n' +
    '---\n' +
    'title: "[compelling SEO title including primary keyword]"\n' +
    'date: "' + dateStr + '"\n' +
    'excerpt: "[1-2 sentence excerpt with primary keyword, under 160 chars]"\n' +
    'tags: ["GEO", "AI Search", "' + topicData.pillar + '", "Digital Marketing"]\n' +
    '---\n\n' +
    '[full blog post content]';

  try {
    const content = await callClaude(prompt);
    await publishToGitHub(slug + '.md', content, 'posts');
    markTopicUsed('blog', topicData.topic);
    await publishToGitHub('topics.json', JSON.stringify(topics, null, 2), '.github/scripts');
    console.log('Blog post published successfully');
  } catch (e) {
    console.error('Error: ' + e.message);
    process.exit(1);
  }
}

main();

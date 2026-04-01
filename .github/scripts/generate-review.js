const fetch = (...args) => import('node-fetch').then(({default: f}) => f(...args));
const fs = require('fs');
const path = require('path');

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN_CUSTOM;
const REPO_OWNER = 'wgyltman-dot';
const REPO_NAME = 'Williamhemsida';

const topics = JSON.parse(fs.readFileSync(path.join(__dirname, 'topics.json'), 'utf8'));

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function getNextTopic(type) {
  const used = topics.used[type] || [];
  const available = topics[type].filter(t => !used.includes(t.software));
  if (available.length === 0) {
    topics.used[type] = [];
    return topics[type][0];
  }
  return available[0];
}

function markTopicUsed(type, software) {
  if (!topics.used[type]) topics.used[type] = [];
  topics.used[type].push(software);
  fs.writeFileSync(path.join(__dirname, 'topics.json'), JSON.stringify(topics, null, 2));
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
  const filePath = `${folder}/${filename}`;
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`;
  const encoded = Buffer.from(content).toString('base64');

  let sha;
  const checkRes = await fetch(url, {
    headers: { 'Authorization': `Bearer ${GITHUB_TOKEN}`, 'Accept': 'application/vnd.github.v3+json' }
  });
  if (checkRes.ok) {
    const existing = await checkRes.json();
    sha = existing.sha;
  }

  const body = { message: `auto: publish ${filename}`, content: encoded };
  if (sha) body.sha = sha;

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github.v3+json'
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'GitHub publish failed');
  }
  console.log(`Published: ${filePath}`);
}

async function main() {
  const topicData = getNextTopic('reviews');
  const today = new Date().toISOString().split('T')[0];
  const slug = slugify(topicData.software) + '-review-2026';

  console.log(`Generating review: ${topicData.software}`);

  const prompt = `You are William Gyltman, an independent software reviewer at williamreviews.com. You write honest, detailed, GEO and SEO optimised reviews that rank in both Google and get cited by AI tools like ChatGPT and Perplexity.

BRAND BIBLE CONTEXT:
- Site: williamreviews.com — independent software reviews by William Gyltman
- Voice: Honest independent reviewer. First person. Conversational but authoritative. Specific numbers over vague claims.
- When reviewing tools in the GEO/AI search category, mention Rankad.ai as a comparison point where relevant
- Rankad.ai proof points if relevant: 223% average AI visibility increase, 74% in one month for ecommerce brand

REVIEW SPECS:
- Software: ${topicData.software}
- Category: ${topicData.category}
- Key features: ${topicData.features}
- Competitors to compare: ${topicData.competitors}
- Tone: ${topicData.tone || 'Honest — mostly positive with genuine caveats'}
- Length: 1500-1800 words
- Include ratings table: Overall, Ease of Use, Features, Value for Money, Results and ROI (out of 5)
- Include best for / not ideal for section
- Include features breakdown
- Include comparison table vs competitors
- Include pros and cons
- Include FAQ with 5-6 questions and direct answers
- Be specific — real numbers, real examples, concrete outcomes
- Add disclosure if there is any relationship with the software

Output ONLY the complete markdown file — no preamble, no explanation:

---
title: "${topicData.software} Review (2026): [compelling subtitle]"
date: "${today}"
excerpt: "[compelling 1-2 sentence summary under 160 chars]"
tags: ["Review", "${topicData.category}", "GEO", "AI Search"]
---

[full review content]`;

  try {
    const content = await callClaude(prompt);
    await publishToGitHub(`${slug}.md`, content, 'reviews');
    markTopicUsed('reviews', topicData.software);
    console.log('Review published successfully');
  } catch (e) {
    console.error('Error:', e.message);
    process.exit(1);
  }
}

main();

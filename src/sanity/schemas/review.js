import { defineField, defineType } from "sanity";

export default defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Product / Solution Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Rating (1–5)",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: "verdict",
      title: "Verdict",
      type: "string",
      options: {
        list: [
          { title: "Highly Recommended", value: "Highly Recommended" },
          { title: "Recommended", value: "Recommended" },
          { title: "Worth Trying", value: "Worth Trying" },
          { title: "Mixed", value: "Mixed" },
          { title: "Not Recommended", value: "Not Recommended" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "e.g. AI Tools, Marketing, Productivity, CRM, Design",
    }),
    defineField({
      name: "productUrl",
      title: "Product URL",
      type: "url",
      description: "Link to the product or solution being reviewed",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Short summary shown on the reviews list page",
      validation: (Rule) => Rule.max(220),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt Text", type: "string" }),
      ],
    }),
    defineField({
      name: "pros",
      title: "Pros",
      type: "array",
      of: [{ type: "string" }],
      description: "Key advantages — one per line",
    }),
    defineField({
      name: "cons",
      title: "Cons",
      type: "array",
      of: [{ type: "string" }],
      description: "Key drawbacks — one per line",
    }),
    defineField({
      name: "body",
      title: "Full Review",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  { name: "href", type: "url", title: "URL" },
                  { name: "blank", type: "boolean", title: "Open in new tab", initialValue: true },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Alt Text" },
            { name: "caption", type: "string", title: "Caption" },
          ],
        },
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.max(155),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "verdict", media: "coverImage" },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ? `Verdict: ${subtitle}` : "", media };
    },
  },
  orderings: [
    { title: "Published (newest first)", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] },
    { title: "Rating (highest first)", name: "ratingDesc", by: [{ field: "rating", direction: "desc" }] },
  ],
});

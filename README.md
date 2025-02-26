# AI Chat API Endpoint for `@upstash/docusaurus-theme-ai-search`

This is the AI Chat API endpoint for [@upstash/docusaurus-theme-ai-search](https://github.com/upstash/docusaurus-theme-ai-search-upstash), a Docusaurus theme that provides AI-powered search and chat capabilities using Upstash Vector.

## Environment Variables

The following environment variables are required:

```bash
OPENAI_API_KEY="your-openai-api-key"
ALLOWED_ORIGIN="your-documentation-url"
```

- `OPENAI_API_KEY`: Your OpenAI API key for generating AI responses
- `ALLOWED_ORIGIN`: The URL of your documentation site (CORS protection)

## Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

The API will be available at `http://localhost:3000/api/ask-ai`.

## Deploy on Vercel

The easiest way to deploy this API endpoint is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

## Learn More

To learn more about the main package and how to use this API endpoint, check out:

- [@upstash/docusaurus-theme-ai-search repo](https://github.com/upstash/docusaurus-theme-ai-search-upstash)
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Upstash Vector](https://upstash.com/docs/vector/overall/getstarted) - learn about Upstash Vector database

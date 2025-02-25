import { streamText, Message } from 'ai';
import { openai } from '@ai-sdk/openai';

export const runtime = 'edge';

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
    const allowedOrigin = process.env.ALLOWED_ORIGIN;

    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': allowedOrigin ?? 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

export async function POST(req: Request): Promise<Response> {
  try {
    const origin = req.headers.get('origin');
    const allowedOrigin = process.env.ALLOWED_ORIGIN;
    console.log('origin request: ', origin, 'allowed origin: ', allowedOrigin);

    if (!origin || origin !== allowedOrigin) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized: Invalid origin' }),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const { question, context } = await req.json();

    // Prepare context from search results
    const contextText = context
      .map(
        (item: any) =>
          `${item.metadata.title || item.metadata.fileName}:\n${item.content}\n`
      )
      .join('\n');

    // Build messages array instead of a raw prompt
    const messages: Message[] = [
      {
        role: 'assistant',
        content:
          'You are an AI assistant that provides clear, actionable instructions based on any documentation. Provide direct recommendations and practical steps without referring to the documentation explicitly.',
        id: 'system',
      },
      {
        role: 'user',
        content: `Question: "${question}"\n\nDocumentation:\n${contextText}`,
        id: 'user-1',
      },
    ];

    // Stream the response using streamText
    const stream = streamText({
      model: openai('gpt-4o'),
      messages,
      maxTokens: 500,
      temperature: 0.7,
    });

    // Return the stream with CORS headers
    return stream.toTextStreamResponse({
      headers: {
        'Content-Type': 'text/event-stream',
        'X-Content-Type-Options': 'nosniff',
        'Access-Control-Allow-Origin': allowedOrigin ?? 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('AI Chat Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to get AI response' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN ?? 'http://localhost:3000',
        },
      }
    );
  }
}

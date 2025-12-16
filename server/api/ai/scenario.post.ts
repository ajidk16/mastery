import OpenAI from 'openai';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { word } = body;

  if (!word) {
    throw createError({ statusCode: 400, statusMessage: 'Word is required' });
  }

  const apiKey = process.env.VITE_OPENAI_API_KEY;
  if (!apiKey) {
    throw createError({ statusCode: 500, statusMessage: 'OpenAI API Key not configured' });
  }

  const openai = new OpenAI({ apiKey });

  try {
    const completion = await openai.responses.create({
      input: [
        { role: "system", content: "You are an English tutor." },
        { role: "user", content: `Generate a short, natural conversation (2-3 exchanges) between two people (A and B) that correctly uses the word "${word}". Format it as "A: ... \nB: ...".` }
      ],
      model: 'gpt-4o-mini',
    });

    return {
      scenario: completion.output_text
    };
  } catch (error: any) {
    console.error('OpenAI Error:', error);
    throw createError({ statusCode: 500, statusMessage: 'Failed to generate scenario' });
  }
});

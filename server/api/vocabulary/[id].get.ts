import { db } from '../../utils/drizzle';
import { vocabulary, userProgress } from '../../database/schema';
import { eq, and } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const idOrWord = getRouterParam(event, 'id');
  const userId = 1; // Hardcoded for demo

  if (!idOrWord) {
    throw createError({ statusCode: 400, statusMessage: 'ID or Word is required' });
  }

  // Try to find by ID first (if number), else by word string
  let condition;
  if (!isNaN(Number(idOrWord))) {
      condition = eq(vocabulary.id, Number(idOrWord));
  } else {
      condition = eq(vocabulary.word, idOrWord);
  }

  const result = await db.select({
    id: vocabulary.id,
    word: vocabulary.word,
    phonetic: vocabulary.phonetic,
    type: vocabulary.type,
    definition: vocabulary.definition,
    context: vocabulary.contextSentence,
    example: vocabulary.example,
    category: vocabulary.category,
    difficulty: vocabulary.difficulty,
    mastery: userProgress.status,
  })
  .from(vocabulary)
  .leftJoin(userProgress, and(eq(vocabulary.id, userProgress.wordId), eq(userProgress.userId, userId)))
  .where(condition)
  .limit(1);

  if (!result.length) {
    throw createError({ statusCode: 404, statusMessage: 'Word not found' });
  }

  const item = result[0];
  return {
    ...item,
    mastery: item.mastery === 'mastered' ? 3 : (item.mastery === 'learning' ? 2 : 1)
  };
});

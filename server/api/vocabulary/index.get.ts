import { db } from '../../utils/drizzle';
import { vocabulary, userProgress } from '../../database/schema';
import { eq, desc } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  // In a real app, get user ID from session/auth
  // For now, hardcode user ID 1 (Demo User)
  const userId = 1;

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
    lastReviewedAt: userProgress.lastReviewedAt
  })
  .from(vocabulary)
  .leftJoin(userProgress, eq(vocabulary.id, userProgress.wordId))
  .orderBy(desc(vocabulary.createdAt));

  // Transform to match UI needs (mastery level mapping)
  return result.map(item => ({
    ...item,
    // Map status to number 1-3 if needed, or keep as string. 
    // UI expects number 1-3. Let's assume 'learning' = 1, 'mastered' = 3 for now.
    mastery: item.mastery === 'mastered' ? 3 : (item.mastery === 'learning' ? 2 : 1)
  }));
});

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from '../server/database/schema';
import { users, vocabulary, userProgress } from '../server/database/schema';

const { Pool } = pg;

const runSeed = async () => {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not set');
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(pool, { schema });

  console.log('⏳ Seeding database...');

  try {
    // Clean up existing data
    console.log('🧹 Cleaning up tables...');
    await db.delete(userProgress);
    await db.delete(vocabulary);
    await db.delete(users);

    // Insert Users
    console.log('👤 Inserting users...');
    const insertedUsers = await db.insert(users).values([
      {
        email: 'user@example.com',
        name: 'Demo User',
        role: 'user',
      },
      {
        email: 'admin@mastery.com',
        name: 'Admin User',
        role: 'admin',
      },
    ]).returning();

    // Insert Vocabulary
    console.log('📖 Inserting vocabulary...');
    const vocabData = [
      { 
        word: 'ephemeral', 
        definition: 'Lasting for a very short time.', 
        contextSentence: 'Fashions are ephemeral, changing with every season.', 
        phonetic: '/əˈfem(ə)rəl/', 
        type: 'adjective', 
        example: 'The ephemeral nature of fame.', 
        category: 'Academic', 
        difficulty: 'advanced' as const 
      },
      { 
        word: 'serendipity', 
        definition: 'The occurrence and development of events by chance in a happy or beneficial way.', 
        contextSentence: 'The discovery of penicillin was a stroke of serendipity.', 
        phonetic: '/ˌserənˈdipədē/', 
        type: 'noun', 
        example: 'We found the restaurant by pure serendipity.', 
        category: 'General', 
        difficulty: 'advanced' as const 
      },
      { 
        word: 'resilient', 
        definition: 'Able to withstand or recover quickly from difficult conditions.', 
        contextSentence: 'Babies are generally more resilient than they look.', 
        phonetic: '/rəˈzilyənt/', 
        type: 'adjective', 
        example: 'The fish are resilient to most infections.', 
        category: 'Personality', 
        difficulty: 'intermediate' as const 
      },
      { 
        word: 'eloquent', 
        definition: 'Fluent or persuasive in speaking or writing.', 
        contextSentence: 'An eloquent speech that moved the audience to tears.', 
        phonetic: '/ˈeləkwənt/', 
        type: 'adjective', 
        example: 'She was an eloquent speaker.', 
        category: 'Communication', 
        difficulty: 'intermediate' as const 
      },
      { 
        word: 'pragmatic', 
        definition: 'Dealing with things sensibly and realistically in a way that is based on practical rather than theoretical considerations.', 
        contextSentence: 'A pragmatic approach to politics.', 
        phonetic: '/praɡˈmadik/', 
        type: 'adjective', 
        example: 'We need to be pragmatic about our chances.', 
        category: 'Business', 
        difficulty: 'advanced' as const 
      },
      { 
        word: 'nostalgia', 
        definition: 'A sentimental longing or wistful affection for the past.', 
        contextSentence: 'I was overcome with acute nostalgia for my days at university.', 
        phonetic: '/näˈstaljə/', 
        type: 'noun', 
        example: 'She was filled with nostalgia for her childhood.', 
        category: 'Emotion', 
        difficulty: 'intermediate' as const 
      },
      { 
        word: 'meticulous', 
        definition: 'Showing great attention to detail; very careful and precise.', 
        contextSentence: 'He had always been so meticulous about his appearance.', 
        phonetic: '/məˈtikyələs/', 
        type: 'adjective', 
        example: 'The trip involved meticulous planning.', 
        category: 'personality', 
        difficulty: 'advanced' as const 
      },
      { 
        word: 'diligent', 
        definition: 'Having or showing care and conscientiousness in one\'s work.', 
        contextSentence: 'Many diligent researchers have already investigated this problem.', 
        phonetic: '/ˈdiləjənt/', 
        type: 'adjective', 
        example: 'She is a diligent student.', 
        category: 'Academic', 
        difficulty: 'intermediate' as const 
      },
      { 
        word: 'innovative', 
        definition: 'Featuring new methods; advanced and original.', 
        contextSentence: 'Innovative designs for folding bicycles.', 
        phonetic: '/ˈinəˌvādiv/', 
        type: 'adjective', 
        example: 'He gave an innovative talk on renewable energy.', 
        category: 'Technology', 
        difficulty: 'beginner' as const 
      },
      { 
        word: 'authentic', 
        definition: 'Of undisputed origin; genuine.', 
        contextSentence: 'The letter is now accepted as an authentic document.', 
        phonetic: '/ôˈTHen(t)ik/', 
        type: 'adjective', 
        example: 'The restaurant serves authentic Italian food.', 
        category: 'General', 
        difficulty: 'beginner' as const 
      },
    ];

    const insertedVocab = await db.insert(vocabulary).values(vocabData).returning();

    // Insert User Progress
    console.log('📈 Inserting user progress...');
    const user1 = insertedUsers[0];
    const word1 = insertedVocab[0];
    const word2 = insertedVocab[1];

    await db.insert(userProgress).values([
      {
        userId: user1.id,
        wordId: word1.id,
        status: 'mastered',
        lastReviewedAt: new Date(),
      },
      {
        userId: user1.id,
        wordId: word2.id,
        status: 'learning',
        lastReviewedAt: new Date(),
      }
    ]);

    console.log('✅ Seeding completed successfully!');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
};

runSeed();

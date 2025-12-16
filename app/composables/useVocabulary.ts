export interface VocabularyWord {
  id: string
  word: string
  phonetic: string
  type: string
  definition: string
  context: string
  example?: string
  mastery: number // 1-3
  isPlaying?: boolean
  category?: string
}

export const useVocabulary = () => {
  const vocabList = ref<VocabularyWord[]>([
    { 
      id: 'serendipity',
      word: 'Serendipity', 
      phonetic: '/ˌser.ənˈdɪp.ə.ti/',
      type: 'noun',
      definition: 'The fact of finding interesting or valuable things by chance.', 
      context: 'Meeting my best friend at the airport was pure <span class="text-primary-600 font-bold">serendipity</span>.',
      example: 'The discovery of penicillin was a stroke of serendipity.',
      mastery: 2,
      category: 'Advanced' 
    },
    { 
      id: 'ephemeral',
      word: 'Ephemeral', 
      phonetic: '/ɪˈfem.ər.əl/',
      type: 'adjective',
      definition: 'Lasting for a very short time.', 
      context: 'Fashion trends are often <span class="text-primary-600 font-bold">ephemeral</span>.', 
      example: 'The beauty of the sunset was ephemeral, fading within minutes.',
      mastery: 1,
      category: 'Academic' 
    },
    { 
      id: 'resilient',
      word: 'Resilient', 
      phonetic: '/rɪˈzɪl.jənt/',
      type: 'adjective',
      definition: 'Able to withstand or recover quickly from difficult conditions.', 
      context: 'She is remarkably <span class="text-primary-600 font-bold">resilient</span> despite the setbacks.', 
      example: 'The local economy is resilient and expected to bounce back.',
      mastery: 3,
      category: 'Personality' 
    },
    {
      id: 'ubiquitous',
      word: 'Ubiquitous',
      phonetic: '/juːˈbɪk.wɪ.təs/',
      type: 'adjective',
      definition: 'Present, appearing, or found everywhere.',
      context: 'Smartphones have become <span class="text-primary-600 font-bold">ubiquitous</span> in modern society.',
      example: 'Coffee shops are ubiquitous in this city.',
      mastery: 3,
      category: 'Society'
    },
    {
      id: 'eloquent',
      word: 'Eloquent',
      phonetic: '/ˈel.ə.kwənt/',
      type: 'adjective',
      definition: 'Fluent or persuasive in speaking or writing.',
      context: 'His speech was <span class="text-primary-600 font-bold">eloquent</span> and moved the audience to tears.',
      example: 'She made an eloquent appeal for human rights.',
      mastery: 2,
      category: 'Communication'
    },
    {
      id: 'pragmatic',
      word: 'Pragmatic',
      phonetic: '/præɡˈmæt.ɪk/',
      type: 'adjective',
      definition: 'Dealing with things sensibly and realistically.',
      context: 'We need a <span class="text-primary-600 font-bold">pragmatic</span> approach to solve this problem.',
      example: 'He is a pragmatic leader who focuses on results.',
      mastery: 1,
      category: 'Business'
    }
  ])

  const getWordById = (id: string) => vocabList.value.find(w => w.id === id)

  return {
    vocabList,
    getWordById
  }
}

export interface VocabularyWord {
  id: number
  word: string
  phonetic: string
  type: string
  definition: string
  context: string
  example?: string
  mastery: number // 1-3
  isPlaying?: boolean
  category?: string
  difficulty: string
}

export const useVocabulary = () => {
    // Fetch all words
    const { data: vocabList, refresh } = useFetch<VocabularyWord[]>('/api/vocabulary', {
        default: () => []
    })

    // Get single word (helper to fetch if not in list, or just use API directly in component)
    const getWordById = async (id: string | number) => {
        const { data } = await useFetch<VocabularyWord>(`/api/vocabulary/${id}`)
        return data.value
    }

    const generateScenario = async (word: string) => {
        return await $fetch<{ scenario: string }>('/api/ai/scenario', {
            method: 'POST',
            body: { word }
        })
    }

    return {
        vocabList,
        getWordById,
        generateScenario,
        refresh
    }
}

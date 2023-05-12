import { defineStore } from 'pinia'
import data from '@/mocks/data.json'

export const useDataStore = defineStore('data', {
  state: () => ({
    data: data || [],
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})

import { create } from 'zustand'

type TSource = string | null

interface ConfigStore {
    maxRange: number
    filterSize: number
    setFilterSize: (size: number) => void
    source: TSource
    setSource: (src: TSource) => void
}

export const useConfigStore = create<ConfigStore>((set) => ({
    maxRange: 120,
    filterSize: 0,
    setFilterSize: (size: number) => set({ filterSize: size }),
    source: null,
    setSource: (src: TSource) => set({ source: src })
}))
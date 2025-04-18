import { create } from 'zustand'
import { Tracker } from '@/types/Tracker'
import { Section } from '@/types/Section'

type TrackersStore = { //ALL trackers
    trackers: Tracker[]
    setTrackers: (newTrackers: Tracker[]) => void //initialize with trackers
    addTracker: (tracker: Tracker) => void //add a tracker to the list
}

export const useTrackerStore = create<TrackersStore>((set) => ({
    trackers: [],
    setTrackers: (newTrackers) => set({ trackers: newTrackers}),
    addTracker: (tracker) => set((state) => ({
        trackers: [...state.trackers, tracker]
    }))
    
}))

type SectionsHomeStore = { //home sections 
    sectionsH: Section[]
    setSectionsH: (newSectionsH: Section[]) => void //initialize with sections
    addSectionH: (sectionH: Section) => void //add a section to the list
    removeSectionH: (sectionHToRemove: Section) => void
}

export const useSectionStore = create<SectionsHomeStore>((set) => ({
    sectionsH: [],
    setSectionsH: (newSectionsH) => set({ sectionsH: newSectionsH}),
    addSectionH: (sectionH) => set((state) => ({
        sectionsH: [...state.sectionsH, sectionH]
    })),
    removeSectionH: (sectionHToRemove) => set((state) =>({
        sectionsH: [...state.sectionsH.filter((s) => s !== sectionHToRemove)]
    }))
}))

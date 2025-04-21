import { create } from 'zustand'
import { TimePeriod, Tracker } from '@/types/Tracker'
import { Section } from '@/types/Section'

type TrackersStore = { //ALL trackers
    trackers: Tracker[]
    setTrackers: (newTrackers: Tracker[]) => void //initialize with trackers
    addTracker: (tracker: Tracker) => void //add a tracker to the list
    getTracker: (name: string, timePeriod: string) => Tracker | undefined; //gets tracker given name and time period
    deleteTracker: (name: string, timePeriod: string) => void
    updateTracker: (updatedTracker: Tracker) => void
}

export const useTrackerStore = create<TrackersStore>((set, get) => ({
    trackers: [],
    setTrackers: (newTrackers) => set({ trackers: newTrackers}),
    addTracker: (tracker) => set((state) => ({
        trackers: [...state.trackers, tracker]
    })),
    getTracker: (name, timePeriod) => {
        const tracker = get().trackers.filter((t) => t.timePeriod === timePeriod && t.trackerName === name);
        return tracker[0] ? tracker[0] : undefined;
    },
    deleteTracker: (name: string, timePeriod: string) =>
        set((state) => ({
          trackers: state.trackers.filter(
            (t) => !(t.trackerName === name && t.timePeriod === timePeriod)
          ),
        })),
        updateTracker: (updatedTracker) => {
            console.log('Updating tracker:', updatedTracker); // Add logging here
            set((state) => ({
              trackers: state.trackers.map((tracker) =>
                tracker.trackerName === updatedTracker.trackerName && tracker.timePeriod === updatedTracker.timePeriod
                  ? updatedTracker
                  : tracker
              ),
            }));
          },
}))

type SectionsHomeStore = { //home sections 
    sectionsH: Section[]
    setSectionsH: (newSectionsH: Section[]) => void //initialize with sections
    addSectionH: (sectionH: Section) => void //add a section to the list
    removeSectionH: (sectionHToRemove: Section) => void
    addTrackerToSection: (sectionTitle: string, time_period: string, tracker: Tracker) => void //methods to add trackers to sections
    initialAddTrackerToSection: (sectionTitle: string, time_period: string, tracker: Tracker) => void //DOESNT UPDATE LAST_MODIFIED
}

export const useSectionStore = create<SectionsHomeStore>((set) => ({
    sectionsH: [],
    setSectionsH: (newSectionsH) => set({ sectionsH: newSectionsH}),
    addSectionH: (sectionH) => set((state) => ({
        sectionsH: [...state.sectionsH, sectionH]
    })),
    removeSectionH: (sectionHToRemove) => set((state) =>({
        sectionsH: [...state.sectionsH.filter((s) => s !== sectionHToRemove)]
    })),
    addTrackerToSection: (sectionTitle, time_period, tracker) => set((state) : Partial<SectionsHomeStore>=> {
        const section = state.sectionsH.find(section => 
            section.timePeriod === time_period && section.sectionTitle === sectionTitle
        );
        if (section){ //if valid
            return {
                sectionsH: state.sectionsH.map(s =>
                  s === section //look for the section 
                    ? { 
                        ...s, // copy of state (immutability or something)
                        trackers: [...s.trackers, tracker], //add tracker to the list
                        size: s.size + 1, //increment size
                        lastModified: Date.now() //last modified
                      } as Section
                    : s
                )
              };
        }
        return {sectionsH: state.sectionsH};
    }),

    initialAddTrackerToSection: (sectionTitle, time_period, tracker) => set((state) : Partial<SectionsHomeStore>=> {
        const section = state.sectionsH.find(section => 
            section.timePeriod === time_period && section.sectionTitle === sectionTitle
        );
        if (section){ //if valid
            return {
                sectionsH: state.sectionsH.map(s =>
                  s === section //look for the section 
                    ? { 
                        ...s, // copy of state (immutability or something)
                        trackers: [...s.trackers, tracker], //add tracker to the list
                        size: s.size + 1, //increment size
                      } as Section
                    : s
                )
              };
        }
        return {sectionsH: state.sectionsH};
    }),

}));

import { create } from 'zustand'
import { Tracker } from '@/types/Tracker'
import { Section } from '@/types/Section'
import { openDatabase } from '@/storage/sqlite' 

// Tracker Store section
type TrackersStore = {
  trackers: Tracker[]
  setTrackers: (newTrackers: Tracker[]) => void
  addTracker: (tracker: Tracker) => void
  getTracker: (name: string, timePeriod: string) => Tracker | undefined
}

export const useTrackerStore = create<TrackersStore>((set, get) => ({
  trackers: [],
  setTrackers: (newTrackers) => set({ trackers: newTrackers }),
  addTracker: (tracker) => set((state) => ({
    trackers: [...state.trackers, tracker]
  })),
  getTracker: (name, timePeriod) => {
    const tracker = get().trackers.filter((t) => t.timePeriod === timePeriod && t.trackerName === name);
    return tracker[0] ? tracker[0] : undefined;
  }
}))

// Section Store section
type SectionsHomeStore = {
  sectionsH: Section[]
  setSectionsH: (newSectionsH: Section[]) => void
  addSectionH: (sectionH: Section) => Promise<void>
  removeSectionH: (sectionHToRemove: Section) => void
  addTrackerToSection: (sectionTitle: string, time_period: string, tracker: Tracker) => Promise<void>
  initialAddTrackerToSection: (sectionTitle: string, time_period: string, tracker: Tracker) => void
}

export const useSectionStore = create<SectionsHomeStore>((set) => ({
  sectionsH: [],

  setSectionsH: (newSectionsH) => set({ sectionsH: newSectionsH }),

  addSectionH: async (sectionH) => {
    set((state) => ({
      sectionsH: [...state.sectionsH, sectionH]
    }));

    const db = await openDatabase();
    await db.runAsync(
        `INSERT INTO sections (section_title, time_period, position, last_modified)
         VALUES (?, ?, ?, ?)`,
        [sectionH.sectionTitle, sectionH.timePeriod, sectionH.position, sectionH.lastModified]
      );      
  },

  removeSectionH: (sectionHToRemove) => set((state) => ({
    sectionsH: state.sectionsH.filter((s) => s !== sectionHToRemove)
  })),

  addTrackerToSection: async (sectionTitle, time_period, tracker) => {
    const db = await openDatabase();

    let newSection: Section | undefined;

    set((state) => {
      const section = state.sectionsH.find(section =>
        section.timePeriod === time_period && section.sectionTitle === sectionTitle
      );
      if (!section) return state;

      section.addTracker(tracker);
      newSection = section;

      return { sectionsH: [...state.sectionsH] };
    });

    if (!newSection) return;

    const [{ section_id }] = await db.getAllAsync<{ section_id: number }>(
      `SELECT section_id FROM sections WHERE section_title = ? AND time_period = ?`,
      [sectionTitle, time_period]
    );

    const [{ tracker_id }] = await db.getAllAsync<{ tracker_id: number }>(
      `SELECT tracker_id FROM trackers WHERE tracker_name = ? AND time_period = ?`,
      [tracker.trackerName, tracker.timePeriod]
    );

    await db.runAsync(
      `INSERT INTO section_trackers (user_id, section_id, tracker_id, tracker_position, last_modified)
       VALUES (?, ?, ?, ?, ?)`,
      ["localUser", section_id, tracker_id, newSection.trackers.length - 1, Date.now()]
    );
  },

  initialAddTrackerToSection: (sectionTitle, time_period, tracker) => set((state) => {
    const section = state.sectionsH.find(section =>
      section.timePeriod === time_period && section.sectionTitle === sectionTitle
    );
    if (section) {
      return {
        sectionsH: state.sectionsH.map(s =>
          s === section
            ? {
              ...s,
              trackers: [...s.trackers, tracker],
              size: s.size + 1,
            } as Section
            : s
        )
      };
    }
    return { sectionsH: state.sectionsH };
  }),
}));

import { openDatabase } from "@/storage/sqlite";
import { exampleTrackers, TimePeriod, Tracker } from "@/types/Tracker";
import { Section } from "@/types/Section";
import { useSectionStore, useTrackerStore } from "@/storage/store";

export const setupDatabase = async () => {
    type SectionRow = {
        section_id: number;
        section_title: string;
        time_period: TimePeriod;
        position: number;
        last_modified: number;
      };
    
      type TrackerRow = {
        tracker_id: number;
        tracker_name: string;
        icon: string;
        time_period: TimePeriod;
        last_modified: number;
        bound_amount: number;
        unit?: string;
        current_amount?: number;
      };
    
      type SectionTrackerRelation = {
        section_id: number,
        tracker_id: number,
        tracker_position: number,
      }
  try {
    const db = await openDatabase();
    console.log("Database initialized");

    const trackersInfo: TrackerRow[] = await db.getAllAsync("SELECT tracker_id,tracker_name,icon,time_period,unit,bound_amount,current_amount,last_modified FROM trackers");
    const sectionsInfo: SectionRow[] = await db.getAllAsync("SELECT section_id,section_title,time_period,position,last_modified FROM sections");
    const sectionTrackersInfo: SectionTrackerRelation[] = await db.getAllAsync("SELECT section_id,tracker_id,tracker_position FROM section_trackers");

    const { setTrackers, addTracker, getTracker } = useTrackerStore.getState();
    const { setSectionsH, addSectionH, initialAddTrackerToSection } = useSectionStore.getState();

    // Clear existing state
    setTrackers([]);
    setSectionsH([]);

    const trackers: TrackerRow[] = trackersInfo.map((tracker) => {
      const newTracker = new Tracker(
        tracker.tracker_name,
        tracker.icon,
        tracker.time_period,
        tracker.last_modified,
        tracker.bound_amount,
        tracker.unit,
        tracker.current_amount ?? 0
      );
      addTracker(newTracker);
      return tracker;
    });

    const sections: SectionRow[] = sectionsInfo.map((section) => {
      const newSection = new Section(
        section.section_title,
        section.time_period,
        section.position,
        section.last_modified
      );
      addSectionH(newSection);
      return section;
    });

    sections.sort((a, b) => a.position - b.position);
    sections.forEach((section) => {
      const trackersInSection = sectionTrackersInfo
        .filter((st) => st.section_id === section.section_id)
        .sort((a, b) => a.tracker_position - b.tracker_position);

      trackersInSection.forEach((trackerInS) => {
        const trackerRow = trackers.find((t) => t.tracker_id === trackerInS.tracker_id);
        if (trackerRow) {
          const tracker = getTracker(trackerRow.tracker_name, trackerRow.time_period);
          if (tracker) {
            initialAddTrackerToSection(section.section_title, section.time_period, tracker);
          }
        }
      });
    });

  } catch (error) {
    console.error("Database error:", error);
  }
};
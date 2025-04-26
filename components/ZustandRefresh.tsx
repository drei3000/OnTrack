import { openDatabase } from "@/storage/sqlite";
import { exampleTrackers, TimePeriod, Tracker } from "@/types/Tracker";
import { Section } from "@/types/Section";
import { useSectionStore, useTrackerStore } from "@/storage/store";
import { useHistoryStore } from "@/storage/store";

export type SectionRow = {
  section_id: number;
  section_title: string;
  time_period: TimePeriod;
  position: number;
  last_modified: number;
};

export type TrackerRow = {
  tracker_id: number;
  tracker_name: string;
  icon: string;
  time_period: TimePeriod;
  last_modified: number;
  bound_amount: number;
  unit?: string;
  current_amount?: number;
};

export type SectionTrackerRelation = {
  section_id: number,
  tracker_id: number,
  tracker_position: number,
};


export type TrackerHistoryRow = {
    history_id: number;
    tracker_id: number;
    date: string;
    bound_amount: number;
    current_amount: number;
    unit?: string;
    cloud_history_id?: number;
    last_modified: number;
}


export const setupDatabase = async () => {

  try {
    const db = await openDatabase();
    console.log("Database initialized");

    // await db.execAsync(`
    //     PRAGMA foreign_keys = ON;

    //     CREATE TABLE IF NOT EXISTS tracker_history (
    //         history_id          INTEGER PRIMARY KEY AUTOINCREMENT,
    //         tracker_id          INTEGER NOT NULL,
    //         date                TEXT    NOT NULL,x
    //         bound_amount        REAL    NOT NULL,
    //         current_amount      REAL    NOT NULL,
    //         unit                TEXT,
    //         cloud_history_id    INTEGER,
    //         last_modified       INTEGER NOT NULL,
    //         UNIQUE(tracker_id, date)
    //     );

    //     CREATE INDEX IF NOT EXISTS idx_history_tracker
    //         ON tracker_history (tracker_id);
    //     `);

    // const { loadHistory } = useHistoryStore.getState();   // CHANGE:
    // await loadHistory();                                  // CHANGE:
            

    const trackersInfo: TrackerRow[] = await db.getAllAsync("SELECT tracker_id,tracker_name,icon,time_period,unit,bound_amount,current_amount,last_modified FROM trackers");
    const sectionsInfo: SectionRow[] = await db.getAllAsync("SELECT section_id,section_title,time_period,position,last_modified FROM sections");
    const sectionTrackersInfo: SectionTrackerRelation[] = await db.getAllAsync("SELECT section_id,tracker_id,tracker_position FROM section_trackers");

    console.log("SECTIONS: ")
    sectionsInfo.forEach(section => {
      console.log(section.section_title +" pos: " + section.position+ " id: "+section.section_id)
    });

    console.log("TRACKERS: ")
    trackersInfo.forEach(tracker => {
      console.log(tracker.tracker_name+" id: "+tracker.tracker_id)
    });

    console.log("RELATIONS: ")
    sectionTrackersInfo.forEach(relation => {
      console.log("sectionID: "+relation.section_id+" trackerID: "+relation.tracker_id+" position: "+relation.tracker_position)
    });
    
    const { setTrackers, addTracker, getTracker } = useTrackerStore.getState();
    const { setSectionsH, addSectionH, initialAddTrackerToSection } = useSectionStore.getState();

    // Clear existing state
    setTrackers([]);
    setSectionsH([]);

    var trackersDBFormat: Tracker[] = []; //initialize trackers in db format to set
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
      //addTracker(newTracker);
      trackersDBFormat.push(newTracker);
      return tracker;
    });
    setTrackers(trackersDBFormat);


    var sectionsDBFormat: Section[] = []; //initialize trackers in db format to set
    const sections: SectionRow[] = sectionsInfo.map((section) => {
      const newSection = new Section(
        section.section_title,
        section.time_period,
        section.position,
        [],
        0,
        section.last_modified
      );
      sectionsDBFormat.push(newSection);
      return section;
    });
    setSectionsH(sectionsDBFormat)


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
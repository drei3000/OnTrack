import { Tracker } from "./Tracker";
import { TimePeriod } from "./Tracker";

export class Section{
    position: number;
    sectionTitle: string;
    size: number = 0;
    trackers: Tracker[] = [];
    timePeriod: TimePeriod;

    constructor(sectionTitle: string,timePeriod: TimePeriod, position: number){
        this.sectionTitle = sectionTitle;
        this.timePeriod = timePeriod;
        this.position = position;
    }

    //Tracker functions
    addTracker(newTracker: Tracker){
        this.trackers.push(newTracker);
        this.size++;
    }

    reorderTracker(tracker: Tracker, newPos : number){
       const oldPos = this.trackers.indexOf(tracker); //old position
       this.trackers.splice(oldPos, 1); // Remove tracker from old position
       this.trackers.splice(newPos, 0, tracker); // Insert tracker at new position
    }

    deleteTracker(tracker: Tracker){
        const pos = this.trackers.indexOf(tracker); //old position
        this.trackers.splice(pos, 1);
        this.size--;
    }
}


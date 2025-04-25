import { Tracker } from "./Tracker";
import { TimePeriod } from "./Tracker";

export class Section{
    position: number;
    sectionTitle: string;
    size: number = 0;
    trackers: Tracker[] = [];
    timePeriod: TimePeriod;
    lastModified: number;

    constructor(sectionTitle: string,timePeriod: TimePeriod, position: number, trackers: Tracker[], size: number, lastModified: number){
        this.sectionTitle = sectionTitle;
        this.timePeriod = timePeriod;
        this.position = position;
        this.lastModified = lastModified;
    }

    initialAddTracker(newTracker: Tracker){ //for initial handling no date modification
        this.trackers.push(newTracker);
        this.size++;
    }
    //Tracker function
    addTracker(newTracker: Tracker){
        console.log("line 1")
        this.trackers.push(newTracker);
        this.size++;
        this.lastModified = Date.now();
    }

    reorderTracker(tracker: Tracker, newPos : number){
       const oldPos = this.trackers.indexOf(tracker); //old position
       this.trackers.splice(oldPos, 1); // Remove tracker from old position
       this.trackers.splice(newPos, 0, tracker); // Insert tracker at new position
       this.lastModified = Date.now();
    }

    deleteTracker(tracker: Tracker){
        const pos = this.trackers.indexOf(tracker); //old position
        this.trackers.splice(pos, 1);
        this.size--;
        this.lastModified = Date.now();
    }
}


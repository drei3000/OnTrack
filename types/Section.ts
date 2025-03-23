import { Tracker } from "./Tracker";
import { TimePeriod } from "./Tracker";
export class Section{
    sectionTitle: string;
    size: number = 0;
    trackers: Tracker[] = [];
    timePeriod: TimePeriod;

    constructor(sectionTitle: string,timePeriod: TimePeriod){
        this.sectionTitle = sectionTitle;
        this.timePeriod = timePeriod;
    }

    addTracker(newTracker: Tracker){
        this.trackers.push(newTracker);
    }

    
}


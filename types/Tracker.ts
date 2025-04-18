import { getCurrentUnixMilliseconds } from "./Misc";
export class Tracker { //export so referencable
    trackerName: string;
    icon: string; // Assuming it's a URL
    timePeriod: TimePeriod; // Enum alternative
    currentAmount: number = 0;
    last_modified: number;
    unit?: string; // Optional field
    bound?: number; //- if limit, +if goal, null if neither
    
    constructor(trackerName: string, icon: string, timePeriod: TimePeriod, last_modified: number, unit?: string, bound?: string) {
        this.trackerName = trackerName;
        this.icon = icon;
        this.timePeriod = timePeriod;
        this.last_modified = last_modified;
        this.unit = unit;
        this.bound = this.bound;

        //INSERT INTO A SECTION
        //INSERT INTO DATABASE
    }

   
    //SETTERS - Update last modified
    setName(newName: string){
        this.trackerName=newName;
        this.last_modified = getCurrentUnixMilliseconds();
    }

    setIcon(newIcon: string){
        this.icon=newIcon;
        this.last_modified = getCurrentUnixMilliseconds();
    }

    setAmount(newAmount: number){
        this.currentAmount = newAmount;
        this.last_modified = getCurrentUnixMilliseconds();
    }

    setUnit(newUnit: string){
        this.unit=newUnit
        this.last_modified = getCurrentUnixMilliseconds();
    }

    setBound(newBound: number){
        this.bound=newBound;
        this.last_modified = getCurrentUnixMilliseconds();
    }

}

export type TimePeriod = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY'; 

export const exampleTrackers: Tracker[] = [
    new Tracker(
      "Water Intake",
      "fa5|tint|#4FC3F7",
      "DAILY",
      Date.now(),
      "ml",
      "2000"
    ),
    new Tracker(
      "Steps",
      "fa5|shoe-prints|#81C784",
      "DAILY",
      Date.now(),
      "steps",
      "10000"
    ),
    new Tracker(
      "Reading",
      "fa5|book|#FFD54F",
      "DAILY",
      Date.now(),
      "minutes",
      "30"
    ),
    new Tracker(
      "Workout",
      "fa5|dumbbell|#FF8A65",
      "WEEKLY",
      Date.now(),
      "sessions",
      "3"
    ),
    new Tracker(
      "Sleep",
      "fa5|bed|#BA68C8",
      "DAILY",
      Date.now(),
      "hours",
      "8"
    ),
    new Tracker(
      "Calories",
      "fa5|fire|#EF5350",
      "DAILY",
      Date.now(),
      "kcal",
      "2500"
    ),
    new Tracker(
      "Meditation",
      "fa5|spa|#64B5F6",
      "DAILY",
      Date.now(),
      "minutes",
      "15"
    ),
    new Tracker(
      "Budget",
      "fa5|wallet|#90A4AE",
      "MONTHLY",
      Date.now(),
      "GBP",
      "-500"
    ),
    new Tracker(
      "Coding Hours",
      "fa5|laptop-code|#4DD0E1",
      "WEEKLY",
      Date.now(),
      "hours",
      "10"
    ),
    new Tracker(
      "Sugar Limit",
      "fa5|cookie-bite|#F06292",
      "DAILY",
      Date.now(),
      "g",
      "-30"
    )
  ];
  
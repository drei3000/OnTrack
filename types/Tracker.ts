import { getCurrentUnixMilliseconds } from "./Misc";
export class Tracker { //export so referencable
    trackerName: string;
    icon: string; // Assuming it's a URL
    timePeriod: TimePeriod; // Enum alternative
    currentAmount: number;
    last_modified: number;
    unit?: string; // Optional field
    bound: number; //- if limit, +if goal, 0 if neither
    
    constructor(trackerName: string, icon: string, timePeriod: TimePeriod, last_modified: number, bound: number, unit?: string);
    constructor(trackerName: string, icon: string, timePeriod: TimePeriod, last_modified: number, bound: number,  unit: string | undefined, currentAmount: number,);
    constructor(
      trackerName: string,
      icon: string,
      timePeriod: TimePeriod,
      last_modified: number,
      bound: number,
      unit?: string,
      currentAmount?: number,
    ) {
      this.trackerName = trackerName;
      this.icon = icon;
      this.timePeriod = timePeriod;
      this.last_modified = last_modified;
      this.bound = bound;
      this.currentAmount = currentAmount ? currentAmount : 0;
      this.unit = unit;
      
      
  
      // INSERT INTO A SECTION
      // INSERT INTO DATABASE
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

export type TimePeriod = 'Daily' | 'Weekly' | 'Monthly' | 'Yearly'; 

export const exampleTrackers: Tracker[] = [
    new Tracker(
      "Water Intake",
      "fa5|tint|#4FC3F7",
      "Daily",
      Date.now(),
      2000,
      "ml",
    ),
    new Tracker(
      "Steps",
      "fa5|shoe-prints|#81C784",
      "Daily",
      Date.now(),
      10000,
      "steps",
    ),
    new Tracker(
      "Reading",
      "fa5|book|#FFD54F",
      "Daily",
      Date.now(),
      30,
      "minutes"
      
    ),
    new Tracker(
      "Workout",
      "fa5|dumbbell|#FF8A65",
      "Weekly",
      Date.now(),
      3,
      "sessions"
    ),
    new Tracker(
      "Sleep",
      "fa5|bed|#BA68C8",
      "Daily",
      Date.now(),
      8,
      "hours",
    ),
    new Tracker(
      "Calories",
      "fa5|fire|#EF5350",
      "Daily",
      Date.now(),
      8000,
      "kcal",
      
    ),
    new Tracker(
      "Meditation",
      "fa5|spa|#64B5F6",
      "Daily",
      Date.now(),
      15,
      "minutes",
    ),
    new Tracker(
      "Budget",
      "fa5|wallet|#90A4AE",
      "Monthly",
      Date.now(),
      -500,
      "GBP"
    ),
    new Tracker(
      "Coding Hours",
      "fa5|laptop-code|#4DD0E1",
      "Weekly",
      Date.now(),
      10,
      "hours",
      
    ),
    new Tracker(
      "Sugar Limit",
      "fa5|cookie-bite|#F06292",
      "Daily",
      Date.now(),
      -30,
      "g",
    )
  ];
  
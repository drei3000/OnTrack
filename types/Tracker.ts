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
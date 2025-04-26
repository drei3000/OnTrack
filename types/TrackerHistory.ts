// Tracker history, one row per day
export interface TrackerHistory {
    history_id?: number;           
    tracker_id: number;            
    date: string;                  // 'YYYY-MM-DD'
    bound_amount: number;
    current_amount: number;
    unit?: string;
    cloud_history_id?: number|null;
    last_modified: number;         // Unix ms
  }
  
import { Shift } from './shift';
import { Volunteer } from './volunteer';

export interface Group {
  id: string;
  eventDayId: string;
  name: string;
  shifts: Shift[];
  volunteers: Volunteer[];
}

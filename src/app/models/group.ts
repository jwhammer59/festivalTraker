import { Shift } from './shift';
import { Volunteer } from './volunteer';

export interface Group {
  id: string;
  groupName: string;
  groupChair: string;
  shifts: Shift[];
  volunteers: Volunteer[];
}

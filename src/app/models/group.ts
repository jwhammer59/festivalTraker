import { Shift } from './shift';
import { Volunteer } from './volunteer';

export interface Group {
  id: string;
  name: string;
  groupChair: string;
  shifts: Shift[];
  volunteers: Volunteer[];
}

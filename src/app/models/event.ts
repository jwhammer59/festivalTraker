import { Group } from './group';

export interface Event {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  eventDay: string[];
  groups: Group[];
}

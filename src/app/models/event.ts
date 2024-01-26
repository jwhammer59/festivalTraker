import { Group } from './group';

export interface Event {
  id: string;
  eventName: string;
  eventStartDate: string;
  eventEndDate: string;
  eventDay: string[];
  eventGroups: Group[];
  eventIsActive: boolean;
}

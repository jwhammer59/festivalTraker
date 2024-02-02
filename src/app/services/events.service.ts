import { Injectable } from '@angular/core';
import { Event } from '../models/event';
import { EventDay } from '../models/event-day';

import {
  Firestore,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  collectionData,
  docData,
} from '@angular/fire/firestore';

import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private fs: Firestore) {}

  dbPath1: string = 'fsp_events';
  dbPath2: string = 'fsp_event_days';

  getEvents(): Observable<Event[]> {
    let eventRef = collection(this.fs, `${this.dbPath1}`);
    return collectionData(eventRef, { idField: 'id' }) as Observable<Event[]>;
  }

  getEvent(id: string): Observable<Event> {
    let docRef = doc(this.fs, `${this.dbPath1}/${id}`);
    return docData(docRef, { idField: 'id' }) as Observable<Event>;
  }

  addEvent(event: Event) {
    return addDoc(collection(this.fs, `${this.dbPath1}`), event);
  }

  updateEvent(id: string, events: any) {
    let docRef = doc(this.fs, `${this.dbPath1}/${id}`);
    return updateDoc(docRef, events);
  }

  deleteEvent(id: string) {
    let docRef = doc(this.fs, `${this.dbPath1}/${id}`);
    return deleteDoc(docRef);
  }

  getEventDays(): Observable<EventDay[]> {
    let eventDayRef = collection(this.fs, `${this.dbPath2}`);
    return collectionData(eventDayRef, { idField: 'id' }) as Observable<
      EventDay[]
    >;
  }

  getEventDay(id: string): Observable<EventDay> {
    let docRef = doc(this.fs, `${this.dbPath2}/${id}`);
    return docData(docRef, { idField: 'id' }) as Observable<EventDay>;
  }

  addEventDay(eventDay: EventDay) {
    return addDoc(collection(this.fs, `${this.dbPath2}`), eventDay);
  }

  updateEventDay(id: string, eventDays: any) {
    let docRef = doc(this.fs, `${this.dbPath2}/${id}`);
    return updateDoc(docRef, eventDays);
  }

  deleteEventDay(id: string) {
    let docRef = doc(this.fs, `${this.dbPath2}/${id}`);
    return deleteDoc(docRef);
  }
}

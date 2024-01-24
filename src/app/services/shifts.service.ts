import { Injectable } from '@angular/core';
import { Shift } from '../models/shift';

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
export class ShiftsService {
  constructor(private fs: Firestore) {}

  dbPath: string = 'fsp_shifts';

  getShifts(): Observable<Shift[]> {
    let shiftRef = collection(this.fs, `${this.dbPath}`);
    return collectionData(shiftRef, { idField: 'id' }) as Observable<Shift[]>;
  }

  getShift(id: string): Observable<Shift> {
    let docRef = doc(this.fs, `${this.dbPath}/${id}`);
    return docData(docRef, { idField: 'id' }) as Observable<Shift>;
  }

  addShift(shift: Shift) {
    return addDoc(collection(this.fs, `${this.dbPath}`), shift);
  }

  updateShift(id: string, shifts: any) {
    let docRef = doc(this.fs, `${this.dbPath}/${id}`);
    return updateDoc(docRef, shifts);
  }

  deleteShift(id: string) {
    let docRef = doc(this.fs, `${this.dbPath}/${id}`);
    return deleteDoc(docRef);
  }
}

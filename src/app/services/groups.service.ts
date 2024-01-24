import { Injectable } from '@angular/core';
import { Group } from '../models/group';

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
export class GroupsService {
  constructor(private fs: Firestore) {}

  dbPath: string = 'fsp_groups';

  getGroups(): Observable<Group[]> {
    let groupRef = collection(this.fs, `${this.dbPath}`);
    return collectionData(groupRef, { idField: 'id' }) as Observable<Group[]>;
  }

  getGroup(id: string): Observable<Group> {
    let docRef = doc(this.fs, `${this.dbPath}/${id}`);
    return docData(docRef, { idField: 'id' }) as Observable<Group>;
  }

  addGroup(group: Group) {
    return addDoc(collection(this.fs, `${this.dbPath}`), group);
  }

  updateGroup(id: string, groups: any) {
    let docRef = doc(this.fs, `${this.dbPath}/${id}`);
    return updateDoc(docRef, groups);
  }

  deleteGroup(id: string) {
    let docRef = doc(this.fs, `${this.dbPath}/${id}`);
    return deleteDoc(docRef);
  }
}

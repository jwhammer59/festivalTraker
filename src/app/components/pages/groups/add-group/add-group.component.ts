import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { HeaderComponent } from 'src/app/components/common/header/header.component';
import { BodyComponent } from 'src/app/components/common/body/body.component';

import { Group } from 'src/app/models/group';
import { GroupsService } from 'src/app/services/groups.service';

import { Shift } from 'src/app/models/shift';
import { ShiftsService } from 'src/app/services/shifts.service';

import { Volunteer } from 'src/app/models/volunteer';
import { VolunteersService } from 'src/app/services/volunteers.service';

// PrimeNG Imports
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PickListModule } from 'primeng/picklist';
import { ToastModule } from 'primeng/toast';

import { PrimeNGConfig, MessageService } from 'primeng/api';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-group',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    BodyComponent,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    ConfirmDialogModule,
    DialogModule,
    DividerModule,
    DropdownModule,
    InputTextModule,
    PickListModule,
    ToastModule,
  ],
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss'],
})
export class AddGroupComponent implements OnInit {
  headerTitle: string = 'Add Groups';
  headerIcon: string = 'pi pi-fw pi-id-card';

  buttonTitle: string = 'Back to Shifts';
  buttonIcon: string = 'pi pi-fw pi-arrow-circle-left';
  buttonVisible: boolean = true;

  addGroupForm!: FormGroup;
  submitted: boolean = false;

  allGroups$!: Observable<Group[]>;
  matchingGroupArray: Group[] = [];
  groupNameArray: string[] = [];
  currentGroupName: string = '';

  sourceShifts: Shift[] = [];
  targetShifts: Shift[] = [];

  sourceVolunteers: Volunteer[] = [];
  targetVolunteers: Volunteer[] = [];

  constructor(
    private groupsService: GroupsService,
    private shiftsService: ShiftsService,
    private volunteersService: VolunteersService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private primengConfig: PrimeNGConfig
  ) {
    this.addGroupForm = this.fb.group({
      groupName: ['', [Validators.required, Validators.minLength(5)]],
      groupChair: ['', [Validators.required, Validators.minLength(5)]],
      shifts: [],
      volunteers: [],
    });
    this.shiftsService.getShifts().subscribe((data) => {
      this.sourceShifts = data;
    });
    this.volunteersService.getVolunteers().subscribe((data) => {
      this.sourceVolunteers = data;
    });
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.targetShifts = [];
    this.targetVolunteers = [];
    this.allGroups$ = this.groupsService.getGroups();
    this.allGroups$.subscribe((groupData) => {
      this.matchingGroupArray = groupData;
    });
    setTimeout(() => {
      this.processGroupName(this.matchingGroupArray);
    }, 2000);
  }

  // Check for Duplicate Group Names
  processGroupName(data: Group[]) {
    this.groupNameArray = [];
    data.map((el) => {
      this.groupNameArray.push(el.groupName);
    });
  }

  get f() {
    return this.addGroupForm.controls;
  }

  getGroupNameMessage() {
    return this.f['groupName'].hasError('required')
      ? 'You must enter a name'
      : this.f['groupName'].hasError('minlength')
      ? 'Min length 5 characters'
      : '';
  }

  getGroupChairNameMessage() {
    return this.f['groupChair'].hasError('required')
      ? 'You must enter a name'
      : this.f['groupChair'].hasError('minlength')
      ? 'Min length 5 characters'
      : '';
  }

  onSubmit({ value, valid }: { value: Group; valid: boolean }) {
    this.submitted = true;
    this.currentGroupName = value.groupName;
    if (!valid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please check form for errors',
        life: 3000,
        key: 'error',
      });
    } else if (this.groupNameArray.includes(this.currentGroupName)) {
      const tempGroupName = this.currentGroupName;
      this.currentGroupName = '';
      this.messageService.add({
        severity: 'error',
        summary: `${tempGroupName} is already in use.`,
        detail: 'Please choose another name',
        life: 3000,
        key: 'error',
      });
      this.f['groupName'].reset();
    } else {
      this.groupsService.addGroup(value);
      this.currentGroupName = '';
      this.messageService.add({
        severity: 'success',
        summary: 'Success!',
        detail: 'Workout successfully added',
        life: 3000,
        key: 'success',
      });
    }
  }

  backToGroups() {
    this.ngZone.run(() => {
      this.router.navigate(['groups']);
    });
  }

  sendToShiftsTarget() {
    this.f['shifts'].setValue(this.targetShifts);
  }

  sendToShiftsSource() {
    this.f['shifts'].setValue(this.targetShifts);
  }

  sendToVolunteersTarget() {
    this.f['volunteers'].setValue(this.targetVolunteers);
  }

  sendToVolunteersSource() {
    this.f['volunteers'].setValue(this.targetVolunteers);
  }
}

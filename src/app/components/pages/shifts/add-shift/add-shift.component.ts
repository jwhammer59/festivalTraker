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

import { Shift } from 'src/app/models/shift';
import { ShiftsService } from 'src/app/services/shifts.service';

import { Group } from 'src/app/models/group';
import { GroupsService } from 'src/app/services/groups.service';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { KnobModule } from 'primeng/knob';
import { ToastModule } from 'primeng/toast';

import { PrimeNGConfig, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-shift',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent,
    BodyComponent,
    ButtonModule,
    CalendarModule,
    CardModule,
    DropdownModule,
    InputTextModule,
    KnobModule,
    ToastModule,
  ],
  templateUrl: './add-shift.component.html',
  styleUrls: ['./add-shift.component.scss'],
})
export class AddShiftComponent implements OnInit {
  headerTitle: string = 'Add Shifts';
  headerIcon: string = 'pi pi-fw pi-stopwatch';

  buttonTitle: string = 'Back to Shifts';
  buttonIcon: string = 'pi pi-fw pi-arrow-circle-left';
  buttonVisible: boolean = true;

  addShiftForm!: FormGroup;
  submitted: boolean = false;

  allGroups$!: Observable<Group[]>;

  constructor(
    private shiftsService: ShiftsService,
    private groupsService: GroupsService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private primengConfig: PrimeNGConfig
  ) {
    this.addShiftForm = this.fb.group({
      shiftName: ['', [Validators.required, Validators.minLength(5)]],
      shiftGroup: ['', Validators.required],
      shiftStart: ['', Validators.required],
      shiftEnd: ['', Validators.required],
      shiftVolsRequired: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.allGroups$ = this.groupsService.getGroups();
  }

  get f() {
    return this.addShiftForm.controls;
  }

  getShiftNameMessage() {
    return this.f['shiftName'].hasError('required')
      ? 'You must enter a name'
      : this.f['shiftName'].hasError('minlength')
      ? 'Min length 5 characters'
      : '';
  }

  onSubmit({ value, valid }: { value: Shift; valid: boolean }) {
    console.log('on submit');
    this.submitted = true;
    if (!valid) {
      this.messageService.add({
        detail: 'Check form for errors',
        summary: 'Invalid Form',
        severity: 'error',
        life: 3000,
        key: 'error',
      });
    } else {
      this.shiftsService.addShift(value);
      this.messageService.add({
        detail: 'Shift successfully added!',
        summary: 'Success',
        severity: 'success',
        life: 3000,
        key: 'success',
      });
    }
  }

  backToShifts() {
    this.ngZone.run(() => {
      this.router.navigate(['shifts']);
    });
  }
}

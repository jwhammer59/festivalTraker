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

import { Volunteer } from 'src/app/models/volunteer';
import { VolunteersService } from 'src/app/services/volunteers.service';

import { State } from 'src/app/models/state';
import { STATES } from 'src/app/data/state-data';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

import { PrimeNGConfig, MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-volunteer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent,
    BodyComponent,
    ButtonModule,
    CardModule,
    CheckboxModule,
    DividerModule,
    DropdownModule,
    InputMaskModule,
    InputTextModule,
    ToastModule,
  ],
  templateUrl: './add-volunteer.component.html',
  styleUrls: ['./add-volunteer.component.scss'],
})
export class AddVolunteerComponent implements OnInit {
  headerTitle: string = 'Add Volunteers';
  headerIcon: string = 'pi pi-fw pi-user-plus';

  buttonTitle: string = 'Back to Volunteers';
  buttonIcon: string = 'pi pi-fw pi-arrow-circle-left';
  buttonVisible: boolean = true;

  states: State[] = STATES;

  addVolunteerForm!: FormGroup;
  submitted: boolean = false;

  constructor(
    private volunteersService: VolunteersService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private primengConfig: PrimeNGConfig,
    private ngZone: NgZone,
    private router: Router
  ) {
    this.addVolunteerForm = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address1: ['', Validators.required],
      address2: '',
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
      phone: '',
      email: '',
      isActive: false,
      isMinor: false,
    });
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  get f() {
    return this.addVolunteerForm.controls;
  }

  onSubmit({ value, valid }: { value: Volunteer; valid: boolean }) {
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
      this.volunteersService.addVolunteer(value);
      this.messageService.add({
        detail: 'Volunteer successfully added!',
        summary: 'Success',
        severity: 'success',
        life: 3000,
        key: 'success',
      });
    }
  }

  backToVolunteers() {
    this.ngZone.run(() => {
      this.router.navigate(['volunteers']);
    });
  }
}

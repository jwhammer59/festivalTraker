import { Component, OnInit, NgZone, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

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

import { LoadingService } from 'src/app/services/loading.service';

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
  selector: 'app-edit-volunteer',
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
  templateUrl: './edit-volunteer.component.html',
  styleUrls: ['./edit-volunteer.component.scss'],
})
export class EditVolunteerComponent implements OnInit {
  headerTitle: string = 'Edit Volunteers';
  headerIcon: string = 'pi pi-fw pi-user-edit';

  buttonTitle: string = 'Back to Volunteers';
  buttonIcon: string = 'pi pi-fw pi-arrow-circle-left';
  buttonVisible: boolean = true;

  states: State[] = STATES;

  submitted: boolean = false;
  id: string = '';

  editVolunteerForm!: FormGroup;
  volunteerRef: any;

  volunteer: Volunteer = {
    id: '',
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipcode: '',
    email: '',
    phone: '',
    isActive: false,
    isMinor: false,
  };

  constructor(
    private volunteersService: VolunteersService,
    private loadingService: LoadingService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private primengConfig: PrimeNGConfig,
    private ngZone: NgZone
  ) {
    this.editVolunteerForm = fb.group({
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
    this.id = this.route.snapshot.params['id'];
    this.volunteersService.getVolunteer(this.id).subscribe((volunteer) => {
      this.volunteerRef = volunteer;
    });
  }

  ngAfterViewInit() {
    this.loadingService.loadingOn();
    setTimeout(() => {
      this.editVolunteerForm = this.fb.group({
        id: [this.volunteerRef.id],
        firstName: [this.volunteerRef.firstName],
        lastName: [this.volunteerRef.lastName],
        address1: [this.volunteerRef.address1],
        address2: [this.volunteerRef.address2],
        city: [this.volunteerRef.city],
        state: [this.volunteerRef.state],
        zipcode: [this.volunteerRef.zipcode],
        phone: [this.volunteerRef.phone],
        email: [this.volunteerRef.email],
        isActive: [this.volunteerRef.isActive],
        isMinor: [this.volunteerRef.isMinor],
      });
      this.loadingService.loadingOff();
    }, 2000);
  }

  get f() {
    return this.editVolunteerForm.controls;
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
      this.volunteersService.updateVolunteer(this.id, value);
      this.messageService.add({
        detail: 'Volunteer successfully updated!',
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

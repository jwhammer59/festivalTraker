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

import { Event } from 'src/app/models/event';
import { EventsService } from 'src/app/services/events.service';

// PrimeNG Imports
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

import { PrimeNGConfig, MessageService } from 'primeng/api';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    BodyComponent,
    ReactiveFormsModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    CheckboxModule,
    ConfirmDialogModule,
    DialogModule,
    DividerModule,
    DropdownModule,
    InputTextModule,
    ToastModule,
  ],
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent implements OnInit {
  headerTitle: string = 'Add Events';
  headerIcon: string = 'pi pi-fw pi-user-plus';

  buttonTitle: string = 'Back to Events';
  buttonIcon: string = 'pi pi-fw pi-arrow-circle-left';
  buttonVisible: boolean = true;

  addEventForm!: FormGroup;
  submitted: boolean = false;

  allEvents$!: Observable<Event[]>;
  matchingEventArray: Event[] = [];
  eventNameArray: string[] = [];
  currentEventName: string = '';

  constructor(
    private eventsService: EventsService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private primengConfig: PrimeNGConfig
  ) {
    this.addEventForm = this.fb.group({
      eventName: ['', [Validators.required, Validators.minLength(5)]],
      eventStartDate: ['', Validators.required],
      eventEndDate: ['', Validators.required],
      eventIsActive: false,
    });
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.allEvents$ = this.eventsService.getEvents();
    this.allEvents$.subscribe((data) => {
      this.matchingEventArray = data;
    });
    setTimeout(() => {
      this.processEventName(this.matchingEventArray);
    }, 2000);
  }

  // Check for Duplicate Event Names
  processEventName(data: Event[]) {
    this.eventNameArray = [];
    data.map((el) => {
      this.eventNameArray.push(el.eventName);
    });
  }

  get f() {
    return this.addEventForm.controls;
  }

  getEventNameMessage() {
    return this.f['eventName'].hasError('required')
      ? 'You must enter a name'
      : this.f['eventName'].hasError('minlength')
      ? 'Min length 5 characters'
      : '';
  }

  onSubmit({ value, valid }: { value: Event; valid: boolean }) {
    this.submitted = true;
    this.currentEventName = value.eventName;
    if (!valid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please check form for errors',
        life: 3000,
        key: 'error',
      });
    } else if (this.eventNameArray.includes(this.currentEventName)) {
      const tempEventName = this.currentEventName;
      this.currentEventName = '';
      this.messageService.add({
        severity: 'error',
        summary: `${tempEventName} is already in use.`,
        detail: 'Please choose another name',
        life: 3000,
        key: 'error',
      });
      this.f['eventName'].reset();
    } else {
      this.eventsService.addEvent(value);
      this.messageService.add({
        severity: 'success',
        summary: 'Success!',
        detail: 'Workout successfully added',
        life: 3000,
        key: 'success',
      });
    }
  }

  backToEvents() {
    this.ngZone.run(() => {
      this.router.navigate(['events']);
    });
  }
}

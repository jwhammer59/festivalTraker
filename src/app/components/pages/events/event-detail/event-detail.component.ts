import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
} from '@angular/forms';

import { HeaderComponent } from 'src/app/components/common/header/header.component';
import { BodyComponent } from 'src/app/components/common/body/body.component';

import { Event } from 'src/app/models/event';
import { EventsService } from 'src/app/services/events.service';
import { EventDay } from 'src/app/models/event-day';

import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

import { PrimeNGConfig, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HeaderComponent,
    BodyComponent,
    AvatarModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    CheckboxModule,
    ConfirmDialogModule,
    ContextMenuModule,
    DialogModule,
    PanelModule,
    TableModule,
    ToastModule,
    TooltipModule,
  ],
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
})
export class EventDetailComponent implements OnInit {
  headerTitle: string = 'Event Details';
  headerIcon: string = 'pi pi-fw pi-calendar';

  buttonTitle: string = 'Events';
  buttonIcon: string = 'pi pi-fw pi-arrow-circle-left';
  buttonVisible: boolean = true;

  addEventDayDialog: boolean = false;
  addEventDayForm!: FormGroup;

  id: string = '';
  submitted: boolean = false;

  event$!: Observable<Event>;
  allEventDays$!: Observable<EventDay[]>;

  selectedEventDay: EventDay = {
    id: '',
    eventId: '',
    eventDayDate: '',
    eventDayIsActive: false,
    groups: [],
  };

  constructor(
    private eventsService: EventsService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private primengConfig: PrimeNGConfig
  ) {
    this.addEventDayForm = this.fb.group({
      eventId: '',
      eventDayDate: ['', Validators.required],
      eventDayIsActive: false,
    });
    this.allEventDays$ = this.eventsService.getEventDays();
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.id = this.route.snapshot.params['id'];
    this.event$ = this.eventsService.getEvent(this.id);
    this.setEventId();
  }

  setEventId() {
    this.addEventDayForm.controls['eventId'].setValue(this.id);
  }

  onSubmit({ value, valid }: { value: EventDay; valid: boolean }) {
    this.submitted = true;
    if (!valid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Form is Invalid',
        life: 2000,
      });
    } else {
      this.eventsService.addEventDay(value);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Event Day Added!',
        life: 2000,
      });
    }
  }

  addEventDay() {
    this.addEventDayDialog = true;
  }

  closeAddEventDay() {
    this.addEventDayForm.reset();
    this.addEventDayDialog = false;
  }

  goToEventDayDetails(val: any) {
    console.log(val.id);
    this.ngZone.run(() => {
      this.router.navigate([`schedule-event/${val.id}`]);
    });
  }

  backToEvents() {
    this.location.back();
  }
}

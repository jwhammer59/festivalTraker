import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { HeaderComponent } from '../../common/header/header.component';
import { BodyComponent } from '../../common/body/body.component';

import { Event } from 'src/app/models/event';
import { EventsService } from 'src/app/services/events.service';

import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    BodyComponent,
    AvatarModule,
    ButtonModule,
    ConfirmDialogModule,
    ContextMenuModule,
    DialogModule,
    TableModule,
    ToastModule,
    TooltipModule,
  ],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  headerTitle: string = 'Events';
  headerIcon: string = 'pi pi-fw pi-calendar';

  buttonTitle: string = 'Add New Event';
  buttonIcon: string = 'pi pi-fw pi-calendar-plus';
  buttonVisible: boolean = true;

  allEvents$!: Observable<Event[]>;

  constructor(
    private eventsService: EventsService,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.allEvents$ = this.eventsService.getEvents();
  }

  ngOnInit(): void {}

  addNewEvent() {
    this.ngZone.run(() => {
      this.router.navigate(['add-event']);
    });
  }

  editEvent(val: any) {
    console.log(val);
  }

  deleteEvent(val: any) {
    console.log(val);
  }
}

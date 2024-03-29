import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from 'src/app/components/common/header/header.component';
import { BodyComponent } from 'src/app/components/common/body/body.component';

import { Event } from 'src/app/models/event';
import { EventsService } from 'src/app/services/events.service';

import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

import { PrimeNGConfig } from 'primeng/api';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    BodyComponent,
    AvatarModule,
    ButtonModule,
    CheckboxModule,
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
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.allEvents$ = this.eventsService.getEvents();
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  addNewEvent() {
    this.ngZone.run(() => {
      this.router.navigate(['add-event']);
    });
  }

  eventDetails(val: any) {
    this.ngZone.run(() => {
      this.router.navigate([`event-details/${val}`]);
    });
  }
}

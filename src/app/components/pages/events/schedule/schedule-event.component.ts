import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from 'src/app/components/common/header/header.component';
import { BodyComponent } from 'src/app/components/common/body/body.component';

import { Event } from 'src/app/models/event';
import { EventsService } from 'src/app/services/events.service';

import { Group } from 'src/app/models/group';
import { GroupsService } from 'src/app/services/groups.service';

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
  selector: 'app-schedule-event',
  standalone: true,
  imports: [
    CommonModule,
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
  templateUrl: './schedule-event.component.html',
  styleUrls: ['./schedule-event.component.scss'],
})
export class ScheduleEventComponent implements OnInit {
  headerTitle: string = 'Schedule Event Days';
  headerIcon: string = 'pi pi-fw pi-calendar';

  buttonTitle: string = 'Add New Event';
  buttonIcon: string = 'pi pi-fw pi-calendar-plus';
  buttonVisible: boolean = true;

  id: string = '';

  allGroups$!: Observable<Group[]>;

  constructor(
    private eventsService: EventsService,
    private groupsService: GroupsService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private primengConfig: PrimeNGConfig
  ) {
    console.log('constructor called');
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.id = this.route.snapshot.params['id'];
    this.allGroups$ = this.groupsService.getGroups();
  }

  addNewEventDay() {
    console.log('Hello Event Day');
  }
}

import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { HeaderComponent } from '../../common/header/header.component';
import { BodyComponent } from '../../common/body/body.component';

import { Volunteer } from 'src/app/models/volunteer';
import { VolunteersService } from 'src/app/services/volunteers.service';

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
  selector: 'app-volunteers',
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
  templateUrl: './volunteers.component.html',
  styleUrls: ['./volunteers.component.scss'],
})
export class VolunteersComponent implements OnInit {
  headerTitle: string = 'Volunteers';
  headerIcon: string = 'pi pi-fw pi-users';

  buttonTitle: string = 'Add New Event';
  buttonIcon: string = 'pi pi-fw pi-user-plus';
  buttonVisible: boolean = true;

  allVolunteers$!: Observable<Volunteer[]>;

  constructor(
    private volunteersService: VolunteersService,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.allVolunteers$ = this.volunteersService.getVolunteers();
  }

  ngOnInit(): void {}

  addNewVolunteer() {
    this.ngZone.run(() => {
      this.router.navigate(['add-volunteer']);
    });
  }

  editVolunteer(val: any) {
    console.log(val);
  }

  deleteVolunteer(val: any) {
    console.log(val);
  }
}

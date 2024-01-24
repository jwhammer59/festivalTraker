import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from '../../common/header/header.component';
import { BodyComponent } from '../../common/body/body.component';

import { Volunteer } from 'src/app/models/volunteer';
import { VolunteersService } from 'src/app/services/volunteers.service';

import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
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
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private ngZone: NgZone,
    private primengConfig: PrimeNGConfig,
  ) {
    this.allVolunteers$ = this.volunteersService.getVolunteers();
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  addNewVolunteer() {
    this.ngZone.run(() => {
      this.router.navigate(['add-volunteer']);
    });
  }

  editVolunteer(val: any) {
    this.ngZone.run(() => {
      this.router.navigate([`edit-volunteer/${val}`]);
    });
  }

  deleteVolunteer(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Volunteer Deleted!!',
          life: 2000,
        });
        this.volunteersService.deleteVolunteer(id);
        this.confirmationService.close();
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected Volunteer deletion.',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled Volunteer deletion.',
            });
            break;
        }
        this.confirmationService.close();
      },
    });
  }
}

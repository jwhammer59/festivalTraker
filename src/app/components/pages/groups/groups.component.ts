import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from '../../common/header/header.component';
import { BodyComponent } from '../../common/body/body.component';

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

import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-groups',
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
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
  headerTitle: string = 'Groups';
  headerIcon: string = 'pi pi-fw pi-id-card';

  buttonTitle: string = 'Add New Group';
  buttonIcon: string = 'pi pi-fw pi-plus';
  buttonVisible: boolean = true;

  allGroups$!: Observable<Group[]>;

  constructor(
    private groupsService: GroupsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private ngZone: NgZone,
    private primengConfig: PrimeNGConfig
  ) {
    this.allGroups$ = this.groupsService.getGroups();
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  addNewGroup() {
    this.ngZone.run(() => {
      this.router.navigate(['add-group']);
    });
  }

  editGroup(val: any) {
    this.ngZone.run(() => {
      this.router.navigate([`edit-group/${val}`]);
    });
  }

  deleteGroup(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Group Deleted!!',
          life: 2000,
        });
        this.groupsService.deleteGroup(id);
        this.confirmationService.close();
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected Group deletion.',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled Group deletion.',
            });
            break;
        }
        this.confirmationService.close();
      },
    });
  }
}

import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { HeaderComponent } from '../../common/header/header.component';
import { BodyComponent } from '../../common/body/body.component';

import { Shift } from 'src/app/models/shift';
import { ShiftsService } from 'src/app/services/shifts.service';

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
  selector: 'app-shifts',
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
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.scss'],
})
export class ShiftsComponent implements OnInit {
  headerTitle: string = 'Shifts';
  headerIcon: string = 'pi pi-fw pi-stopwatch';

  buttonTitle: string = 'Add New Shift';
  buttonIcon: string = 'pi pi-fw pi-stopwatch';
  buttonVisible: boolean = true;

  allShifts$!: Observable<Shift[]>;

  constructor(
    private shiftsService: ShiftsService,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.allShifts$ = this.shiftsService.getShifts();
  }

  ngOnInit(): void {}

  addNewShift() {
    this.ngZone.run(() => {
      this.router.navigate(['add-shift']);
    });
  }

  editShift(val: any) {
    console.log(val);
  }

  deleteShift(val: any) {
    console.log(val);
  }
}

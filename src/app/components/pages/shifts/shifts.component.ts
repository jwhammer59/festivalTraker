import { Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { HeaderComponent } from '../../common/header/header.component';
import { BodyComponent } from '../../common/body/body.component';

@Component({
  selector: 'app-shifts',
  standalone: true,
  imports: [CommonModule, HeaderComponent, BodyComponent],
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.scss'],
})
export class ShiftsComponent {
  headerTitle: string = 'Shifts';
  headerIcon: string = 'pi pi-fw pi-stopwatch';

  buttonTitle: string = 'Add New Shift';
  buttonIcon: string = 'pi pi-fw pi-stopwatch';
  buttonVisible: boolean = true;

  constructor(private router: Router, private ngZone: NgZone) {}

  addNewShift() {
    this.ngZone.run(() => {
      this.router.navigate(['add-shift']);
    });
  }
}

import { Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { HeaderComponent } from 'src/app/components/common/header/header.component';
import { BodyComponent } from 'src/app/components/common/body/body.component';

@Component({
  selector: 'app-add-shift',
  standalone: true,
  imports: [CommonModule, HeaderComponent, BodyComponent],
  templateUrl: './add-shift.component.html',
  styleUrls: ['./add-shift.component.scss'],
})
export class AddShiftComponent {
  headerTitle: string = 'Add Shifts';
  headerIcon: string = 'pi pi-fw pi-stopwatch';

  buttonTitle: string = 'Back to Shifts';
  buttonIcon: string = 'pi pi-fw pi-arrow-circle-left';
  buttonVisible: boolean = true;

  constructor(private ngZone: NgZone, private router: Router) {}

  backToShifts() {
    this.ngZone.run(() => {
      this.router.navigate(['shifts']);
    });
  }
}

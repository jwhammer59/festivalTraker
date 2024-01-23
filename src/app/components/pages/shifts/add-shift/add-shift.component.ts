import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
}

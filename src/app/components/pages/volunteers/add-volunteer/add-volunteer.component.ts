import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from 'src/app/components/common/header/header.component';
import { BodyComponent } from 'src/app/components/common/body/body.component';

@Component({
  selector: 'app-add-volunteer',
  standalone: true,
  imports: [CommonModule, HeaderComponent, BodyComponent],
  templateUrl: './add-volunteer.component.html',
  styleUrls: ['./add-volunteer.component.scss'],
})
export class AddVolunteerComponent {
  headerTitle: string = 'Add Volunteer';
  headerIcon: string = 'pi pi-fw pi-user-plus';
}
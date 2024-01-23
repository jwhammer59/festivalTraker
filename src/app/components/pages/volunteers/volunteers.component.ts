import { Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { HeaderComponent } from '../../common/header/header.component';
import { BodyComponent } from '../../common/body/body.component';

@Component({
  selector: 'app-volunteers',
  standalone: true,
  imports: [CommonModule, HeaderComponent, BodyComponent],
  templateUrl: './volunteers.component.html',
  styleUrls: ['./volunteers.component.scss'],
})
export class VolunteersComponent {
  headerTitle: string = 'Volunteers';
  headerIcon: string = 'pi pi-fw pi-users';

  buttonTitle: string = 'Add New Event';
  buttonIcon: string = 'pi pi-fw pi-user-plus';
  buttonVisible: boolean = true;

  constructor(private router: Router, private ngZone: NgZone) {}

  addNewVolunteer() {
    this.ngZone.run(() => {
      this.router.navigate(['add-volunteer']);
    });
  }
}

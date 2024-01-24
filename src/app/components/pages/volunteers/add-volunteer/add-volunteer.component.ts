import { Component, NgZone, ɵNoopNgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
  headerTitle: string = 'Add Volunteers';
  headerIcon: string = 'pi pi-fw pi-user-plus';

  buttonTitle: string = 'Back to Volunteers';
  buttonIcon: string = 'pi pi-fw pi-arrow-circle-left';
  buttonVisible: boolean = true;

  constructor(private ngZone: NgZone, private router: Router) {}

  backToVolunteers() {
    this.ngZone.run(() => {
      this.router.navigate(['volunteers']);
    });
  }
}

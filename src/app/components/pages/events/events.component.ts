import { Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { HeaderComponent } from '../../common/header/header.component';
import { BodyComponent } from '../../common/body/body.component';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, HeaderComponent, BodyComponent],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent {
  headerTitle: string = 'Events';
  headerIcon: string = 'pi pi-fw pi-calendar';

  buttonTitle: string = 'Add New Event';
  buttonIcon: string = 'pi pi-fw pi-calendar-plus';
  buttonVisible: boolean = true;

  constructor(private router: Router, private ngZone: NgZone) {}

  addNewEvent() {
    this.ngZone.run(() => {
      this.router.navigate(['add-event']);
    });
  }
}

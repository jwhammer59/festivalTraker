import { Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { HeaderComponent } from 'src/app/components/common/header/header.component';
import { BodyComponent } from 'src/app/components/common/body/body.component';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [CommonModule, HeaderComponent, BodyComponent],
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent {
  headerTitle: string = 'Add Events';
  headerIcon: string = 'pi pi-fw pi-user-plus';

  buttonTitle: string = 'Back to Events';
  buttonIcon: string = 'pi pi-fw pi-arrow-circle-left';
  buttonVisible: boolean = true;

  constructor(private ngZone: NgZone, private router: Router) {}

  backToEvents() {
    this.ngZone.run(() => {
      this.router.navigate(['events']);
    });
  }
}

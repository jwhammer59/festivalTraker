import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private ngZone: NgZone,
    private router: Router,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  goToEvents() {
    this.ngZone.run(() => {
      this.router.navigate(['events']);
    });
  }
}

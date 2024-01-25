import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';
import { Auth, authState, User } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';

import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, MenubarModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnDestroy {
  auth: Auth = inject(Auth);
  authState$ = authState(this.auth);
  authStateSubscription!: Subscription;

  loggedInStatus: boolean = false;
  loggedInUser!: string | null;
  loggedInUserId: string = '';

  loggedInItems: MenuItem[] = [
    {
      label: 'Log Out',
      icon: 'pi pi-fw pi-sign-out',
      command: (event) => {
        this.logOut();
      },
    },
    {
      label: 'Events',
      icon: 'pi pi-fw pi-calendar',
      items: [
        {
          label: 'Events List',
          icon: 'pi pi-fw pi-list',
          routerLink: ['events'],
        },
        {
          label: 'Add Event',
          icon: 'pi pi-fw pi-calendar-plus',
          routerLink: ['add-event'],
        },
      ],
    },
    {
      label: 'Volunteers',
      icon: 'pi pi-fw pi-users',
      items: [
        {
          label: 'Volunteers List',
          icon: 'pi pi-fw pi-list',
          routerLink: ['volunteers'],
        },
        {
          label: 'Add Volunteer',
          icon: 'pi pi-fw pi-user-plus',
          routerLink: ['add-volunteer'],
        },
      ],
    },
    {
      label: 'Shifts',
      icon: 'pi pi-fw pi-stopwatch',
      items: [
        {
          label: 'Shifts List',
          icon: 'pi pi-fw pi-list',
          routerLink: ['shifts'],
        },
        {
          label: 'Add Shift',
          icon: 'pi pi-fw pi-plus',
          routerLink: ['add-shift'],
        },
      ],
    },
    {
      label: 'Groups',
      icon: 'pi pi-fw pi-id-card',
      items: [
        {
          label: 'Groups List',
          icon: 'pi pi-fw pi-list',
          routerLink: ['groups'],
        },
        {
          label: 'Add Group',
          icon: 'pi pi-fw pi-plus',
          routerLink: ['add-group'],
        },
      ],
    },
  ];

  loggedOutItems: MenuItem[] = [
    {
      label: 'Login',
      icon: 'pi pi-fw pi-sign-in',
      routerLink: ['login'],
    },
  ];

  constructor(private authService: AuthService, private router: Router) {
    this.authStateSubscription = this.authState$.subscribe(
      (aUser: User | null) => {
        if (aUser) {
          this.loggedInUser = aUser.email;
          this.loggedInUserId = aUser.uid;
          this.loggedInStatus = true;
        }
      }
    );
  }

  logOut() {
    this.loggedInUser = '';
    this.loggedInStatus = false;
    this.authService.logout();
    this.router.navigate(['welcome']);
  }

  ngOnDestroy(): void {
    this.authStateSubscription.unsubscribe();
  }
}

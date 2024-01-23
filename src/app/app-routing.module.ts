import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/common/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { WelcomeComponent } from './components/common/welcome/welcome.component';
import { AuthGuard } from './components/auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'welcome', component: WelcomeComponent },
  {
    path: 'events',
    loadComponent: () =>
      import('./components/pages/events/events.component').then(
        (m) => m.EventsComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'add-event',
    loadComponent: () =>
      import('./components/pages/events/add-event/add-event.component').then(
        (m) => m.AddEventComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-event/:id',
    loadComponent: () =>
      import('./components/pages/events/edit-event/edit-event.component').then(
        (m) => m.EditEventComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'event-details/:id',
    loadComponent: () =>
      import(
        './components/pages/events/event-detail/event-detail.component'
      ).then((m) => m.EventDetailComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'volunteers',
    loadComponent: () =>
      import('./components/pages/volunteers/volunteers.component').then(
        (m) => m.VolunteersComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'add-volunteer',
    loadComponent: () =>
      import(
        './components/pages/volunteers/add-volunteer/add-volunteer.component'
      ).then((m) => m.AddVolunteerComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-volunteer/:id',
    loadComponent: () =>
      import(
        './components/pages/volunteers/edit-volunteer/edit-volunteer.component'
      ).then((m) => m.EditVolunteerComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'volunteer-details/:id',
    loadComponent: () =>
      import(
        './components/pages/volunteers/volunteer-detail/volunteer-detail.component'
      ).then((m) => m.VolunteerDetailComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'shifts',
    loadComponent: () =>
      import('./components/pages/shifts/shifts.component').then(
        (m) => m.ShiftsComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'add-shift',
    loadComponent: () =>
      import('./components/pages/shifts/add-shift/add-shift.component').then(
        (m) => m.AddShiftComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-shift/:id',
    loadComponent: () =>
      import('./components/pages/shifts/edit-shift/edit-shift.component').then(
        (m) => m.EditShiftComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'shift-details/:id',
    loadComponent: () =>
      import(
        './components/pages/shifts/shift-detail/shift-detail.component'
      ).then((m) => m.ShiftDetailComponent),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './components/events/events.component';

const routes: Routes = [
  { path:"speakingDates", component: EventsComponent, data: { type: "speaking" } },
  { path:"presidingDates", component: EventsComponent, data: { type: "presiding" } },
  { path:"", redirectTo: "speakingDates", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

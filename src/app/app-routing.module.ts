import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExperienceComponent } from './experience/experience.component';
import { MyFriendsComponent } from './my-friends/my-friends.component';


const routes: Routes = [
  { path: 'experience', component: ExperienceComponent},
  { path: 'friends', component: MyFriendsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

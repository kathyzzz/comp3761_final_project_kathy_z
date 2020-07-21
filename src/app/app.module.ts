import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ExperienceComponent } from './experience/experience.component';
import { MyFriendsComponent } from './my-friends/my-friends.component';
import { RecentFriendsComponent } from './recent-friends/recent-friends.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { FriendsInfoComponent } from './friends-info/friends-info.component';
import { GameComponent } from './game/game.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,

    ExperienceComponent,
    MyFriendsComponent,
    RecentFriendsComponent,
    SearchBarComponent,
    SearchFilterComponent,
    FriendsInfoComponent,
    GameComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

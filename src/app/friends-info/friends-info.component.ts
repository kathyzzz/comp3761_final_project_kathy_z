import { FriendsService } from './../_service/friends.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friends-info',
  templateUrl: './friends-info.component.html',
  styleUrls: ['./friends-info.component.css']
})
export class FriendsInfoComponent implements OnInit {

  friend: any;
  constructor(
    private friendsService: FriendsService
  ) { }

  ngOnInit() {
    this.friendsService.friendDisplayOb.subscribe(res => {
      this.friend = res;
    });
  }
  isFriendSelected() {
    return Object.keys(this.friend).length !== 0;
  }
}

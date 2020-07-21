import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../_service/friends.service';

@Component({
  selector: 'app-recent-friends',
  templateUrl: './recent-friends.component.html',
  styleUrls: ['./recent-friends.component.css']
})
export class RecentFriendsComponent implements OnInit {

  friendlist: any;
  constructor(
    private friendservice: FriendsService
  ) {
    this.friendservice.friendsob.subscribe(res => {
      this.friendlist = res;
    });
  }

  ngOnInit() {
  }
  // merge sort by age

  clickDisplay(friend){
    console.log(friend);
    this.friendservice.updateFriend(friend);
  }
}

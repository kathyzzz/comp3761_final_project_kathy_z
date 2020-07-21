import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FriendsService } from '../_service/friends.service';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent implements OnInit {

  nameSearchForm: FormGroup;
  interestForm: FormGroup;
  interestList: any[];
  constructor(
    private fb: FormBuilder,
    private friendservice: FriendsService
  ) { }

  ngOnInit() {
    this.friendservice.interestList.subscribe(res => {
      this.interestList = res;
    });
    this.nameSearchForm = this.fb.group({
      name: ['']
    });
    this.interestForm = this.fb.group({
      interest: ['']
    });
  }

  submit() {
    const name = this.nameSearchForm.get('name').value;
    this.friendservice.searchName(name);
  }

  searchInterest() {
    const interest = this.interestForm.get('interest').value;
    this.friendservice.searchInterest(interest);
  }
}

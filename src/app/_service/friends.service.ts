import { Injectable } from '@angular/core';
import { BehaviorSubject, partition } from 'rxjs';
import * as data from '../../assets/randomfriends.json';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  private friendsData = new BehaviorSubject<any[]>([]);
  friendsob = this.friendsData.asObservable();
  private interestData = new BehaviorSubject<any[]>([]);
  interestList = this.interestData.asObservable();

  private friendDisplayData = new BehaviorSubject<any>({});
  friendDisplayOb = this.friendDisplayData.asObservable();
  constructor() {
    const friendlist = (data as any).default;
    this.getInterests(friendlist);
    this.mergeSort(friendlist, 0, friendlist.length - 1);
    this.friendsData.next(friendlist.slice(0, 20));
  }
  // get all interests in friendlist add to a array
  getInterests(list: any) {
    const interestList = [];
    list.forEach((person: any) => {
      if (interestList.find(x => x === person.interest1) === undefined) {
        interestList.push(person.interest1);
      }

    });
    interestList.sort();
    this.interestData.next(interestList);
  }
  // divide and conquer. merge subarray
  merge(friendlist, l: number, m: number, end: number) {
    const temp = [];
    let i = l;
    let j = m + 1;
    let k = 0;
    // console.log(friendlist[0].age);
    while (i <= m && j <= end) {
      // console.log(friendlist[i]);
      if (friendlist[i].weight <= friendlist[j].weight) {
        temp[k] = friendlist[i];
        k += 1;
        i += 1;
      } else {
        temp[k] = friendlist[j];
        k += 1;
        j += 1;
      }
    }
    while (i <= m) {
      temp[k] = friendlist[i];
      k += 1;
      i += 1;
    }
    while (j <= end) {
      temp[k] = friendlist[j];
      k += 1;
      j += 1;
    }
    for (i = l; i <= end; i += 1) {
      friendlist[i] = temp[i - l];
    }
  }
  // divide and conquer. Complexity O(nlogn)
  mergeSort(friendlist, start: number, end: number) {
    if (start < end) {
      const mid = Math.floor((start + end) / 2);
      // console.log('mid:' + mid);
      this.mergeSort(friendlist, start, mid);
      this.mergeSort(friendlist, mid + 1, end);
      this.merge(friendlist, start, mid, end);
    }

  }

  // display friend information
  updateFriend(friend) {
    this.friendDisplayData.next(friend);
  }

  // search name field
  searchName(name: any) {
    const friendlist = (data as any).default;
    this.quickSort(friendlist);
    const index = this.binarySearch(friendlist, name);
    console.log(index);
    let arry = [];
    if (index >= 0) {

      arry = this.searchNeighbour(friendlist, index, name);
    }
    this.friendsData.next(arry);
  }

  // search name field after sorted
  binarySearch(friendlist, fName) {
    return this.binarySearch2(friendlist, 0, friendlist.length - 1, fName);
  }
  // binary search name
  binarySearch2(list, left, right, name): number {
    console.log(list);
    while (left <= right) {
      const mid = Math.floor((left + (right)) / 2);
      console.log(mid);
      if (this.checkString(name, list[mid].first_name)) {
        return mid;
      } else if (list[mid].first_name.toLowerCase() < name.toLowerCase()) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }

    }
    return -1;
  }

  // search field using quick sort after clicking the submit button
  // best case O(nlogn). worst case O(n^2)
  quickSort(friendlist) {
    this.quickSort2(friendlist, 0, friendlist.length - 1);
    console.log(friendlist);
  }

  // real quick sort method
  quickSort2(list, start: number, end: number) {
    // console.log(list);
    if (start < end) {
      const middle = this.partial(list, start, end);
      this.quickSort2(list, start, middle - 1);
      this.quickSort2(list, middle + 1, end);
    }
  }

  // search - divide array into smaller array. helping method to find the middle
  partial(list, start: number, end: number) {
    const value = list[start].first_name;

    let left = start + 1;
    let right = end;

    let success = false;
    while (!success) {
      while (left <= right && list[left].first_name <= value) {
        left = left + 1;
      }
      while (right >= left && list[right].first_name >= value) {
        right = right - 1;
      }
      if (right < left) {
        success = true;
      } else {
        const temp = list[left];
        list[left] = list[right];
        list[right] = temp;
      }
    }
    const temp = list[start];
    list[start] = list[right];
    list[right] = temp;

    return right;
  }

  // search neighbouring friends
  searchNeighbour(list, index: number, name: any) {
    const match = [];
    match.push(list[index]);
    let counter = 1;
    while (this.checkString(name, list[index - counter].first_name)) {
      match.push(list[index - counter]);
      counter++;
    }
    let counter2 = 1;
    while (this.checkString(name, list[index + counter2].first_name)) {
      match.push(list[index + counter2]);
      counter2++;
    }
    return match;
  }
  // name = user's search string, listName = names in the list use to compare.
  // check if two strings are matching, return false if not matching
  checkString(name: any, listName: any) {
    if (name.length > listName.length) {
      return false;
    } else {
      let i = 0;
      for (i = 0; i <= name.length - 1; i++) {
        console.log(name.substring(i, i + 1).toLowerCase());
        console.log(listName.substring(i, i + 1).toLowerCase());

        if (name.substring(i, i + 1).toLowerCase() !== listName.substring(i, i + 1).toLowerCase()) {
          return false;
        }
      }
      return true;
    }
  }

  searchInterest(interest) {
    console.log(interest);
    const friendlist = (data as any).default;
    const commonInterestFriendList = [];
    friendlist.forEach(friend => {
      if (this.horspoolCompare(friend.interest, interest) !== -1) {
        commonInterestFriendList.push(friend);
      }
    });
    this.friendsData.next(commonInterestFriendList);
  }
  // implement horspool algorithm
  // return index if found, return -1 if not found
  horspoolCompare(str: string, pattern: string) {
    const occur = this.computeOccurance(pattern);
    let i = 0;
    let j = 0;
    const m = pattern.length;
    const n = str.length;
    while (i < (n - m)) {
      j = m - 1; // check from the last char
      while (pattern.charAt(j) === str.charAt(i + j)) {
        j--;
        if (j < 0) {
          return i; // found matching string
        }
      }
      i = i + (m - 1) - occur[str.charAt(i + (m - 1))]
    }
    return -1; // cant find match

  }
  computeOccurance(pattern: string) {
    const occur = new Array<number>(128);
    let i = 0;
    // initialize the array
    for (i = 0; i < 128; i++) {
      occur[i] = -1;
    }
    // get step size for each character
    for (i = 0; i < pattern.length - 1; i++) {
      occur[pattern.charAt(i)] = i;
    }
    return occur;
  }

}

import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

import { TextField } from 'tns-core-modules/ui/text-field';
import { ListViewEventData } from 'nativescript-ui-listview';
import { View } from 'tns-core-modules/ui/core/view';

import { UserService } from "../services/user.service";
import { User } from '../models/user.model';

@Component({
  selector: "c-list",
  moduleId: module.id,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  items: Array<User>;
  email: string;
  username: string;
  isLoading: boolean;
  listLoaded: boolean;

  @ViewChild("edtItemEmail") edtItemEmail: ElementRef;
  @ViewChild("edtItemUsername") edtItemUsername: ElementRef;

  constructor(
    private userSrv: UserService
  ) {
    this.isLoading = false;
    this.items = [];
    this.email = '';
    this.username = '';
    this.listLoaded = false;
  }

  ngOnInit() {
    this.refreshList();
  }

  onSwipeCellStarted(args: ListViewEventData) {
    let swipeLimits = args.data.swipeLimits;
    let swipeView = args.object;
    let rightItem = swipeView.getViewById<View>("delete-view");

    let deleteViewWidth = rightItem.getMeasuredWidth();

    swipeLimits.right = deleteViewWidth;
    swipeLimits.left = 0;
    swipeLimits.threshold = deleteViewWidth / 2;
  }

  onItemDelete(args: ListViewEventData) {
    let user = <User>args.object.bindingContext;

    this.isLoading = true;
    this.userSrv.delete(user)
      .subscribe(
        (user: User) => {
          alert(`Member '${user.email}' removed correctly.`);
          this.refreshList();
        }
        ,this.showErrorMessage
        ,() => { this.isLoading = false; }
      );
  }

  addUser() {
    if (this.email == undefined || this.email.trim().length == 0) {
      alert("Enter user email.");
      return;
    }

    if (this.username == undefined || this.username.trim().length == 0) {
      alert("Enter username");
      return;
    }

    //Dismiss the keyboard for email
    let edtItemEmail = <TextField>this.edtItemEmail.nativeElement;
    edtItemEmail.dismissSoftInput();

    //Dismiss the keyboard for username
    let edtItemUsername = <TextField>this.edtItemUsername.nativeElement;
    edtItemUsername.dismissSoftInput();

    let newUser = new User(null, this.email, this.username);

    this.isLoading = true;
    this.userSrv.save(newUser)
      .subscribe(
        (data) => {
          alert('User created successfully.');
          this.refreshList();
        }
        , this.showErrorMessage
        ,() => {
          this.email = '';
          this.username = '';
          this.isLoading = false;
        }
      );
  }

  private refreshList() {
    this.isLoading = true;
    this.userSrv.retrieveAll()
      .subscribe(
        (users) => {
          this.items = users;
          this.listLoaded = true;
        }
        ,this.showErrorMessage
        ,() => { this.isLoading = false; }
      );
  }

  showErrorMessage(error) {
    alert(error);
  }
}

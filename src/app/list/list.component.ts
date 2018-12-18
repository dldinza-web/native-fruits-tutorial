import { Component, OnInit } from "@angular/core";

import { UserService } from "../services/user.service";
import { User } from '../models/user.model';

@Component({
  selector: "c-list",
  moduleId: module.id,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  items;

  constructor(
    private userSrv: UserService
  ) {
    this.items = [];
  }

  ngOnInit() {
    this.loadElements();
  }

  private loadElements() {
    this.userSrv.retrieveAll()
      .subscribe(
        (users) => {
          this.items = users;
        }
        ,this.showErrorMessage
      );
  }

  showErrorMessage(error) {
    alert(error);
  }
}

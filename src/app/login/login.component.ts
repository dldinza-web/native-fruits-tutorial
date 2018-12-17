import { Component } from "@angular/core";

import { User } from "../models/user.model";
import { UserService } from "../services/user.service";

@Component({
  selector: 'c-login',
  moduleId: module.id,
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})

export class LoginComponent {
  user: User;
  isLogginIn = false;

  constructor(
    private userSvc: UserService
  ) {
    this.user = new User();
  }

  onSignIn() {
    console.log("User logged in: " + JSON.stringify(this.user));
    this.isLogginIn = true;
    this.userSvc.getUsers().subscribe(
      (data) => { console.log(data); }
      ,(error) => { this.showErrorMessage(error); }
    );
  }

  private onUserCreated(data) {
    console.log("User registered: " + data);
  }

  private showErrorMessage(error) {
    console.log("Error: Account couldn't be created", error);
  }
}

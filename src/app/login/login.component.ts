import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Page } from 'tns-core-modules/ui/page';

import { User } from "../models/user.model";
import { UserService } from "../services/user.service";
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: 'c-login',
  moduleId: module.id,
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})

export class LoginComponent implements OnInit {
  user: User;
  isLoggedIn = false;

  constructor(
    private userSvc: UserService,
    private authSrv: AuthenticationService,
    private router: Router,
    private page: Page
  ) {
    this.user = new User('Sincere@april.biz', 'Bret');
  }

  ngOnInit() {
    this.page.actionBarHidden = true;
  }

  onSignIn() {
    let self = this;

    this.authSrv.login(this.user)
      .subscribe(
        (data) => { self.onSignedUp(data) }
        ,(error) => { self.showErrorMessage(error) }
      );
  }

  private onSignedUp(isLoggedIn: boolean) {
    this.isLoggedIn = isLoggedIn;

    if (this.isLoggedIn) {
      this.router.navigate(['/list']);
    } else {
      this.showErrorMessage('Wrong user or password.');
    }
  }

  private onUserCreated(data) {
    console.log("User registered: " + data);
  }

  showErrorMessage(error) {
    alert(error);
  }
}

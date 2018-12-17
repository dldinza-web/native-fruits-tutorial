import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { User } from "../models/user.model";
import { UserService } from "../services/user.service";
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: 'c-login',
  moduleId: module.id,
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})

export class LoginComponent {
  user: User;
  isLoggedIn = false;

  constructor(
    private userSvc: UserService,
    private authSrv: AuthenticationService,
    private router: Router
  ) {
    this.user = new User();
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

  private showErrorMessage(error) {
    alert(error);
  }
}

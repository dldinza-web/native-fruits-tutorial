import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";

import { User } from '../models/user.model';

@Injectable()
export class AuthenticationService {
  private apiServiceUrl = "http://jsonplaceholder.typicode.com";
  private apiResource = "/users";

  constructor(
    private http: Http
  ) {}

  login(user: User):Observable<boolean> {
    let url = this.getApiUrl() + '?' + this.getAuthParams(user);

    return this.http.get(
      url,{ headers: this.getCommonHeaders() }
    )
    .pipe(
      map((resp: Response) => {
        let data = resp.json();

        return (data.length > 0);
      })
      , catchError(this.handleErrors)
    );
  }

  private getAuthParams(user: User) {
    let params = [];
    params.push('email=' + user.email);
    params.push('username=' + user.passwd);

    return params.join('&');
  }

  private getCommonHeaders() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return headers;
  }

  private handleErrors(resp) {
    console.log("Error: " + resp);
    return throwError(resp);
  }

  private getApiUrl() {
    return this.apiServiceUrl + this.apiResource;
  }
}

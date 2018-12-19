import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
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
    return this.http.get(
      this.getApiUrl()
      ,{ headers: this.getCommonHeaders(), params: this.getAuthParams(user) }
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
    let params = new URLSearchParams();

    params.append('email', user.email);
    params.append('username', user.passwd);

    return params
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

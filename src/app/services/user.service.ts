import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { map as _map } from 'lodash';

import { User } from '../models/user.model';

@Injectable()
export class UserService {
  private apiServiceUrl = "http://jsonplaceholder.typicode.com";
  private apiResource = "/users";

  constructor(
    private http: Http
  ) {}

  retrieveAll():Observable<User[]> {
    return this.http.get(
      this.getApiUrl(),
      { headers: this.getCommonHeaders() }
    )
    .pipe(
      map((resp: Response) => resp.json() )
      ,tap((items) => { return this.mapUsers(items) })
      ,catchError(this.handleErrors)
    );
  }

  private mapUsers(items) {
    return _map(items, (item) => this.toUser(item));
  }

  toUser(item):User {
    return new User(item.email, item.username)
  }

  private getApiUrl() {
    return this.apiServiceUrl + this.apiResource;
  }

  private getCommonHeaders() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return headers;
  }

  private handleErrors(resp: Response) {
    console.log("Error: " + resp);
    return throwError(resp);
  }
}

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
      ,map((items) => { return this.mapUsers(items) })
      ,catchError(this.handleErrors)
    );
  }

  delete(user: User) {
    return this.http.delete(
      this.getApiUrl() + '/' + user.id
      , { headers: this.getCommonHeaders() }
    )
    .pipe(
      map((resp: Response) => {
        if (resp.status === 200) {
          return user;
        }

        throw this.getUnexpectedError(resp);
      })
      ,tap((user: User) => { console.log(`User Removed: ${JSON.stringify(user)}`); })
      ,catchError(this.handleErrors)
    );
  }

  save(user: User) {
    if (!user.id) { return this.create(user); }
  }

  create(user: User) {
    return this.http.post(
      this.getApiUrl()
      , JSON.stringify(user)
      , { headers: this.getCommonHeaders() }
    ).pipe(
      map((resp: Response) => {
        if (resp.status === 201) {
          console.log("Record created: ", resp.json());
          return resp.json();
        }

        throw this.getUnexpectedError(resp);
      })
      , catchError(this.handleErrors)
    );
  }

  private mapUsers(items) {
    return _map(items, (item) => this.toUser(item));
  }

  toUser(item):User {
    return new User(item.id, item.email, item.username)
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

  private getUnexpectedError(resp: Response) {
    return `Unexpected Response: [Status: ${resp.status}] ${JSON.stringify(resp.json())}`;
  }
}

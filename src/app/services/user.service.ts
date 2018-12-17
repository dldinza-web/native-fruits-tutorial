import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { User } from '../models/user.model';

@Injectable()
export class UserService {
  private apiServiceUrl = "http://jsonplaceholder.typicode.com";
  private apiResource = "/users";

  constructor(
    private http: Http
  ) {}

  private getApiUrl() {
    return this.apiServiceUrl + this.apiResource;
  }

  private getCommonHeaders() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return headers;
  }

  private handleErrors(resp: Response) {
    console.log("Error: " + JSON.stringify(resp.json()));
    return Observable.throw(resp);
  }
}

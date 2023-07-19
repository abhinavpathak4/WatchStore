import { Injectable } from '@angular/core';
import { UserRegister } from '../interfaces/user-register';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;

  urlAddUser : string = environment.addUser;
  urlGetUsers : string = environment.getUsers;

  constructor(private httpClient: HttpClient) { }

  addUser(body: any): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>(this.urlAddUser, body, { observe: 'response' });
  }
 
  getUsers(): Observable<UserRegister[]> {
    return this.httpClient.get<UserRegister[]>(this.urlGetUsers);
  }
}

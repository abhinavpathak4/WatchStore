import { Injectable } from '@angular/core';
import { UserRegister } from '../interfaces/user-register';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  // Flag to indicate whether the user is an admin
  isAdmin: boolean = false;

  // Flag to indicate whether the user is logged in
  isLoggedIn: boolean = false;

  // URL for adding a new user to the backend
  urlAddUser: string = environment.addUser;

  // URL for getting the list of users from the backend
  urlGetUsers: string = environment.getUsers;

  constructor(private httpClient: HttpClient) { }

  /**
   * @method addUser
   * Adds a new user to the database.
   * @param body The user data to be added.
   * @returns An Observable containing the HTTP response.
   * @memberof UserServiceService
   */
  addUser(body: any): Observable<HttpResponse<any>> {
    return this.httpClient.post<HttpResponse<any>>(this.urlAddUser, body, { observe: 'response' });
  }
 
  /**
   * @method getUsers
   * Retrieves the list of users from the database.
   * @returns An Observable containing the array of UserRegister objects.
   * @memberof UserServiceService
   */
  getUsers(): Observable<UserRegister[]> {
    return this.httpClient.get<UserRegister[]>(this.urlGetUsers);
  }
}

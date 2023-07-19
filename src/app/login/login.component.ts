import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserRegister } from '../interfaces/user-register';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductServiceService } from '../services/product-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 
  // Array to store the list of users
  private users: UserRegister[] = [];

  // Flag to indicate whether login credentials are valid
  isValid: boolean = true;

  // Form group for the login form
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private router: Router,
    private userService: UserServiceService,
    private productService: ProductServiceService
  ) {}

  
  ngOnInit() {
    // Fetch the list of users when the component is initialized
    this.getUserList();
  }

  /**
   * @method getUserList
   * Fetches the list of users from the userService.
   * @memberof LoginComponent
   */
  getUserList(): void {
    this.userService.getUsers().subscribe(
      (response: UserRegister[]) => {
        this.users = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  /**
   * @method authenticate
   * Authenticates the user based on the provided login credentials.
   * and check whether the credentials are of admin or not
   * @memberof LoginComponent
   */
  authenticate(): void {
    const user = this.users.find(
      (u) =>
        u.email === this.loginForm.value.email &&
        u.password === this.loginForm.value.password
    );
    if (user) {
      this.productService.getProducts();
      if (user.admin) {
        this.userService.isAdmin = true;
      } else {
        this.userService.isAdmin = false;
      }
      this.isValid = true;
      this.userService.isLoggedIn = true;
      this.router.navigate(['home']);
    } else {
      this.isValid = false;
    }
  }
}

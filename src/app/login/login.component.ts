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
 
  private users: UserRegister[] = [];
  isValid: boolean = true;
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
    this.getUserList();
  }


  getUserList(): void{
    this.userService.getUsers().subscribe(
      (response: UserRegister[]) => {
        this.users = response;
        console.log(this.users);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  

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

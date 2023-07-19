import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  notify: boolean = false;
  pressed: boolean = false;

  registerForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private userService: UserServiceService) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  addUser(): void {
    this.pressed = true;
    if (this.registerForm.valid) {
      const body = {
        name: this.registerForm.value.firstName +" " +  this.registerForm.value.lastName,
        password: this.registerForm.value.password,
        admin: false,
        email: this.registerForm.value.email
      }
      this.notify = true;
      this.userService.addUser(body).subscribe();
    }
    else {
      this.notify = false;
    }
  } 
  
}



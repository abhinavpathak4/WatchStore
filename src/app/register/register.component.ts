import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  // Flag to indicate whether the registration notification should be shown
  notify: boolean = false;

  // Flag to indicate whether the registration button has been pressed
  pressed: boolean = false;

  // FormGroup for the registration form
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserServiceService) {
    // Create the registration form with required fields and validators
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * @method addUser
   * Adds a new user to the system.
   * If the form is valid, it sends the user data to the userService to add the user.
   * Shows a notification after successful registration.
   * @memberof RegisterComponent
   */
  addUser(): void {
    this.pressed = true;
    if (this.registerForm.valid) {
      const body = {
        name: this.registerForm.value.firstName + " " + this.registerForm.value.lastName,
        password: this.registerForm.value.password,
        admin: false,
        email: this.registerForm.value.email
      };
      this.notify = true;
      this.userService.addUser(body).subscribe();
    } else {
      this.notify = false;
    }
  } 
}

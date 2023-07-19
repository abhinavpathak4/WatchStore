import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public userService : UserServiceService, private router : Router){}

  logout(): void{
    this.userService.isLoggedIn = false;
  }

  detailsPage(brand : string): void{
      this.router.navigate(['details',brand])
    }
}

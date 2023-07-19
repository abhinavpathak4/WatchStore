import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public userService: UserServiceService, private router: Router) {}

  /**
   * @method logout
   * Logs out the user by setting the isLoggedIn flag to false.
   * @memberof NavbarComponent
   */
  logout(): void {
    this.userService.isLoggedIn = false;
  }

  /**
   * @method detailsPage
   * Navigates to the details page of the selected brand.
   * @param brand The brand name of the watch to view details.
   * @memberof NavbarComponent
   */
  detailsPage(brand: string): void {
    this.router.navigate(['details', brand])
  }
}

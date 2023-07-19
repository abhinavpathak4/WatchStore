import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartServiceService } from '../services/cart-service.service';
import { Products } from '../interfaces/products';
import { ProductServiceService } from '../services/product-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Array to store the list of watches
  watches: Products[] = [];

  // Flag to indicate whether the searched watch is not found
  notFound: boolean = false;

  // Flag to control the visibility of search results
  visibility: boolean = false;

  constructor(private productService: ProductServiceService,
              private cartService: CartServiceService, 
              private router: Router) { }

  
  ngOnInit() {
    // Fetch the list of watches from the productService
    this.watches = this.productService.watches;
  }

  /**
   * @method detailsPage
   * Navigate to the details page of the selected brand.
   * @param brand The brand name of the watch to view details.
   * @memberof HomeComponent
   */
  detailsPage(brand: string): void {
    this.router.navigate(['details', brand])
  }

  /**
   * @method addToCartList
   * Adds the selected watch to the cart list.
   * @param item The watch to be added to the cart.
   * @memberof HomeComponent
   */
  addToCartList(item: Products): void {
    this.cartService.addToCartList(item);
  }
  
  /**
   * @method filterWatches
   * Filters the list of watches based on the search query.
   * @param searchQuery The query to search for matching watch models.
   * @memberof HomeComponent
   */
  filterWatches(searchQuery: string): void {
    const lowerCaseQuery = searchQuery.toLowerCase();
    this.watches = this.productService.watches.filter(watch =>
      watch.model.toLowerCase().includes(lowerCaseQuery));
    this.notFound = this.watches.length === 0;
    this.visibility = true;
  }

  /**
   * @method home
   * Resets the watches list and search flags to show all watches on home page.
   * @memberof HomeComponent
   */
  home(): void {
    this.watches = this.productService.watches;
    this.notFound = false;
    this.visibility = false;
  }
}

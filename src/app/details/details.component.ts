import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartServiceService } from '../services/cart-service.service';
import { Products } from '../interfaces/products';
import { ProductServiceService } from '../services/product-service.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  // Variable to hold the details of the selected watch
  watch!: Products;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductServiceService,
    private cartService: CartServiceService
  ) {}

  
  ngOnInit() {
    // Retrieve the URL parameters and fetch the watch details
    this.getParams();
  }

  /**
   * @method getParams
   * Retrieves the URL parameters to fetch the details of the selected watch.
   * @memberof DetailsComponent
   */
  getParams(): void {
    this.route.params.subscribe(params => {
      // Find the watch details by its model from the productService
      this.watch = this.productService.findByModel(params['model']);
    });
  }

  /**
   * @method addToCartList
   * Adds the selected watch to the cart list.
   * @param item The watch to be added to the cart.
   * @methodof DetailsComponent
   */
  addToCartList(item: Products): void {
    this.cartService.addToCartList(item);
  }
}

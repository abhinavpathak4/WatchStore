import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../services/cart-service.service';
import { Products } from '../interfaces/products';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  // Array to store watches in the cart
  cartWatches: Products[] = [];

  constructor(private cartService: CartServiceService) {}

  ngOnInit() {
    // Fetch the watches in the cart from the cartService
    this.cartWatches = this.cartService.getCartList();
  }

  /**
   * @method getTotalCartValue
   * Calculates the total value of items in the cart.
   * @returns Total value of items in the cart.
   * @memberof CartComponent
   */
  getTotalCartValue(): number {
    return this.cartWatches.reduce((total, watch) => total + watch.price, 0);
  }

  /**
   * @method deleteFromCart
   * Deletes an item from the cart.
   * @param item The product to be removed from the cart.
   * @memberof CartComponent
   */
  deleteFromCart(item: Products): void {
    const index = this.cartWatches.indexOf(item);
    if (index !== -1) this.cartWatches.splice(index, 1);
  }

  /**
   * @method sortOptions
   * Sorts the items in the cart based on selected value (value1 or value2).
   * else if used instead of else to stop sorting when default (select) option is selected
   * @param selectedValue The selected value to determine the sort order.
   * @memberof CartComponent
   */
  sortOptions(selectedValue: string): void {
    if (selectedValue === "value1") {
      // Sort the cartWatches array in descending order based on price
      this.cartWatches = this.cartWatches.sort((b, a) => a.price - b.price);
    } else if (selectedValue === "value2") {
      // Sort the cartWatches array in ascending order based on price
      this.cartWatches = this.cartWatches.sort((a, b) => a.price - b.price);
    }
  }
}

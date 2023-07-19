import { Injectable } from '@angular/core';
import { Products } from '../interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
 
  constructor() { }

  // Array to store products in the cart
  private cartList: Products[] = [];

  /**
   * @method addToCartList
   * Adds or removes an item from the cart based on its cartAdded property.
   * If the item is added to the cart, it will be pushed to the cartList.
   * If the item is removed from the cart, it will be removed from the cartList.
   * @param item The product to be added to or removed from the cart.
   * @memberof CartServiceService
   */
  addToCartList(item: Products): void {
    item.cartAdded = !item.cartAdded;
    if (!this.cartList.includes(item)) {
      if (item.cartAdded) {
        this.cartList.push(item);
      }
    } else if (!item.cartAdded) {
      this.cartList.splice(this.cartList.indexOf(item), 1);
    }
  }
  
  /**
   * @method getCartList
   * Retrieves the products currently in the cart.
   * @returns An array of products in the cart.
   * @memberof CartServiceService
   */
  getCartList(): Products[] {
    return this.cartList;
  }

  /**
   * @method totalAmount
   * Calculates the total amount of products in the cart.
   * @returns The total amount of products in the cart.
   * @memberof CartServiceService
   */
  totalAmount(): number {
    let total: number = 0;
    this.cartList.reduce(((total, curr) => total + curr.price), 0)
    return total;
  }
}

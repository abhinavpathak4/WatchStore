import { Injectable } from '@angular/core';
import { Products } from '../interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
 

  constructor() { }

  private cartList : Products[] = [];



  addToCartList(item: Products): void {
    item.cartAdded = !item.cartAdded;
    if (!this.cartList.includes(item))
      if (item.cartAdded) this.cartList.push(item);
    if(!item.cartAdded)
      this.cartList.splice(this.cartList.indexOf(item), 1);
  }
  
  getCartList():Products[] {
    return this.cartList;
  }

  totalAmount() : number {
    let total : number = 0;
    this.cartList.reduce(((total, curr) => total+curr.price),0)
    return total;
  }
}

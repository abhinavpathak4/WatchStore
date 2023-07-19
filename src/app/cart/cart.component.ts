import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../services/cart-service.service';
import { Products } from '../interfaces/products';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartWatches: Products[] = [];

  constructor(private cartService : CartServiceService){}

  ngOnInit() {
    this.cartWatches = this.cartService.getCartList();
  }

  getTotalCartValue(): number {
    return this.cartWatches.reduce((total, watch) => total + watch.price, 0);
  }

  deleteFromCart(item: Products): void {
    const index = this.cartWatches.indexOf(item);
    if (index !== -1) this.cartWatches.splice(index, 1);
  }

  sortOptions(selectedValue: string): void {
    if (selectedValue === "value1") {
      this.cartWatches = this.cartWatches.sort((b,a) => a.price - b.price);
    } else if (selectedValue === "value2") {
      this.cartWatches = this.cartWatches.sort((a, b) => a.price - b.price);
    }
  }
}

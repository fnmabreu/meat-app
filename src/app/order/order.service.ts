import { ShoppingCartService } from '../restaurant-detail/shopping-cart/shopping-cart.service';
import { Injectable } from '@angular/core';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MEAT_API } from '../app.api';
import { catchError } from 'rxjs/operators';
import { Order } from './order.model';

@Injectable()
export class OrderService {

  ordersUrl: string = `${MEAT_API.baseUrl}/orders`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(
    private cartService: ShoppingCartService,
    private http: HttpClient
  ) {}

  itemsValue(): number {
    return this.cartService.total();
  }

  cartItems(): CartItem[] {
    return this.cartService.items;
  }

  increaseQty(item: CartItem) {
    this.cartService.increaseQty(item);
  }

  decreaseQty(item: CartItem) {
    this.cartService.decreaseQty(item);
  }

  remove(item: CartItem) {
    this.cartService.removeItem(item);
  }

  clear() {
    this.cartService.clear();
  }

  checkOrder(order: Order): Observable<any> {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

    return this.http
      .post(this.ordersUrl, JSON.stringify(order), this.httpOptions);
  }
}

import { ShoppingCartService } from '../restaurant-detail/shopping-cart/shopping-cart.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { MEAT_API } from '../app.api';
import { Order } from './order.model';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { MessageService } from '../message.service';
import { LoginService } from '../security/login/login.service';

@Injectable()
export class OrderService {
  ordersUrl = `${MEAT_API.baseUrl}/orders`; // URL web api
  private handleError: HandleError;

  constructor(
    private cartService: ShoppingCartService,
    private http: HttpClient,
    private loginService: LoginService,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError('OrderService');
  }

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

  checkOrder(order: Order): Observable<Order> {
    let headers = new HttpHeaders();

    if (this.loginService.isLoggedIn()) {
      headers = headers.set('Authorization', `Bearer ${this.loginService.user.accessToken}`);
    }

    return this.http
      .post<Order>(this.ordersUrl, order, { headers: headers})
      .pipe(catchError(this.handleError<Order>('checkOrder')));
  }
}

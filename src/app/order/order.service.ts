import { ShoppingCartService } from '../restaurant-detail/shopping-cart/shopping-cart.service';
import { Injectable } from '@angular/core';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MEAT_API } from '../app.api';
import { Order } from './order.model';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class OrderService {

  ordersUrl = `${MEAT_API.baseUrl}/orders`; // URL web api
  private handleError: HandleError;

  constructor(
    private cartService: ShoppingCartService,
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
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
    return this.http.post<Order>(
      this.ordersUrl,
      JSON.stringify(order),
      httpOptions)
      .pipe(
        catchError(this.handleError('checkOrder', order))
      );
  }
}

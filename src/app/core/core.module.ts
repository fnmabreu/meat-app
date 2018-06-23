import { NgModule } from '@angular/core';
import { ShoppingCartService } from '../restaurant-detail/shopping-cart/shopping-cart.service';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { OrderService } from '../order/order.service';
import { HttpErrorHandler } from '../http-error-handler.service';
import { MessageService } from '../message.service';

@NgModule({
  providers: [
    ShoppingCartService,
    RestaurantsService,
    OrderService,
    HttpErrorHandler,
    MessageService
  ]
})
export class CoreModule {}

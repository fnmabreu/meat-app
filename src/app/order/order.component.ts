import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RadioOption } from '../shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'mt-app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  postalCodePattern = /^\d{4}-\d{3}$/;

  orderForm: FormGroup;

  delivery: number = 2.9;

  orderId: string;

  paymentOptions: RadioOption[] = [
    { label: 'Dinheiro', value: 'MON' },
    { label: 'Cartão de Débito', value: 'DEB' },
    { label: 'Cartão Refeição', value: 'REF' }
  ];

  constructor(
    private orderService: OrderService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  static equalsTo(group: AbstractControl): { [key: string]: boolean } {
    const email = group.get('email');
    const emailConfirmation = group.get('emailConfirmation');

    if (!email || !emailConfirmation) {
      return undefined;
    }

    if (email.value !== emailConfirmation.value) {
      return { emailsNotMatch: true };
    }

    return undefined;
  }

  ngOnInit() {
    this.orderForm = this.formBuilder.group(
      {
        name: this.formBuilder.control('', [
          Validators.required,
          Validators.minLength(5)
        ]),
        nif: this.formBuilder.control(''),
        email: this.formBuilder.control('', [
          Validators.required,
          Validators.pattern(this.emailPattern)
        ]),
        emailConfirmation: this.formBuilder.control('', [
          Validators.required,
          Validators.pattern(this.emailPattern)
        ]),
        phone: this.formBuilder.control('', [Validators.required]),
        address: this.formBuilder.control('', [
          Validators.required,
          Validators.minLength(5)
        ]),
        locality: this.formBuilder.control('', [Validators.required]),
        zipCode: this.formBuilder.control('', [
          Validators.required,
          Validators.pattern(this.postalCodePattern)
        ]),
        district: this.formBuilder.control('', [Validators.required]),
        paymentOption: this.formBuilder.control('MON', [Validators.required])
      },
      { validator: OrderComponent.equalsTo }
    );
  }

  itemsValue(): number {
    return this.orderService.itemsValue();
  }

  cartItems(): CartItem[] {
    return this.orderService.cartItems();
  }

  increaseQty(item: any) {
    this.orderService.increaseQty(item);
  }

  decreaseQty(item: any) {
    this.orderService.decreaseQty(item);
  }

  remove(item: CartItem) {
    this.orderService.remove(item);
  }

  isOrderCompleted(): boolean {
    return this.orderId = undefined;
  }

  checkOrder(order: Order) {
    order.orderItems = this.cartItems().map(
      (item: CartItem) => new OrderItem(item.quantity, item.menuItem.id)
    );

    this.orderService.checkOrder(order)
      .pipe(tap((orderId: string) => {
        this.orderId = order.id;
      }))
      .subscribe(obj => {
      this.router.navigate(['/order-summary']);
      this.orderService.clear();
    });
  }
}

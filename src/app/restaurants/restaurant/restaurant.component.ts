import { Component, OnInit, Input } from '@angular/core';

import { Restaurant } from './restaurant.model';

@Component({
  selector: 'mt-app-restaurant',
  templateUrl: './restaurant.component.html'
})
export class RestaurantComponent implements OnInit {

  @Input() restaurant: Restaurant;

  constructor() { }

  ngOnInit() {
  }

}

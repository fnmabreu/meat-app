import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { Restaurant } from '../restaurants/restaurant/restaurant.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mt-app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html'
})
export class RestaurantDetailComponent implements OnInit {

  restaurant: Restaurant;

  constructor(private restaurantsService: RestaurantsService, private route: ActivatedRoute) { }

  // Utilizando o AtivatedRoute para obter o parametro 'id' definido na url da de um restaurante.
  ngOnInit() {
    this.restaurantsService.restaurantsById(this.route.snapshot.params['id'])
      .subscribe(response => {
        this.restaurant = response;
    });
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Restaurant } from './restaurant/restaurant.model';
import { MEAT_API } from '../app.api';
import { MenuItem } from '../restaurant-detail/menu-item/menu-item.model';

// Decorator @Injectable - necessário para acessar a serviços da framework angular
@Injectable()
export class RestaurantsService {
  restaurantUrl = `${MEAT_API.baseUrl}/restaurants`; // URL to web api

  constructor(private http: HttpClient) {
  }

  /** GET restaurants from the server */
  getRestaurants(search?: string): Observable<Restaurant[]> {
    let params: HttpParams;

    if (search) {
      params = new HttpParams().append('q', search);
    }
    return this.http.get<Restaurant[]>(this.restaurantUrl, { params: params });
  }

  restaurantsById(id: string): Observable<Restaurant> {
    const url = `${this.restaurantUrl}/${id}`; // GET restaurants/10
    return this.http.get<Restaurant>(url);
  }

  reviewsOfRestaurant(id: string): Observable<any> {
    const url = `${this.restaurantUrl}/${id}/reviews`; // GET restaurants/10/reviews
    return this.http.get(url);
  }

  menuOfRestaurant(id: string): Observable<MenuItem[]> {
    const url = `${this.restaurantUrl}/${id}/menu`; // GET restaurants/10/menu
    return this.http.get<MenuItem[]>(url);
  }
}

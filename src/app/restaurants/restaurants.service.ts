import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Restaurant } from './restaurant/restaurant.model';
import { MEAT_API } from '../app.api';
import { MenuItem } from '../restaurant-detail/menu-item/menu-item.model';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

// Decorator @Injectable - necessário para acessar a serviços da framework angular
@Injectable()
export class RestaurantsService {
  restaurantUrl = `${MEAT_API.baseUrl}/restaurants`; // URL to web api
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('RestaurantsService');
  }

  /** GET restaurants from the server */
  getRestaurants(): Observable<Restaurant[]> {
    return this.http
      .get<Restaurant[]>(this.restaurantUrl)
      .pipe(catchError(this.handleError('getRestaurants', [])));
  }

  restaurantsById(id: string): Observable<Restaurant> {
    const url = `${this.restaurantUrl}/${id}`; // GET restaurants/10
    return this.http
      .get<Restaurant>(url)
      .pipe(catchError(this.handleError<Restaurant>('searchRestaurant')));
  }

  reviewsOfRestaurant(id: string): Observable<any> {
    const url = `${this.restaurantUrl}/${id}/reviews`; // GET restaurants/10/reviews
    return this.http
      .get(url)
      .pipe(catchError(this.handleError<Restaurant>('reviewsOfRestaurant')));
  }

  menuOfRestaurant(id: string): Observable<MenuItem[]> {
    const url = `${this.restaurantUrl}/${id}/menu`; // GET restaurants/10/menu
    return this.http
      .get<MenuItem[]>(url)
      .pipe(catchError(this.handleError('menuOfRestaurant', [])));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Restaurant } from './restaurant/restaurant.model';
import { MEAT_API } from '../app.api';
import { ErrorHandler } from '../app.error-handler';


// Decorator @Injectable - necessário para acessar a serviços da framework angular

@Injectable()
export class RestaurantsService {

    constructor(private http: HttpClient) {}

    restaurants(): Observable<Restaurant[]> {
      return this.http.get<Restaurant[]>(`${MEAT_API.baseUrl}/restaurants`)
        .pipe(
          catchError(ErrorHandler.handleError)
        );
    }

    restaurantsById(id: string): Observable<Restaurant> {
      return this.http.get<Restaurant>(`${MEAT_API.baseUrl}/restaurants/${id}`)
        .pipe(
          catchError(ErrorHandler.handleError)
        );
    }
}

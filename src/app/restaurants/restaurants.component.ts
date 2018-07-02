import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from './restaurants.service';
import {
  trigger,
  state,
  transition,
  animate,
  style
} from '@angular/animations';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {
  switchMap,
  catchError,
  debounce,
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'mt-app-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch', [
      state(
        'hidden',
        style({
          opacity: 0,
          'max-height': '0px'
        })
      ),
      state(
        'visible',
        style({
          opacity: 1,
          'max-height': '70px',
          'margin-top': '20px'
        })
      ),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {
  searchBarState = 'hidden';

  restaurants: Restaurant[];

  searchForm: FormGroup;
  searchControl: FormControl;

  constructor(
    private restaurantsService: RestaurantsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.searchControl = this.formBuilder.control('');

    this.searchForm = this.formBuilder.group({
      searchControl: this.searchControl
    });

    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(searchTerm =>
          this.restaurantsService
            .getRestaurants(searchTerm)
            .pipe(catchError(error => from([])))
        )
      )
      .subscribe(restaurants => (this.restaurants = restaurants));

    this.restaurantsService.getRestaurants().subscribe(response => {
      this.restaurants = response;
    });
  }

  toggleSearch() {
    this.searchBarState =
      this.searchBarState === 'hidden' ? 'visible' : 'hidden';
  }
}

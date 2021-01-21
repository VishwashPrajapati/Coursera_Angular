import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { Observable,of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishData(): Observable<Dish[]> {
    // fetch data through promises
    // return new Promise(resolve => {
    //   // simulate server latency with 2second delay
    //   setTimeout(() => resolve(DISHES), 2000)
    // });

    // fetch data through observable
    // return of(DISHES).pipe(delay(2000)).toPromise();

    // fetch data through observable and subscribe in component
    return of(DISHES).pipe(delay(2000));
  }
  getDish(id: string): Observable<Dish> {
    // fetch data through promises
    // return new Promise(resolve => {
    //   setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000)
    // });

    // fetch data through observable
    // return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000)).toPromise();

    // fetch data through observable and subscribe in component
    return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
  }
  getFeaturedDish(): Observable<Dish> {
    // fetch data through promises
    // return new Promise(resolve => {
    //   setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
    // });

    // fetch data through observable
    // return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000)).toPromise();

    // fetch data through observable and subscribe in component
    return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  }

  getDishIds():Observable<string[] | any>{
    return of(DISHES.map(dish => dish.id));
  }

}

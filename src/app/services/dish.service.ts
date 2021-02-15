import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Observable, of, } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';


@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }


  // baseUrl = 'http://localhost:3000/';

  getDishData(): Observable<Dish[]> {
    // fetch data through promises
    // return new Promise(resolve => {
    //   // simulate server latency with 2second delay
    //   setTimeout(() => resolve(DISHES), 2000)
    // });

    // fetch data through observable
    // return of(DISHES).pipe(delay(2000)).toPromise();

    // fetch data through observable and subscribe in component

    return this.http.get<Dish[]>(baseURL + 'dishes')
      .pipe(catchError(this.processHTTPMsgService.handleError));
    // });
    // return of(DISHES).pipe(delay(2000));

  }
  getDish(id: string): Observable<Dish> {
    // fetch data through promises
    // return new Promise(resolve => {
    //   setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000)
    // });

    // fetch data through observable
    // return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000)).toPromise();

    // fetch data through observable and subscribe in component
    return this.http.get<Dish>(baseURL + 'dishes/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  getFeaturedDish(): Observable<Dish> {
    // fetch data through promises
    // return new Promise(resolve => {
    //   setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
    // });

    // fetch data through observable
    // return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000)).toPromise();

    // fetch data through observable and subscribe in component
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDishIds(): Observable<string[] | any> {
    return this.getDishData().pipe(map(dishes => dishes.map(dish => dish.id)))
      .pipe(catchError(error => error));
    // return of(DISHES.map(dish => dish.id));
  }

  putDish(dish: Dish): Observable<Dish> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<Dish>(baseURL + 'dishes/' + dish.id, dish, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }
}

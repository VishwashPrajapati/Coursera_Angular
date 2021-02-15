import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTION } from '../shared/promotions';
import { Observable, of } from 'rxjs';
import { delay, catchError, map } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';



@Injectable({
  providedIn: 'root'
})
export class PromotionserviceService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

  getPromotionData(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotion')
      .pipe(catchError(this.processHTTPMsgService.handleError));
    // return of(PROMOTION).pipe(delay(2000));
  }
  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));

    // return of(PROMOTION.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
  }
  getFeaturedPromotion(): Observable<Promotion> {

    return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true').pipe(map(promotions => promotions[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));


    // this.http.get<Promotion[]>(baseURL + 'promotions?featured=true').pipe(map((promotions) => promotions.featured)[0])
      // .pipe(catchError(this.processHTTPMsgService.handleError));
    // return of(PROMOTION.filter((promo) => promo.featured)[0]).pipe(delay(2000));
  }



}

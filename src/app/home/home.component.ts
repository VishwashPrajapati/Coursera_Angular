import { Component, OnInit,Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Promotion } from '../shared/promotion';
import { Leader } from '../shared/leader';
import { PromotionserviceService } from '../services/promotionservice.service';
import { DishService } from '../services/dish.service';
import { LeaderService } from '../services/leader.service';
import { flyInOut,expand } from '../animations/app.animations';
import { baseURL } from '../shared/baseurl';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display:block'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})

export class HomeComponent implements OnInit {

  promotion: Promotion;
  dishErrMess:string;
  promErrMess:string;
  leadErrMess:string;
  dish: Dish;
  leader: Leader;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionserviceService,
    private leaderservice: LeaderService,
    @Inject('BaseURL') private BaseURL) {

  }
  ngOnInit(): void {
    this.promotionservice.getFeaturedPromotion()
      .subscribe((promotion) => this.promotion = promotion);
    this.dishservice.getFeaturedDish()
      .subscribe((dish) => this.dish = dish),errmess => this.dishErrMess = <any>errmess;
    this.leaderservice.getFeaturedLeader()
      .subscribe((leader) => this.leader = leader);
  }

}

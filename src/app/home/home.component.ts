import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { Promotion } from '../shared/promotion';
import { Leader } from '../shared/leader';
import { PromotionserviceService } from '../services/promotionservice.service';
import { DishService } from '../services/dish.service';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  promotion: Promotion;
  dish: Dish;
  leader: Leader;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionserviceService,
    private leaderservice: LeaderService) {

  }
  ngOnInit(): void {
    this.promotionservice.getFeaturedPromotion()
      .subscribe((promotion) => this.promotion = promotion);
    this.dishservice.getFeaturedDish()
      .subscribe((dish) => this.dish = dish);
    this.leaderservice.getFeaturedLeader()
      .subscribe((leader) => this.leader = leader);
  }

}

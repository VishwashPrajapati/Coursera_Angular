import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { flyInOut,expand } from '../animations/app.animations';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display:block'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class MenuComponent implements OnInit {
  dishes: Dish[];
  errMess: string;
  // selectedDish: Dish;
  constructor(private dishservice: DishService,
    @Inject('BaseURL') private BaseURL) {
  }

  ngOnInit(): void {
    this.dishservice.getDishData().subscribe((dishes) => this.dishes = dishes, errmess => this.errMess = <any>errmess);
    console.log(this.dishes);
  }

  // onSelect(dish) {
  //   this.selectedDish = dish;
  //   console.log(this.selectedDish)
  // }

}

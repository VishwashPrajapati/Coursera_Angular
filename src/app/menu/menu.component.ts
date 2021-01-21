import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  dishes:Dish[];
  selectedDish :Dish;
  constructor(private dishservice:DishService) { 
  }

  ngOnInit(): void {
    this.dishservice.getDishData()
    .subscribe((dishes) => this.dishes = dishes);
  }

  onSelect(dish) {
    this.selectedDish = dish;
    console.log(this.selectedDish)
  }

}

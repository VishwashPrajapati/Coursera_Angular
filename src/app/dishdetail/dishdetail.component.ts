import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { Params,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css']
})
export class DishdetailComponent implements OnInit {

  // dishes = DISHES;
  dish :Dish;
  constructor(private dishservice:DishService,
    private location:Location,
    private activeroute:ActivatedRoute) { }

  ngOnInit(): void {
    // console.log(this.comments[0].comment)
    let id = this.activeroute.snapshot.params['id'];
    this.dishservice.getDish(id)
    .then((dish)=>this.dish = dish);
  }
  goBack():void{
    this.location.back();
  }

  // @Input() dish:Dish;
  
}

import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { Params,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css']
})
export class DishdetailComponent implements OnInit {

  // dishes = DISHES;
  dish :Dish;
  dishIds:string[];
  prev:String;
  next:string;

  //snapshot 
  constructor(private dishservice:DishService,
    private location:Location,
    private activeroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.dishservice.getDishIds()
    .subscribe((dishIds)=>this.dishIds = dishIds)
    // console.log(this.comments[0].comment)
    let id = this.activeroute.params
    .pipe(switchMap((params:Params) => this.dishservice.getDish(params['id']))).
    subscribe((dish)=> {this.dish = dish;this.setPrevNext(dish.id)});
  }
  setPrevNext(dishIds:string){
    const index = this.dishIds.indexOf(dishIds);
    this.prev = this.dishIds[(this.dishIds.length + index-1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index+1) % this.dishIds.length];
  }
  goBack():void{
    this.location.back();
  }
  

  // @Input() dish:Dish;
  
}


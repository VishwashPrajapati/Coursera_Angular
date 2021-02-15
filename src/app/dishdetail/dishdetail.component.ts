import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Dish } from '../shared/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Comments } from '../shared/comments';
import { visibility,flyInOut,expand } from '../animations/app.animations';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display:block'
  },
  animations: [
    visibility(),
    flyInOut(),
    expand()
  ]
})
export class DishdetailComponent implements OnInit {

  // dishes = DISHES;
  dish: Dish;
  errMess: String;
  dishIds: string[];
  prev: String;
  next: string;
  visibility = 'shown';
  @ViewChild('fform') commentFormDirective;

  //snapshot 
  constructor(private dishservice: DishService,
    private location: Location,
    private activeroute: ActivatedRoute, private fb: FormBuilder,@Inject('BaseURL') private BaseURL) { }

  commentForm: FormGroup;
  commentdata: Comments;
  dishCopy: Dish;
  Date: Date;
  formErrors = {
    'author': '',
    'comment': '',
    'rating': '',
  };

  validationMessages = {
    'author': { 'required': 'Author Name is Required.', 'minlength': 'Author must be at least 2 character long.', 'maxlength': 'Author cannot be 25 character long.' },
    'comment': { 'required': 'Comment is Required.', 'minlength': 'Comment must be at least 2 character long.', 'maxlength': 'Comment cannot be 25 character long.' },
    'rating': { 'required': 'This rating field is Required.' },
  };

  ngOnInit(): void {
    this.dishservice.getDishIds()
      .subscribe((dishIds) => this.dishIds = dishIds)
    // console.log(this.comments[0].comment)
    let id = this.activeroute.params
      .pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(params['id']); })).
      subscribe((dish) => { this.dish = dish; this.dishCopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
        errmess => this.errMess = <any>errmess);

    this.createForm();
  }

  createForm() {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      rating: ['5', [Validators.required]],
      comment: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    });
    this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }
  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {

        this.formErrors[field] = '';
        const control = form.get(field)
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field]
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }

      }
    }
  }


  onSubmit() {
    this.commentdata = this.commentForm.value;
    this.commentdata.date = Date().toString();
    this.dishCopy.comments.push(this.commentdata);
    this.dishservice.putDish(this.dishCopy).subscribe(dish => {
      this.dish = dish;
      this.dishCopy = dish;
    },
      errmess => {
        this.dish = null;
        this.dishCopy = null;
        this.errMess = <any>errmess
      });
    this.commentForm.reset({
      author: '',
      rating: 5,
      comments: '',
    });
    // this.commentFormDirective.resetForm();
  }

  setPrevNext(dishIds: string) {
    const index = this.dishIds.indexOf(dishIds);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
  goBack(): void {
    this.location.back();
  }


  // @Input() dish:Dish;






}


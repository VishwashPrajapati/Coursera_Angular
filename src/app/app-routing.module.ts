import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';



const routes: Routes = [

  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'menu',
    component:MenuComponent
  },
  {
    path:'',
    redirectTo:'/home',
    pathMatch:'full'
  },
  {
    path:'contact',
    component:ContactComponent
  },
  {
    path:'about',
    component:AboutComponent
  }
  ,{
    path:'dishdetail/:id',
    component:DishdetailComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

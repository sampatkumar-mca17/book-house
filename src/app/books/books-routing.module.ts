import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksWrapperComponent } from './books-wrapper/books-wrapper.component';
import { ViewAllComponent } from './view-all/view-all.component';

const routes: Routes = [
  {
    path:'',
    component:BooksWrapperComponent,
    children:[
      {
        path:'view-all',
        component:ViewAllComponent
      },
      {
        path:'',
        redirectTo:'view-all',
        pathMatch:'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }

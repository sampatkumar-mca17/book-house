import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { ViewAllComponent } from './view-all/view-all.component';
import { BooksWrapperComponent } from './books-wrapper/books-wrapper.component';
import { BooksApiService } from './services/books-api.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component'
import { PComponentsModule } from '../p-components/p-components.module';
import { AddNewBookComponent } from './view-all/add-new-book/add-new-book.component';




@NgModule({
  declarations: [
    ViewAllComponent,
    BooksWrapperComponent,
    ProfileComponent,
    AddNewBookComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    HttpClientModule,
    PComponentsModule
  ],
  providers: [
    HttpClient,
    BooksApiService
  ]
})
export class BooksModule { }

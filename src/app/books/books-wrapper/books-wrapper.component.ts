import { Component, inject, OnInit } from '@angular/core';
import { BooksApiService } from '../services/books-api.service';
import { endpoint } from '../../common-utils/constants'

@Component({
  selector: 'app-books-wrapper',
  templateUrl: './books-wrapper.component.html',
  styleUrls: ['./books-wrapper.component.scss']
})
export class BooksWrapperComponent implements OnInit {
  private booksApiService = inject(BooksApiService);
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.booksApiService.setEndPoint(endpoint)
  }
}

import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { BooksApiService } from '../services/books-api.service';
import { Observable, of, Subscription } from 'rxjs';
import { AuthorDetails, BookCardDetails, BookDetails } from '../../common-utils/interfaces'
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from '../profile/profile.component';
import { AddNewBookComponent } from './add-new-book/add-new-book.component';
import * as uuid from 'uuid';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.scss']
})
export class ViewAllComponent implements OnInit, OnDestroy {
  /** Based on the screen size, switch from standard to one column per row */
  private booksApiService = inject(BooksApiService);
  private dialog = inject(MatDialog)
  private subscriptions = new Subscription()
  private bookDetails:any;
  private cardsForDesktops:BookCardDetails[];
  isHandset:boolean;
  cards: Observable<BookCardDetails[]>= of([]);
  noData:boolean;
  author:AuthorDetails;
  cols: any;
  rows: number;
  ngOnInit(): void {
    this.subscriptions.add(
      this.booksApiService.getBooks().subscribe({
        next:(resp) => {
          this.bookDetails = resp.data;
          this.cardsForDesktops = this.getCards();
          this.assembleDashboard();
        }
      })
    )

  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscriptions.unsubscribe();

  }
  openProfileDialog(): void {
    this.dialog.open(ProfileComponent, {
      data: {...this.author},
    });
  }

  sortBooksByTitle(){
    this.cardsForDesktops.sort((a, b)=> a.title < b.title? -1 : 1)

  }
  sortBooksByDate(){
    this.cardsForDesktops.sort((a, b)=> a.publishDate - b.publishDate)
  }

  openAddNewComponent(mode:string, id?:number){
    const book = this.cardsForDesktops.filter((book) => book.id === id)
    const dialog = this.dialog.open(AddNewBookComponent,
      {
       data: {bookDetails: book[0], mode},
      }
    )
    dialog.afterClosed().subscribe((result)=>{
      if(result){
        this.noData = false;
        this.addOrUpdateBooks(result,id)
      }
    })
  }

  deleteBook(id:number){
    this.cardsForDesktops = this.cardsForDesktops.filter((book) => book.id !== id)
    this.assembleDashboard()

    if(this.cardsForDesktops.length === 0){
      this.noData = true
    }
    else{
      this.noData = false
    }
  }

  private addOrUpdateBooks(data:BookDetails, id?:number){
    if(id){
      const dataToBeUpdated = {
        imageUrl: data.imageUrl,
        publishDate: data.publishDate,
        purchaseLink: data.purchaseLink,
        title: data.title
      }
      const index = this.cardsForDesktops.findIndex((book) => book.id === id)
      this.cardsForDesktops[index] = {...this.cardsForDesktops[index], ...dataToBeUpdated}
    }
    else{
      const dataToBePushed:BookCardDetails = {
        id: uuid.v4(),
        imageUrl:data.imageUrl,
        title: data.title,
        publishDate: data.publishDate,
        purchaseLink:data.purchaseLink,
        type:'book'
      }
      this.cardsForDesktops.push({...dataToBePushed})
    }
    this.assembleDashboard()
  }

  private assembleDashboard(){
    this.author = {
      name:this.bookDetails.author,
      birthPlace: this.bookDetails.birthPlace,
      birthday: this.bookDetails.birthday
    }
    this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        this.isHandset = true
        this.cols = 2
        this.rows = 1
      }
      else{
        this.cols = 0.5
        this.rows = 1
        this.isHandset = false
      }
      return this.cardsForDesktops;

    })
  );
  }

  private getCards(){
      const c: BookCardDetails[] = [];
        this.bookDetails.books.map((book:any) => {
          c.push({
            id:uuid.v4(),
            title:book.title,
            type:'book',
            publishDate:book.PublishDate,
            purchaseLink:book.purchaseLink,
            imageUrl:book.imageUrl
          })
        })

        return c
  }


  constructor(private breakpointObserver: BreakpointObserver) {}
}

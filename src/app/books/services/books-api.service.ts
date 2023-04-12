import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksApiService {

  constructor( private httpService: HttpClient) { }
  private endpoint:string = '';
  getBooks():Observable<any>{
    return this.httpService.get(this.endpoint);
  }

  setEndPoint(endpoint:string){
    this.endpoint = endpoint;
  }
}

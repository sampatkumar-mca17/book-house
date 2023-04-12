interface CardDetails {
  id:number,
  title:string,
  type:'author' | 'book',
}
export interface AuthorDetails{
  name:string;
  birthPlace:string,
  birthday:string
}
export interface AuthorCardDetails extends CardDetails{
  birthPlace:string,
  birthday:string
}

export interface BookCardDetails extends CardDetails{
  publishDate:number,
  purchaseLink:string,
  imageUrl:string
}

export interface BookDetails{
  title:string,
  publishDate:number,
  purchaseLink:string,
  imageUrl:string
}

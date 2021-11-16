import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class ProductService {
  private productUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}   
  
  getProducts(): Observable<IProduct[]> {
      return this.http.get<IProduct[]>(this.productUrl).pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getProductById(id: number): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.productUrl}?productId=${id}`).pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    //  in a real world app, we may send the error to some remote logging infrastructure
    //  instead of just loggin it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      //  A Client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      //  The backend returned an unsuccessful response code.
      //  The response body may contain clues as to what went wrong.
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
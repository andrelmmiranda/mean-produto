import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { catchError, map, tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = 'http://localhost:3000/products';

  constructor(private snackBar: MatSnackBar, private http: HttpClient){}

  showMessage(msg: string, isError = false): void{
    this.snackBar.open(msg, 'fechar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  errorHandler(error: any): Observable<any>{
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY;
  }

  create(product: Product): Observable<Product>{
    return this.http.post<Product>(this.baseUrl, product)
      .pipe(map(object => object), catchError(error => this.errorHandler(error)));
  }

  read(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl)
      .pipe(map(object => object), catchError(error => this.errorHandler(error)))
      .pipe(tap(deps => console.log(deps)), delay(1000));
  }

  readById(id: string): Observable<Product>{
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Product>(url)
      .pipe(map(object => object), catchError(error => this.errorHandler(error)));
  }

  update(product: Product): Observable<Product>{
    const url = `${this.baseUrl}/${product._id}`
    return this.http.put<Product>(url, product)
      .pipe(map(object => object), catchError(error => this.errorHandler(error)));
  }

  delete(id: string): Observable<Product>{
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Product>(url)
      .pipe(map(object => object), catchError(error => this.errorHandler(error)));
  }
}
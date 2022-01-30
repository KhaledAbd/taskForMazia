import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/models/product';
import { environment } from '../environments/environment';

const apiUrl = environment.apiUrl + 'product/'
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient ) { }

  getAllProduct(): Observable<Product[] | undefined>{
    return this.http.get<Product[]>(apiUrl);
  }
  getProduct(productId: number): Observable<Product | undefined>{
    return this.http.get<Product>(apiUrl + productId);
  }

  postProduct(product: Product): Observable<{product:Product, id:number }> {
    return this.http.post<{product:Product, id:number }>(apiUrl, product);
  }
  remove(productId: number): Observable<any>{
    return this.http.delete(apiUrl+ productId);
  }
}

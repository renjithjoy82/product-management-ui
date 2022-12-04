
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  readonly productAPIURL = "https://product-management-app-api.azurewebsites.net/api";

  constructor(private http:HttpClient) { }

  // Product API
  getProductList():Observable<any[]> {
    return this.http.get<any>(this.productAPIURL + '/products');
  }

  addProduct(data:any) {
    return this.http.post(this.productAPIURL + '/products', data);
  }

  updateProduct(id:number|string, data:any) {
    return this.http.put(this.productAPIURL + `/products/${id}`, data);
  }

  deleteProduct(id:number|string) {
    return this.http.delete(this.productAPIURL + `/products/${id}`);
  }

  // Product Type API
  getProductTypeList():Observable<any[]> {
    return this.http.get<any>(this.productAPIURL + '/productTypes');
  }
}

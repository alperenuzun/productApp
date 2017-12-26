import { Http, Headers, RequestOptions } from '@angular/http';
//import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Products } from '../../models/products';

/*
  Generated class for the GetProductsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GetProductsProvider {

  constructor(public http: Http) {
    console.log('Hello GetProductsProvider Provider');
    this.http = http;
  }

  load(faculty: number, category: number) : Observable<Products[]>{
    return this.http.get(`http://test.setrowid.com/alperen_test/get_products.php?faculty=${faculty}&category=${category}`).map(res => <Products[]>res.json());
  }

  loadDetails(product_id: number): Observable<Products> {
    return this.http.get(`http://test.setrowid.com/alperen_test/get_product_details.php?s=${product_id}`).map(res => <Products>(res.json()))
  }

  addProduct(product:{}) : Observable<{}>{
    let headers = new Headers({});
    let options = new RequestOptions({ headers: headers });
    let data = JSON.stringify(product);
    
    return this.http.post(`http://test.setrowid.com/alperen_test/set_product.php`, data, options)
      .map(res => (res.json()))
  }

  updateProduct(product:{}) : Observable<{}>{
    let headers = new Headers({});
    let options = new RequestOptions({ headers: headers });
    let data = JSON.stringify(product);
    
    return this.http.post(`http://test.setrowid.com/alperen_test/set_product.php`, data, options)
      .map(res => (res.json()))
  }

  deleteProduct(product:{}) : Observable<{}>{
    let headers = new Headers({});
    let options = new RequestOptions({ headers: headers });
    let data = JSON.stringify(product);
    
    return this.http.post(`http://test.setrowid.com/alperen_test/set_product.php`, data, options)
      .map(res => (res.json()))
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GetProductsProvider } from '../../providers/get-products/get-products';
import { Products } from '../../models/products';
import { ProductDetailsPage } from '../product-details/product-details';

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
  products : Products[];
  faculty: number;
  category: number;
  auth: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private AllProducts: GetProductsProvider) {
    this.faculty = navParams.get("faculty");
    this.category = navParams.get("category");
    this.auth = navParams.get("auth");

    this.AllProducts.load(this.faculty, this.category).subscribe(products => {//o fakülte ve kategoriye ait tüm ürünler
      this.products = products;
      console.log(products);
    });

  }

  goToDetails(product_id: string) {//detay sayfasına git
    this.navCtrl.push(ProductDetailsPage, {"product_id":product_id,"faculty":this.faculty, "auth":this.auth,"category":this.category});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
  }

}

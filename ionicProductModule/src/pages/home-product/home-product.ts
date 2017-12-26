import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AddProductPage } from '../add-product/add-product';
import { ProductsPage } from '../products/products';

/**
 * Generated class for the HomeProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-product',
  templateUrl: 'home-product.html',
})
export class HomeProductPage {
  faculty:number;
  userAuthority: number = 1; // 1 -> yetkili kullanıcı, 2-> normal kullanıcı

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    //this.userAuthority = navParams.get('auth');
  }

  goToAddProduct(){
    console.log(this.faculty);
    this.navCtrl.push(AddProductPage, { "faculty":this.faculty });
  }

  goToCategoryDetails(category_id: number){
    if(this.faculty == undefined){//fakülte seçilmediyse hata göster.
      let alert = this.alertCtrl.create({
        title: '',
        subTitle: 'Fakülte seçimini yapmadınız!',
        buttons: ['OK']
      });

      alert.present();
    }else{
      this.navCtrl.push(ProductsPage, { "faculty":this.faculty, "category": category_id, "auth": this.userAuthority });//kategori detayına git
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeProductPage');
  }

}

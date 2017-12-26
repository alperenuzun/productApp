import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Products } from '../../models/products';
import { GetProductsProvider } from '../../providers/get-products/get-products';
import { UpdateProductPage } from '../update-product/update-product';
import { HomeProductPage } from '../home-product/home-product';

/**
 * Generated class for the ProductDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {
  product: Products;
  product_id: number;
  faculty: number;
  receivedData: Products;
  category: number;
  auth: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private Product: GetProductsProvider,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
    this.product_id = navParams.get('product_id');
    this.faculty = navParams.get('faculty');
    this.category = navParams.get('category');
    this.auth = navParams.get('auth');

    this.Product.loadDetails(this.product_id).subscribe(product => {//ürün detayı getir
      this.product = product;
      console.log(product)
    })
  }

  goToUpdate(){//update sayfasına git
    this.navCtrl.push(UpdateProductPage, {"product_id":this.product_id,"faculty":this.faculty,"category":this.category});
  }

  presentToast() {//uyarı kutucuğu
    let toast = this.toastCtrl.create({
      message: 'Silme işlemi başarılı.',
      duration: 4000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Bildirim verildi');
    });
  
    toast.present();
  }

  goToDelete(){
    let confirm = this.alertCtrl.create({
      message: 'Silmek istediğinize emin misiniz?',
      buttons: [
        {
          text: 'Hayır',
          handler: () => {
            console.log('Hayır tıklandı');
          }
        },
        {
          text: 'Evet',
          handler: () => {
            console.log('Evet tıklandı');
            
            this.Product.deleteProduct({"product_id":this.product_id}).subscribe(res => {//ürün sil
              console.log(res);
      
              if(res["success"]){
                this.presentToast();//bildirim gösterip anasayfaya git
                this.navCtrl.push(HomeProductPage, {"faculty":this.faculty,"auth":this.auth});
              }
            });

          }
        }
      ]
    });
    confirm.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
  }

}

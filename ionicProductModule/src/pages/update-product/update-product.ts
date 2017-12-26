import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { GetProductsProvider } from '../../providers/get-products/get-products';
import { Products } from '../../models/products';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HomeProductPage } from '../home-product/home-product';

/**
 * Generated class for the UpdateProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-product',
  templateUrl: 'update-product.html',
})
export class UpdateProductPage {
  product: Products;
  formgroup:FormGroup;
  product_name:AbstractControl;
  product_price:AbstractControl;
  product_category:AbstractControl;
  product_calory:AbstractControl;
  product_explanation:AbstractControl;
  getFaculty: number;
  product_id: number;
  category: number;
  private imageSrc: string = "http://test.setrowid.com/alperen_test/img/reklam.png";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder:FormBuilder, 
    private Product: GetProductsProvider,
    private Camera: Camera,
    private toastCtrl: ToastController
  ) {
    this.getFaculty = navParams.get("faculty");
    this.product_id = navParams.get("product_id");
    this.category = navParams.get("category");

    this.formgroup = this.formBuilder.group({
      product_name:['',[Validators.required, Validators.minLength(3)]],
      product_price:['',[Validators.required, Validators.maxLength(5)]],
      product_category:['',[Validators.required]],
      product_calory:[''],
      product_explanation:['',[Validators.required, Validators.maxLength(50)]]
    });

    this.product_name = this.formgroup.controls['product_name'];
    this.product_price = this.formgroup.controls['product_price'];
    this.product_category = this.formgroup.controls['product_category'];
    this.product_calory = this.formgroup.controls['product_calory'];
    this.product_explanation = this.formgroup.controls['product_explanation'];

    this.Product.loadDetails(this.product_id).subscribe(product => {//update olacak ürün bilgileri
      this.product = product;
      console.log(product)
    })
  }

  presentToast(msg: string) {//bildirim göster
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Bildirim verildi');
    });
  
    toast.present();
  }

  openGallery(){//telefondan resim seç
    let cameraOptions: CameraOptions = {
      sourceType: this.Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.Camera.DestinationType.FILE_URI,
      quality: 100,
      targetWidth: 320,
      targetHeight: 200,
      encodingType: this.Camera.EncodingType.JPEG,
      correctOrientation: true
    }
  
    this.Camera.getPicture(cameraOptions)
      .then(image_base64_uri => this.imageSrc = image_base64_uri,
      err => console.log(err));//seçilen resmi ekrana koy
  }

  onSubmit(formData) {
    
    if(formData.valid) {
      console.log(formData.value);
      formData.value["faculty"] = this.getFaculty;
      formData.value["base64_encoded_image"] = this.imageSrc;//form datasına eklenecekler

      if(formData.value["product_category"] == ""){
        this.presentToast('Kategori seçimini yapmadınız!'); // kategori seçilmediyse uyarı göster
      }else{
        
        this.Product.updateProduct(formData.value).subscribe(res => {//ürün bilgisini güncelle
          console.log(res);
  
          if(res["success"]){//başarılıysa uyarı göster, anasayfaya git
            this.presentToast('Güncelleme işlemi başarılı!');
            this.navCtrl.push(HomeProductPage, {"faculty":this.getFaculty});
          }
        });
      }
      
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateProductPage');
  }

}

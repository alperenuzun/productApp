import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { GetProductsProvider } from '../../providers/get-products/get-products';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { HomeProductPage } from '../home-product/home-product';

/**
 * Generated class for the AddProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {
  formgroup:FormGroup;
  product_name:AbstractControl;
  product_price:AbstractControl;
  product_category:AbstractControl;
  product_calory:AbstractControl;
  product_explanation:AbstractControl;
  getFaculty: number;
  isAddProduct: number;
  isClickImageAdd : boolean = false;
  private imageSrc: string = "http://test.setrowid.com/alperen_test/img/bg.jpg";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder:FormBuilder,
    private provider: GetProductsProvider,
    private Camera: Camera,
    private toastCtrl: ToastController
  ) {

    this.getFaculty = navParams.get("faculty");

    this.formgroup = this.formBuilder.group({
      product_name:['',[Validators.required, Validators.minLength(3)]],
      product_price:['',[Validators.required, Validators.maxLength(3)]],
      product_category:['',[Validators.required]],
      product_calory:[''],
      product_explanation:['',[Validators.required, Validators.maxLength(50)]]
    });

    this.product_name = this.formgroup.controls['product_name'];
    this.product_price = this.formgroup.controls['product_price'];
    this.product_category = this.formgroup.controls['product_category'];
    this.product_calory = this.formgroup.controls['product_calory'];
    this.product_explanation = this.formgroup.controls['product_explanation'];
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Ekleme işlemi başarılı',
      duration: 4000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Bildirim verildi');
    });
  
    toast.present();
  }

  openGallery(){
    this.isClickImageAdd = true;
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
      err => console.log(err));
  }

  onSubmit(formData) {
    if(formData.valid) {
      formData.value["faculty"] = this.getFaculty;
      formData.value["base64_encoded_image"] = this.imageSrc;
      console.log(formData.value);
      
      this.provider.addProduct(formData.value).subscribe(res => {
        this.isAddProduct = res["success"];
        console.log(res);

        if(this.isAddProduct){
          this.presentToast();
          this.navCtrl.push(HomeProductPage, {"faculty":this.getFaculty});
        }
      });
      
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
  }

}

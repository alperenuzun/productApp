import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ProductsPage } from '../pages/products/products';
import { ProductDetailsPage } from '../pages/product-details/product-details';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { GetProductsProvider } from '../providers/get-products/get-products';
import { HomeProductPage } from '../pages/home-product/home-product';
import { AddProductPage } from '../pages/add-product/add-product';
import { UpdateProductPage } from '../pages/update-product/update-product';
import { Camera } from '@ionic-native/camera';


@NgModule({
  declarations: [
    MyApp,
    ProductsPage,
    ProductDetailsPage,
    HomeProductPage,
    AddProductPage,
    UpdateProductPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProductsPage,
    ProductDetailsPage,
    HomeProductPage,
    AddProductPage,
    UpdateProductPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GetProductsProvider,
    Camera
  ]
})
export class AppModule {}

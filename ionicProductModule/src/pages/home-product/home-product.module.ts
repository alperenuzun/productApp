import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeProductPage } from './home-product';

@NgModule({
  declarations: [
    HomeProductPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeProductPage),
  ],
})
export class HomeProductPageModule {}

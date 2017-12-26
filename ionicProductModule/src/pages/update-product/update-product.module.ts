import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateProductPage } from './update-product';

@NgModule({
  declarations: [
    UpdateProductPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateProductPage),
  ],
})
export class UpdateProductPageModule {}

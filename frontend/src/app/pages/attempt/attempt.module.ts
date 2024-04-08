import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttemptPageRoutingModule } from './attempt-routing.module';

import { AttemptPage } from './attempt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttemptPageRoutingModule
  ],
  declarations: [AttemptPage]
})
export class AttemptPageModule {}

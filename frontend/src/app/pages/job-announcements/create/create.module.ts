import { NgModule } from '@angular/core';

import { CreatePage } from './create.page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { JobAnnouncementPageRoutingModule } from '../job-announcement-routing.module';
import { SelectComponent } from 'src/app/components/select/select.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobAnnouncementPageRoutingModule,
    CurrencyMaskModule,
  ],
  declarations: [CreatePage, SelectComponent],
})
export class CreatePageModule {}

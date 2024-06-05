import { NgModule } from '@angular/core';

import { IndexPage } from './index.page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { JobAnnouncementPageRoutingModule } from '../job-announcement-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobAnnouncementPageRoutingModule,
  ],
  declarations: [IndexPage],
})
export class IndexPageModule {}

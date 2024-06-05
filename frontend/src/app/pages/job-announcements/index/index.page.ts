import { Component, OnInit, ViewChild } from '@angular/core';
import {
  IonContent,
  IonInfiniteScroll,
  MenuController,
  ViewWillEnter,
} from '@ionic/angular';

import { JobAnnouncement } from 'src/app/models/job-announcement.model';
import { jobAnnouncementService } from 'src/app/services/job-announcement.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit, ViewWillEnter {
  @ViewChild('search', { static: false }) search: any;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  @ViewChild(IonInfiniteScroll, { static: false })
  infiniteScroll: IonInfiniteScroll;

  jobAnnouncements: Array<JobAnnouncement> = [];
  loading: boolean = false;

  total_of_data = 0;

  trs: any = new Array(5);
  tds: any = new Array(1);

  constructor(
    private menuController: MenuController,
    private jobAnnouncementService: jobAnnouncementService,
    private helperService: HelperService
  ) {}

  ngOnInit() {
    this.get();
  }

  ionViewWillEnter(): void {
    this.menuController.enable(true);
  }

  async get() {
    this.jobAnnouncements = [];

    this.loading = true;
    this.jobAnnouncementService.get().then(
      async (response: any) => {
        this.total_of_data = response.length;
        for (let job of response) {
          this.jobAnnouncements.push(new JobAnnouncement(job));
        }
        this.loading = false;
      },
      (error: any) => {
        this.helperService.responseErrors(error);
      }
    );
  }

  async remove(job: JobAnnouncement, eventPopover: any) {
    let popover = await this.helperService.popover(
      eventPopover,
      'Tem certeza?',
      [
        {
          text: 'voltar',
          color: 'gray',
          value: false,
        },
        {
          text: 'remover',
          color: 'danger',
          value: true,
        },
      ]
    );
    popover.onDidDismiss().then((popoverData) => {
      if (popoverData.data === true) {
        this.helperService.loading('Removendo');
        this.destroy(job);
      }
    });
    popover.present();
  }

  destroy(model: JobAnnouncement) {
    this.jobAnnouncementService
      .destroy(model.id)
      .then(
        (response) => {
          var index = this.jobAnnouncements.findIndex(
            (ac) => ac.id == model.id
          );
          if (index > -1) {
            this.jobAnnouncements.splice(index, 1);
          }
          this.helperService.toast(response.mensagem, 'success');
        },
        (error) => {
          this.helperService.responseErrors(error);
        }
      )
      .then(() => this.helperService.loading_dismiss());
  }

  debug() {
    //console.log(this.landing_pages);
  }
}

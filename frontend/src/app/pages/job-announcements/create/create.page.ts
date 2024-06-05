import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonContent,
  MenuController,
  ModalController,
  ViewWillEnter,
} from '@ionic/angular';
import { SelectMultipleComponent } from 'src/app/components/select-multiple/select-multiple.component';
import { SelectComponent } from 'src/app/components/select/select.component';
import { JobAnnouncement } from 'src/app/models/job-announcement.model';
import { JobSector } from 'src/app/models/job-sector.model';
import { Skill } from 'src/app/models/skill.model';
import { HelperService } from 'src/app/services/helper.service';
import { jobAnnouncementService } from 'src/app/services/job-announcement.service';
import { JobSectorService } from 'src/app/services/job-sector.service';
import { SkillService } from 'src/app/services/skills.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit, ViewWillEnter {
  @ViewChild(IonContent, { static: false }) content: IonContent;

  id: number;
  jobAnnouncement: JobAnnouncement;
  jobSectors: JobSector[] = [];
  skills: Skill[] = [];
  editing: boolean = false;
  loading: boolean = false;

  constructor(
    private jobAnnouncementService: jobAnnouncementService,
    private modalController: ModalController,
    private jobSectorService: JobSectorService,
    private helperService: HelperService,
    private route: ActivatedRoute,
    private router: Router,
    private menuController: MenuController,
    private skillService: SkillService
  ) {
    this.jobAnnouncement = new JobAnnouncement({});
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.menuController.enable(true);
    this.jobAnnouncement = new JobAnnouncement({});

    this.id = this.route.snapshot.paramMap.get('id')
      ? parseInt(this.route.snapshot.paramMap.get('id'))
      : null;
    if (this.id) {
      this.editing = true;
      this.get();
    }

    this.getJobSectors();
    this.getSkills();
  }

  async get() {
    await this.jobAnnouncementService.find(this.id).then(
      (data) => {
        this.jobAnnouncement = new JobAnnouncement(data);
      },
      (error: any) => {
        this.helperService.responseErrors(error);
      }
    );
  }

  getSkills() {
    this.skillService.get().then(
      (response) => {
        this.skills = response.map((s) => new Skill(s));
      },
      (error) => {
        this.helperService.responseErrors(error);
      }
    );
  }

  getJobSectors() {
    this.jobSectors = [];
    this.jobSectorService.get().then(
      (data) => {
        data.forEach((sector) => {
          this.jobSectors.push(new JobSector(sector));
        });
      },
      (error: any) => {
        this.helperService.responseErrors(error);
      }
    );
  }

  async selectJobSector() {
    const modal = await this.modalController.create({
      component: SelectComponent,
      componentProps: {
        title: 'Ramos',
        options: this.jobSectors,
        acessor: 'nome',
      },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      this.jobAnnouncement.ramo = data;
      this.jobAnnouncement.ramo_id = data.id;
    }
  }

  async selectSkills() {
    const modal = await this.modalController.create({
      component: SelectMultipleComponent,
      componentProps: {
        title: 'Competências',
        selecteds: this.jobAnnouncement.competencias.map((s) => s.id),
        options: this.skills,
        acessor: 'nome',
      },
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) {
      this.jobAnnouncement.competencias = this.skills.filter((s) =>
        data.includes(s.id)
      );
    }
  }

  save() {
    this.helperService.loading('Salvando');
    if (this.jobAnnouncement.id > 0) {
      this.update();
    } else {
      this.store();
    }
  }

  store() {
    this.jobAnnouncementService.store(this.jobAnnouncement).then(
      (data: any) => {
        this.helperService.loading_dismiss();
        this.helperService.toast(data.mensagem, 'success');

        this.router.navigate(['job-announcements/']);
      },
      (error: any) => {
        this.helperService.loading_dismiss();
        this.helperService.responseErrors(error);
      }
    );
  }

  update() {
    this.jobAnnouncementService.update(this.jobAnnouncement).then(
      (data: any) => {
        this.helperService.loading_dismiss();
        this.helperService.toast(data.mensagem, 'success');

        this.router.navigate(['job-announcements']);
      },
      (error: any) => {
        this.helperService.loading_dismiss();
        this.helperService.responseErrors(error);
      }
    );
  }

  debug() {
    // console.log(this.postable_types)
  }
}

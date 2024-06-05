import { Component, OnInit } from '@angular/core';
import {
  AlertButton,
  MenuController,
  ModalController,
  ViewWillEnter,
} from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { SelectMultipleComponent } from 'src/app/components/select-multiple/select-multiple.component';
import { Experience } from 'src/app/models/experience.model';
import { Skill } from 'src/app/models/skill.model';
import { User } from 'src/app/models/user.model';
import { HelperService } from 'src/app/services/helper.service';
import { SkillService } from 'src/app/services/skills.service';
import { UserService } from 'src/app/services/user.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-dashboard',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit, ViewWillEnter {
  user: User;
  private ngUnsubscriber = new Subject<void>();

  skills: Array<Skill> = [];

  senha: string;

  public alertButtons: AlertButton[] = [
    {
      text: 'Cancelar',
      role: 'cancel',
    },
    {
      text: 'Apagar',
      role: 'confirm',
      cssClass: 'text-danger',
      handler: () => {
        this.delete();
      },
    },
  ];

  constructor(
    private menuController: MenuController,
    private userService: UserService,
    private helperService: HelperService,
    private modalController: ModalController,
    private skillService: SkillService
  ) {
    this.userService.user_logged$
      .pipe(takeUntil(this.ngUnsubscriber))
      .subscribe((_) => {
        this.user = this.userService.user;
        this.senha = null;
      });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuController.enable(true);
    this.user = this.userService.user;

    this.getSkills();
  }

  addExperience() {
    this.user.experiencia.push(new Experience({}));
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

  async selectSkills() {
    const modal = await this.modalController.create({
      component: SelectMultipleComponent,
      componentProps: {
        title: 'Competências',
        selecteds: this.user.competencias.map((s) => s.id),
        options: this.skills,
        acessor: 'nome',
      },
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) {
      this.user.competencias = this.skills.filter((s) => data.includes(s.id));
    }
  }

  save() {
    this.helperService.loading('Atualizando...');

    if (this.senha && this.senha != '') {
      this.user.senha = Md5.hashStr(this.senha);
    }

    this.userService.updateMe(this.user).then(
      (response) => {
        this.helperService.loading_dismiss();
        this.helperService.toast(response.mensagem);
        this.userService.getMe().then((response) => {
          if (response) {
            this.userService.setUser(response);
          }
        });
      },
      (error) => {
        this.helperService.loading_dismiss();
        this.helperService.responseErrors(error);
      }
    );
  }

  removeExperience(index) {
    this.user.experiencia.splice(index, 1);
  }

  delete() {
    this.helperService.loading('Apagando...');
    this.userService.deleteMe().then(
      (response) => {
        this.helperService.toast(response.mensagem);
        this.userService.logout();
        this.helperService.loading_dismiss();
      },
      (error) => {
        this.helperService.responseErrors(error);
        this.helperService.loading_dismiss();
      }
    );
  }
}

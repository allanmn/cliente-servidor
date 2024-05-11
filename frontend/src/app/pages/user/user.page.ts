import { Component, OnInit } from '@angular/core';
import { AlertButton, MenuController, ViewWillEnter } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { HelperService } from 'src/app/services/helper.service';
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
    private helperService: HelperService
  ) {
    this.userService.user_logged$
      .pipe(takeUntil(this.ngUnsubscriber))
      .subscribe((_) => {
        this.user = this.userService.user;
        this.senha = null;
      });
  }

  ngOnInit() {
    this.menuController.enable(true);
  }

  ionViewWillEnter() {
    this.user = this.userService.user;
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

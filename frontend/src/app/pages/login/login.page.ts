import { Component, OnInit } from '@angular/core';
import { MenuController, ViewWillEnter } from '@ionic/angular';
import { HelperService } from '../../services/helper.service';
import { UserService } from '../../services/user.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, ViewWillEnter {
  credentials = {
    email: null,
    senha: null,
  };

  constructor(
    private menuCtrl: MenuController,
    private helperService: HelperService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  ionViewWillEnter() {}

  login() {
    if (!this.credentials.email || this.credentials.email == '') {
      this.helperService.toast('E-mail é obrigatório', 'warning');
    }

    if (!this.credentials.senha || this.credentials.senha == '') {
      this.helperService.toast('Senha é obrigatório', 'warning');
    }

    this.helperService.loading('Logando...');

    this.userService
      .login({
        email: this.credentials.email,
        senha: Md5.hashStr(this.credentials.senha),
      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          this.helperService.loading_dismiss();
          this.helperService.responseErrors(error);
        }
      );
  }
}

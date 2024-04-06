import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ViewWillEnter } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { HelperService } from 'src/app/services/helper.service';
import { UserService } from 'src/app/services/user.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit, ViewWillEnter {
  type: string = null;

  user: User = new User({});

  senha: string = null;

  constructor(
    private menuController: MenuController,
    private helperService: HelperService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.menuController.enable(false);
  }

  ionViewWillEnter(): void {
    this.type = null;
    this.senha = null;
  }

  changeType(type: string) {
    this.type = type;
  }

  signUp() {
    if (this.type === 'empresa') {
      this.helperService.loading('CADASTRANDO');

      this.user.senha = Md5.hashStr(this.senha);

      this.userService.signUpEmpresa(this.user).then(
        (response) => {
          this.helperService.loading_dismiss();
          this.helperService.toast(response.message);
          this.router.navigate(['/login']);
        },
        (error) => {
          this.helperService.loading_dismiss();
          this.helperService.responseErrors(error);
        }
      );
    } else if (this.type === 'candidato') {
      this.helperService.loading('CADASTRANDO');

      this.user.senha = Md5.hashStr(this.senha);

      this.userService.signUpCandidato(this.user).then(
        (response) => {
          this.helperService.loading_dismiss();
          this.helperService.toast(response.message);
          this.router.navigate(['/login']);
        },
        (error) => {
          this.helperService.loading_dismiss();
          this.helperService.responseErrors(error);
        }
      );
    }
  }
}

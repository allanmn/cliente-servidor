import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {
  LoadingController,
  PopoverController,
  ToastController,
} from '@ionic/angular';
import { ConfirmComponent } from '../components/confirm/confirm.component';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  loader: any;

  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController,
    private router: Router,
    private popoverController: PopoverController
  ) {}

  async toast(message: string, color: string = 'success', duration = 1500) {
    const toast = await this.toastController.create({
      message: message,
      color: color,
      position: 'top',
      duration: duration,
      mode: 'ios',
    });

    await toast.present();
  }

  async loading(message: string) {
    this.loader = true;

    await this.loadingController
      .create({
        spinner: 'lines',
        message,
        translucent: true,
        mode: 'ios',
      })
      .then((l: any) => {
        l.present().then(() => {
          if (!this.loader) {
            l.dismiss();
          }
        });
      });
  }

  async loading_dismiss() {
    this.loader = false;
    return await this.loadingController.dismiss();
  }

  responseErrors(error: any) {
    if (error.status == 401) {
      if (this.router.url == '/login')
        return this.toast('Usuário e/ou senha inválidos.', 'danger');
      return this.toast('Não autorizado.', 'danger');
    } else if (error && error.error && error.error.mensagem) {
      return this.toast(error.error.mensagem, 'warning', 5000);
    } else {
      return this.toast('Houve um erro ao processar sua requisição.', 'danger');
    }
  }

  async popover(eventPopover: any, title: string, buttons: Array<any>) {
    return await this.popoverController.create({
      component: ConfirmComponent,
      event: eventPopover,
      mode: 'ios',
      componentProps: {
        title: title,
        buttons: buttons,
      },
    });
  }
}

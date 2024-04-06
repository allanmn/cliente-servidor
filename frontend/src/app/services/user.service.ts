import { Injectable, Injector } from '@angular/core';
import { BaseService } from './base.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  user: User = null;
  router: Router;
  url: 'usuarios';

  constructor(injector: Injector) {
    super(injector);
  }

  get isLoggedIn() {
    return this.user != null;
  }

  login(credentials: any): Promise<any> {
    return firstValueFrom(
      this.http.post(this.api_url + '/' + 'login', credentials)
    );
  }

  signUpCandidato(user: User): Promise<any> {
    return firstValueFrom(
      this.http.post(
        this.api_url + '/' + 'usuarios/candidato',
        user.create_candidato_data
      )
    );
  }

  signUpEmpresa(user: User): Promise<any> {
    return firstValueFrom(
      this.http.post(
        this.api_url + '/' + 'usuarios/empresa',
        user.create_empresa_data
      )
    );
  }

  logout() {
    this.unsetUser();
    this.router.navigate(['/login']);
  }

  unsetUser(callback: any = null) {
    this.unsetApiToken();
    this.user = null;

    if (callback) {
      callback(true);
    }
  }

  setUser(data: any, callback: any) {
    if (data.token) {
      this.setApiToken(data.token);
    }

    if (data.user) {
      this.user = new User(data.user);
    }

    if (callback) {
      callback(true);
    }
  }
}

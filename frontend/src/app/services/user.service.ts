import { Injectable, Injector } from '@angular/core';
import { BaseService } from './base.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  user_logged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public user_logged$ = this.user_logged.asObservable();
  user: User = null;
  router: Router;
  url: 'usuarios';

  constructor(injector: Injector, router: Router) {
    super(injector);
    this.router = router;
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
        this.api_url + '/usuarios/candidatos',
        user.create_candidato_data
      )
    );
  }

  signUpEmpresa(user: User): Promise<any> {
    return firstValueFrom(
      this.http.post(
        this.api_url + '/usuarios/empresa',
        user.create_empresa_data
      )
    );
  }

  getMe(): Promise<any> {
    return firstValueFrom(
      this.http.get(this.api_url + '/usuario', this.get_tokens)
    );
  }

  updateMe(user: User): Promise<any> {
    return firstValueFrom(
      this.http.put(this.api_url + '/usuario', user.update_me, this.get_tokens)
    );
  }

  deleteMe(): Promise<any> {
    return firstValueFrom(
      this.http.delete(this.api_url + '/usuario', this.get_tokens)
    );
  }

  logoutRequest(): Promise<any> {
    return firstValueFrom(
      this.http.post(this.api_url + '/logout', {}, this.get_tokens)
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

  setUser(data: any, callback: any = null) {
    if (data) {
      console.log(data);
      this.user = new User(data);

      this.user_logged.next(true);
    }

    if (callback) {
      callback(true);
    }
  }
}

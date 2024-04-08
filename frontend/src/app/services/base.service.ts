import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  url: string;
  api_url: string = environment.api_url;
  api_token_name: string = environment.api_token;
  http: HttpClient;

  constructor(injector: Injector) {
    this.http = injector.get(HttpClient);
  }

  get base_url() {
    return this.api_url + '/' + this.url;
  }

  buildUrl(path: any = '') {
    var url = this.base_url + path + '?';

    return url;
  }

  get get_tokens() {
    return {
      headers: {
        Authorization: `Bearer ${this.api_token_value}`,
      },
    };
  }

  get api_token_value() {
    return localStorage.getItem(this.api_token_name);
  }

  setApiToken(token: string) {
    localStorage.setItem(this.api_token_name, token);
  }

  unsetApiToken() {
    localStorage.removeItem(this.api_token_name);
  }
}

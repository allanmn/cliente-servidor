import { Injectable, Injector } from '@angular/core';
import { BaseService } from './base.service';
import { User } from '../models/user.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SkillService extends BaseService {
  url: 'competencias';

  constructor(injector: Injector) {
    super(injector);
  }

  get(): Promise<any> {
    return firstValueFrom(
      this.http.get(this.api_url + '/competencias', this.get_tokens)
    );
  }
}

import { Injectable, Injector } from '@angular/core';
import { BaseService } from './base.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobSectorService extends BaseService {
  url: 'ramos';

  constructor(injector: Injector) {
    super(injector);
  }

  get(): Promise<any> {
    return firstValueFrom(
      this.http.get(this.api_url + '/ramos', this.get_tokens)
    );
  }
}

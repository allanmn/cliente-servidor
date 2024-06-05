import { Injectable, Injector } from '@angular/core';
import { BaseService } from './base.service';
import { first, firstValueFrom } from 'rxjs';
import { JobAnnouncement } from '../models/job-announcement.model';

@Injectable({
  providedIn: 'root',
})
export class jobAnnouncementService extends BaseService {
  url = 'vagas';

  constructor(injector: Injector) {
    super(injector);
  }

  get(): Promise<any> {
    return firstValueFrom(
      this.http.get(this.api_url + '/vagas', this.get_tokens)
    );
  }

  find(id: number): Promise<any> {
    return firstValueFrom(
      this.http.get(this.api_url + '/vagas/' + id, this.get_tokens)
    );
  }

  store(model: JobAnnouncement): Promise<any> {
    return firstValueFrom(
      this.http.post(this.api_url + '/vagas', model.createData, this.get_tokens)
    );
  }

  update(model: JobAnnouncement): Promise<any> {
    return firstValueFrom(
      this.http.put(
        this.api_url + `/vagas/${model.id}`,
        model.updateData,
        this.get_tokens
      )
    );
  }

  destroy(id: number): Promise<any> {
    return firstValueFrom(
      this.http.delete(this.api_url + '/vagas/' + id, this.get_tokens)
    );
  }
}

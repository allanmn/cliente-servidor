import { Component, OnDestroy } from '@angular/core';
import { UserService } from './services/user.service';
import { CandidatoItems, EmpresaItems } from './side-menu';
import { HelperService } from './services/helper.service';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnDestroy {
  appPages: any[];
  private ngUnsubscriber = new Subject<void>();

  constructor(
    private userService: UserService,
    private helperService: HelperService
  ) {
    this.buildMenu(true);
    this.userService.user_logged$
      .pipe(takeUntil(this.ngUnsubscriber))
      .subscribe((_) => {
        this.onChangeUser(_);
      });
  }

  logoff() {
    this.helperService.loading('Saindo...');
    this.userService.logoutRequest().then(
      (response) => {
        this.buildMenu(false);
        this.userService.logout();
        this.helperService.loading_dismiss();
      },
      (error) => {
        this.helperService.loading_dismiss();
        this.helperService.responseErrors(error);
      }
    );
  }

  buildMenu(value: boolean) {
    let menuItems = [];
    if (value && this.userService.user) {
      menuItems = this.userService.user.is_company
        ? EmpresaItems
        : CandidatoItems;
    }
    this.appPages = menuItems;
  }

  onChangeUser(_) {
    this.buildMenu(true);
  }

  ngOnDestroy() {
    this.ngUnsubscriber.next();
    this.ngUnsubscriber.complete();
  }
}

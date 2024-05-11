import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuController, ViewWillEnter } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, ViewWillEnter {
  constructor(
    private menuController: MenuController,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.menuController.enable(true);
  }

  ionViewWillEnter() {
    console.log(this.userService.user);
  }
}

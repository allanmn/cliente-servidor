import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {
  title: string;
  buttons: Array<any>;

  constructor(private popoverController: PopoverController) {}

  ngOnInit(): void {}

  async dismiss(value: boolean) {
    await this.popoverController.dismiss(value);
  }
}

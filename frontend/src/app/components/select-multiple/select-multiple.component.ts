import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-select',
  templateUrl: './select-multiple.component.html',
  styleUrls: ['./select-multiple.component.scss'],
})
export class SelectMultipleComponent implements OnInit {
  @ViewChild('search', { static: false }) search: any;

  title = 'Opções';
  acessor = 'name';
  options: any = [];
  items: any = [];
  selecteds: any = [];
  values: Array<any> = [];

  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) {
    this.title = this.navParams.get('title');
    this.options = this.navParams.get('options');
    this.selecteds = this.navParams.get('selecteds');
    this.acessor = this.navParams.get('acessor')
      ? this.navParams.get('acessor')
      : 'name';
  }

  ngOnInit() {}

  ionViewWillEnter() {
    if (this.selecteds && this.selecteds.length > 0) {
      this.selecteds.forEach((item) => {
        this.options.forEach((option) => {
          if (option.id == item) {
            option.selected = 1;
            this.values.push(option.id);
          }
        });
      });
    }

    this.items = this.options;

    setTimeout(() => {
      this.search.setFocus();
    }, 100);
  }

  async dismiss() {
    await this.modalController.dismiss(this.values);
  }

  async select(value: any) {
    let index = this.values.indexOf(value.id);
    if (index > -1) {
      value.selected = 0;
      this.values.splice(index, 1);
    } else {
      value.selected = 1;
      this.values.push(value.id);
    }
  }

  filterList(event: any) {
    this.items = this.options.filter((item: any) => {
      return (
        item.name.toLowerCase().indexOf(event.detail.value.toLowerCase()) > -1
      );
    });
  }
}

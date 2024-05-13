import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
    @ViewChild('search', { static: false }) search: any;

    title = 'Opções';
    options: any = [];
    items: any = [];
    acessor: string = 'name';

    constructor(
        private modalController: ModalController,
        private navParams: NavParams,
    ) {
        this.title = this.navParams.get('title');
        this.options = this.navParams.get('options');
        this.acessor = this.navParams.get('acessor') ? this.navParams.get('acessor') : 'name';
    }

    ngOnInit() {
    }

    ionViewWillEnter(){
        this.items = this.navParams.get('options');
        setTimeout(() => {
            this.search.setFocus();
        }, 100)
    }

    async dismiss(value: any) {
        await this.modalController.dismiss(value)
    }

    filterList(event: any) {
        this.items = this.options.filter((item: any) => {
            return item.name.toLowerCase().indexOf(event.detail.value.toLowerCase()) > -1;
        });
    }

}

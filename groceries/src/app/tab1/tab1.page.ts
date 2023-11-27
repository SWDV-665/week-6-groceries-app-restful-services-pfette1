import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { GroceriesService } from '../../providers/groceries.service';
import { InputDialogService } from '../../providers/input-dialog.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  title = "Grocery";

  public addItemAlertButtons = [
    {
      text: 'Cancel',
      handler: (data: any) => {
      }
    },
    {
      text: 'Save',
      handler: (item: any) => {
        this.dataService.addItem(item);
      }
}
  ];
  public addItemAlertInputs = [
    {
      name: 'name',
      placeholder: 'Name'
    },
    {
      name: 'quantity',
      type: 'number',
      placeholder: 'Quantity',
      min: 1,
      max: 100
    }
  ];

  constructor(
    private toastController: ToastController,
    public dataService: GroceriesService,
    public inputDialogService: InputDialogService,
    public socialSharingService: SocialSharing) { }

  loadItems() {
    return this.dataService.getItems();
  }

  async removeItem(item: any, index: number) {
    const toast = await this.toastController.create({
      message: item.name + ' successfully removed',
      duration: 1500,
      position: 'bottom',
      color: 'success',
    });

    await toast.present();

    this.dataService.removeItem(index);
  }

  async shareItem(item: any, index: number) {
    const toast = await this.toastController.create({
      message: 'Sharing item',
      duration: 1500,
      position: 'bottom',
      color: 'success',
    });

    await toast.present();

    let message = "Grocery Item - Name : " + item.name + " - Quantity: " + item.quantity;
    let subject = "Shared via Groceries app";

    this.socialSharingService.share(message, subject).then(() => {
      console.log("Shared Successfully");
    }).catch((error) => {
      console.error("Error while sharing", error);
    })
  }

  async addItem() {
    const toast = await this.toastController.create({
      message: 'Adding item ...',
      duration: 1500,
      position: 'bottom',
      color: 'success',
    });

    this.inputDialogService.showPrompt(toast);
  }

  async editItem(item: any, index: number) {
    const toast = await this.toastController.create({
      message: 'Editing item - ' + index + '...',
      duration: 1500,
      position: 'bottom',
      color: 'success',
    });

    this.inputDialogService.showPrompt(toast, item, index);
  }

  dismiss() {
    console.log(this.addItemAlertInputs);
  }

}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroceriesService {

  items: any[] = []

  constructor() { }

  getItems() {
    return this.items;
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  addItem(item: any) {
    this.items.push(item);
  }

  editItem(item: any, index: number) {
    this.items[index] = item;
  }
}

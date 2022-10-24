import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from "@glimmer/tracking";
import { union } from '@ember/object/computed';

export default class IndexController extends Controller {
  @tracked
  newItems;

  @action
  move () {
    console.log (...arguments);
  }

  @union ('model', 'newItems')
  items;

  @tracked
  nextId;

  @action
  addItem () {
    const id = this.nextId ++;
    this.newItems.pushObject ( { id, label: `Item ${id + 1}` });
  }

  @action
  removeItem () {
    this.items.removeAt (0);
  }
}

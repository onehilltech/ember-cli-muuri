import Component from '@glimmer/component';

export default class MuuriItemComponent extends Component {
  get fixed () {
    return !this.draggable;
  }

  get draggable () {
    const { draggable = true } = this.args;
    return draggable;
  }
}

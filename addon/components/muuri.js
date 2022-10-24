import Component from '@glimmer/component';
import { action } from '@ember/object';
import { isPresent } from '@ember/utils';

import Muuri from 'muuri'
import { defaultsDeep, differenceWith } from 'lodash';

import decorator from '@onehilltech/decorator';

const event = decorator (function (target, name, descriptor, options) {
  const eventName = options.name || name;
  (target._events = target._events || []).push (eventName);

  return descriptor;
});

const MUURI_ITEM_SELECTOR = '.muuri-item';

/**
 * @class MuuriComponent
 */
export default class MuuriComponent extends Component {
  constructor () {
    super (...arguments);
    this._elements = new WeakMap ();
  }

  @action
  didInsert (element) {
    this._muuri = new Muuri (element, this.options);

    this.data.forEach (data => {
      const itemElement = element.querySelector (`${MUURI_ITEM_SELECTOR}[data-id="${data.id}"]`);
      this._elements.set (data, itemElement);
    });

    this._initEventListeners ();
  }

  get data () {
    return this.args.data || [];
  }

  @action
  refresh () {
    // Find the list of data items that have been added and removed. After we have a list of
    // items that have been added to the data, we need to locate its corresponding HTML element.
    // This element will be added to the grid. For the data that has been removed, we need to
    // remove the corresponding items from the grid.

    const items = this._muuri.getItems ();
    const added = differenceWith (this.args.data, items, (data, item) => `${data.id}` === item.getElement ().id);
    const elements = added.map (item => this._muuri.getElement ().querySelector (`${MUURI_ITEM_SELECTOR}[data-id="${item.id}"]`));
    const removed = differenceWith (items, this.args.data, (item, data) => `${data.id}` === item.getElement ().id);

    this._muuri.add (elements);
    this._muuri.remove (removed);
  }

  _initEventListeners () {
    const self = this;

    (this._events || []).forEach (name => {
      const listener = self[name].bind (this);

      this._muuri.on (name, function () {
        // Call the method on the class first, then call the client.
        listener (...arguments);
        (self.args[name] || function () {}) (...arguments);
      });
    });
  }

  willDestroy () {
    super.willDestroy ();

    if (isPresent (this._muuri)) {
      this._muuri.destroy ( );
    }
  }

  get options () {
    return defaultsDeep ({ items: MUURI_ITEM_SELECTOR }, this.optionsFromArgs, this.args.options, Muuri.defaultOptions);
  }

  get optionsFromArgs () {
    return {
      // Default show animation
      showDuration: this.args.showDuration,
      showEasing: this.args.showEasing,

      // Default hide animation
      hideDuration: this.args.hideDuration,
      hideEasing: this.args.hideEasing,

      // Item's visible/hidden state styles
      visibleStyles: this.args.visibleStyles,
      hiddenStyles: this.args.hiddenStyles,

      // Layout
      layout: this.args.layout,
      layoutOnResize: this.args.layoutOnResize,
      layoutOnInit: this.args.layoutOnInit,
      layoutDuration: this.args.layoutDuration,
      layoutEasing: this.args.layoutEasing,

      // Sorting
      sortData: this.args.sortData,

      // Drag & Drop
      dragEnabled: this.args.dragEnabled,
      dragContainer: this.args.dragContainer,
      dragHandle: this.args.dragHandle,
      dragStartPredicate: this.dragStartPredicate.bind (this),
      dragAxis: this.args.dragAxis,
      dragSort: this.args.dragSort,
      dragSortHeuristics: this.args.dragSortHeuristics,
      dragSortPredicate: this.args.dragSortPredicate,
      dragRelease: this.args.dragRelease,
      dragCssProps: this.args.dragCssProps,
      dragPlaceholder: this.args.dragPlaceholder,
      dragAutoScroll: this.args.dragAutoScroll,
    };
  }

  @event
  synchronize () {

  }

  @event
  layoutStart () {

  }

  @event
  layoutEnd () {

  }

  @event
  layoutAbort () {

  }

  @event
  add () {

  }

  @event
  remove () {

  }

  @event
  showStart () {

  }

  @event
  showEnd () {

  }

  @event
  hideStart () {

  }

  @event
  hideEnd () {

  }

  @event
  filter () {

  }

  @event
  sort () {

  }

  @event
  move () {

  }

  @event
  send () {

  }

  @event
  beforeSend () {

  }

  @event
  receive () {

  }

  @event
  beforeReceive () {

  }

  @event
  dragInit () {

  }

  @event
  dragStart () {

  }

  @event
  dragMove () {

  }

  @event
  dragScroll () {

  }

  @event
  dragEnd () {

  }

  @event
  dragReleaseStart () {

  }

  @event
  dragReleaseEnd () {

  }

  dragStartPredicate (ev) {
    // Let's check if the current element is draggable. If the element is not draggable,
    // then we can stop here and return.

    const draggableByDefault = ('draggable' in ev.getElement ().dataset);

    if (!draggableByDefault) {
      return false;
    }

    if (this.args.dragStartPredicate) {
      return this.args.dragStartPredicate (ev);
    }

    return draggableByDefault;
  }

  @event
  destroy () {

  }
}

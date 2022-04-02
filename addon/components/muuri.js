import Component from '@glimmer/component';
import { action } from '@ember/object';
import { isPresent } from '@ember/utils';

import Muuri from 'muuri'
import { defaultsDeep } from 'lodash';

import decorator from '@onehilltech/decorator';

const event = decorator (function (target, name, descriptor, options) {
  const eventName = options.name || name;
  (target._events = target._events || []).push (eventName);

  return descriptor;
});

/**
 * @class MuuriComponent
 */
export default class MuuriComponent extends Component {
  @action
  didInsert (element) {
    this._muuri = new Muuri (element, this.options);
    this._initEventListeners ();
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
    return defaultsDeep ({ items: '.muuri__item' }, this.optionsFromArgs, this.args.options, Muuri.defaultOptions);
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
      dragStartPredicate: this.args.dragStartPredicate,
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

  @event
  destroy () {

  }
}

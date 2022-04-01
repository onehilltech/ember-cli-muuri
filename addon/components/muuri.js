import Component from '@glimmer/component';
import { action } from '@ember/object';
import { isPresent } from '@ember/utils';

import Muuri from 'muuri'
import { defaultsDeep } from 'lodash';

/**
 * @class MuuriComponent
 */
export default class MuuriComponent extends Component {
  @action
  didInsert (element) {
    this._muuri = new Muuri (element, this.options);
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
}

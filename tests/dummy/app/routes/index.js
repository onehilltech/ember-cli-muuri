import Route from '@ember/routing/route';
import { A } from '@ember/array';

export default class IndexRoute extends Route {
  model () {
    return A ([
      { id: 0, label: 'Item 1' },
      { id: 1, label: 'Item 2' },
      { id: 2, label: 'Item 3' },
      { id: 3, label: 'Item 4' },
    ]);
  }

  setupController (controller, model) {
    super.setupController (...arguments);

    controller.newItems = A ();
    controller.nextId = model.length;
  }
}

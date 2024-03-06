import { BehaviorWithStore } from 'mobx-miniprogram-bindings';
import songStore from '../stores/song';

export const indexBehavior = BehaviorWithStore({
  storeBindings: [
    {
      namespace: 'songStore',
      store: songStore,
      fields: ['numA', 'numB', 'sum'],
      actions: ['update']
    }
  ]
});

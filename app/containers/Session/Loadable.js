import React from 'react';
import Loadable from 'react-loadable';
import {Loader} from 'semantic-ui-react';

export default Loadable({
  loader: () => import('./index'),
  loading: () => (
    <Loader active size='large'/>
  ),
});

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { App, Maker, Shower, ShowNav, NotFound } from './containers';

const AppRouter = (
  <Route path="/" component={App}>
    <IndexRoute component={Maker} />

    <Route path="show/:id" component={Shower} />
    <Route path="shownav" component={ShowNav} />

    <Route path="*" component={NotFound} status={404}/>
  </Route>
);

export default AppRouter;

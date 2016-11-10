import React from 'react';
import ReactDOM from 'react-dom';

import LoginForm from './Components/LoginForm/LoginForm.jsx';
import store from './Store/Store.jsx';

const render = () => {
  ReactDOM.render(
    <LoginForm
      sendingRequest={store.getState().sendingRequest}
      status={store.getState().status}
    />,
    document.getElementById('wrapper')
  );
};

store.subscribe(render);
render();
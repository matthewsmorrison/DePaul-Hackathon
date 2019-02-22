import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {BrowserRouter} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import Firebase, { FirebaseContext } from './components/Firebase';

ReactDOM.render(
	<FirebaseContext.Provider value={new Firebase()}>
  	<App />
  </FirebaseContext.Provider>,
  document.getElementById('page-wrapper')
);
registerServiceWorker();

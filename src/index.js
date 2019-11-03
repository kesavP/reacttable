import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Bootstart from './Bootstart';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Bootstart />, document.getElementById('root'));
registerServiceWorker();

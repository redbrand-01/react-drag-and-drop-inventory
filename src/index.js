import React from 'react';
import ReactDOM from 'react-dom';
import { Interface } from './interfase';
import { Provider } from "react-redux";
import initializeStore from "./store/init";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import 'antd/dist/antd.css';

ReactDOM.render(
  <React.StrictMode>
     <DndProvider backend={HTML5Backend}>
      <Provider store={initializeStore}>
        <Interface />
      </Provider>
     </DndProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
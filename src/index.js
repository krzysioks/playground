import Playground from './Playground';
import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './style/base.css';

const appRootElement = document.getElementById('playground');
const root = createRoot(appRootElement);
root.render(<Playground />);

import React from 'react';
import Playground from './Playground';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './style/base.css';

const appRootElement = document.getElementById('playground') as HTMLElement;
const root = createRoot(appRootElement);
root.render(<Playground />);

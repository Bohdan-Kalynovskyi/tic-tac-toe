import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './components/App';

import './assets/scss/index.scss';
import './assets/scss/antdPatches.scss';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);

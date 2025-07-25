import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

import { BrowserRouter } from 'react-router-dom';
import Providers from './Providers/FVProvider';

// Additional polyfills for global compatibility
import * as buffer from 'buffer';

// Ensure Buffer is available globally for compatibility
if (typeof window !== 'undefined') {
  window.Buffer = buffer.Buffer;
  window.global = globalThis;
}

// Set globalThis polyfills
(globalThis as any).Buffer = Buffer;
(globalThis as any).global = globalThis;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Providers>
  </React.StrictMode>
);

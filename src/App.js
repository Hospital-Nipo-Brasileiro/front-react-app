import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // Importe também o Navigate

import PublicRoutes from './routes/public.routes.js';
import PrivateRoutes from './routes/private.routes.js';

function App() {

  return (
    <BrowserRouter>
      <PublicRoutes />
      <PrivateRoutes />
    </BrowserRouter>
  )
}

export default App;

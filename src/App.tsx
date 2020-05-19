import React from 'react';
//import MainUser from './module/business/core/main-user.user';
import Routing from './models/routes/app.routing';
import { BrowserRouter } from 'react-router-dom';
import MenuUser from './module/business/components/menu/menu-user.business';

function App() {

  const isSignIn: boolean = false;

  return (
    <BrowserRouter>
      {isSignIn && <MenuUser /> }
      <Routing />
    </BrowserRouter>
  );
}

export default App;

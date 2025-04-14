import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from "react-router-dom";
import UserContext from './context/UserContext.jsx';
import CaptainContext from './context/CaptainContext.jsx';
import { SocketProvider } from './context/SocketContex.jsx';
import { RideProvider } from './context/RideContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CaptainContext>
      <UserContext>
        <SocketProvider>
          <RideProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </RideProvider>
        </SocketProvider>
      </UserContext>
    </CaptainContext>
  </StrictMode>
);

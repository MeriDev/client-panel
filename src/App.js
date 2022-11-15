import './App.css';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { store, rrfProps } from './store';

import AppNavbar from './components/layout/AppNavbar';
import DashBoard from './components/layout/DashBoard';
import AddClient from './components/clients/AddClient';
import ClientDetails from './components/clients/ClientDetails';
import EditClient from './components/clients/EditClient';
import Settings from './components/settings/Settings';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PrivateRoutes, PublicRoute } from './helpers/auth';

const App = () => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router>
          <div className="App">
            <AppNavbar />
            <div className="container">
              <Routes>
                <Route element={<PrivateRoutes />}>
                  <Route path="/" element={<DashBoard />} />
                  <Route path="/client/add" element={<AddClient />} />
                  <Route path="/client/:id" element={<ClientDetails />} />
                  <Route path="/client/edit/:id" element={<EditClient />} />
                  <Route path="/settings" element={<Settings />} />
                </Route>

                <Route element={<PublicRoute />}>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Route>
              </Routes>
            </div>
          </div>
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
};

export default App;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { store, rrfProps } from './store';

import AppNavbar from './components/layout/AppNavbar';
import DashBoard from './components/layout/DashBoard';
import AddClient from './components/clients/AddClient';
import ClientDetails from './components/clients/ClientDetails';
import EditClient from './components/clients/EditClient';

const App = () => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router>
          <div className="App">
            <AppNavbar />
            <div className="container">
              <Routes>
                <Route path="/" element={<DashBoard />} />
                <Route path="/client/add" element={<AddClient />} />
                <Route path="/client/:id" element={<ClientDetails />} />
                <Route path="/client/edit/:id" element={<EditClient />} />
              </Routes>
            </div>
          </div>
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
};

export default App;

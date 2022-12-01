import React from 'react';
//import './App.scss';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import { AuthProvider } from './context/AuthContext'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import PrivateRoute from './utils/PrivateRoute';
import Annonces from './components/Annonces';



function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>

          <PrivateRoute path="/" exact >
            <Header/>
            <HomePage/>
            <Annonces/>
          </PrivateRoute>
          <Route path="/login" component={LoginPage} />

        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;

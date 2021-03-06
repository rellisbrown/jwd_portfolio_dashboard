import React, { useContext } from 'react';
import styled from '@emotion/styled';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
import Dashboard from './components/dashboard/Dashboard';
import SignIn from './components/signIn/SignIn';

import { DataContextProvider, DataContext } from './utils/DataContext';

const StyledAppDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <DataContextProvider>
      <Router>
        <StyledAppDiv className="App">
          <Navigation />
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </StyledAppDiv>
      </Router>
    </DataContextProvider>
  );
}

export default App;

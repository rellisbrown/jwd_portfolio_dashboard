import logo from './logo.svg';
import './App.css';
import styled from '@emotion/styled';

const StyledText = styled.p`
color: blue;
`

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <StyledText>
          Edit <code>src/App.js</code> and save to reload.
        </StyledText>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

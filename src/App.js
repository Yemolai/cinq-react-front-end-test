import React from 'react';
import { UsersDataTable } from './components/UsersDataTable/UsersDataTable'
import logo from './logo.svg';
import './App.css';

function App() {
  const usersDataTable = <UsersDataTable/>
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <section>
        {usersDataTable}
      </section>
    </div>
  );
}

export default App;

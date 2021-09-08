import React from 'react';
import './App.css';
import CityAutocomplete from './components/CityAutocomplete'
import {Container} from '@material-ui/core'

function App() {
  return (
    <div className="App">
      <Container maxWidth="sm">
        <h1>City search engine</h1>
        <h2>City 1:</h2>
        <CityAutocomplete></CityAutocomplete>
        <h2>City 2:</h2>
        <CityAutocomplete></CityAutocomplete>
      </Container>
    </div>
  );
}

export default App;

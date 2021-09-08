import React from 'react';
import './App.css';
import CityAutocomplete from './components/CityAutocomplete'
import {Container} from '@material-ui/core'

function App() {
  const [population, setPopulation] = React.useState<number[]>([]);

  const savePopulation = (index: number, populationChanged: number) => {
    const myPopulation: number[] = [...population]; 
    myPopulation[index] = populationChanged;
    console.log('pop changed:' + index + ' ' + populationChanged);
    setPopulation(myPopulation);
  }

  return (
    <div className="App">
      <Container maxWidth="sm">
        <h1>City population search & compare engine</h1>
        <h2>City 1:</h2>
        <CityAutocomplete index={1} onSelectedCity={savePopulation}></CityAutocomplete>
        <h2>City 2:</h2>
        <CityAutocomplete index={2} onSelectedCity={savePopulation}></CityAutocomplete>
      </Container>
      <Container maxWidth="sm">
      <h1>This is a difference in population of {population[1] - population[2]}</h1>
      </Container>
    </div>
  );
}

export default App;

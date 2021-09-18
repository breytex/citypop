import React from 'react';
import './App.css';
import CityAutocomplete from './components/CityAutocomplete'
import {Container} from '@material-ui/core'

function App() {
  const [population, setPopulation] = React.useState<number[]>([]);

  const savePopulation = (index: number) => (populationChanged: number) => {
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
        <CityAutocomplete onSelectedCity={savePopulation(0)}></CityAutocomplete>
        <h2>City 2:</h2>
        <CityAutocomplete onSelectedCity={savePopulation(1)}></CityAutocomplete>
      </Container>
      { population[0] && population[1]
        ? <Container maxWidth="sm"><h1>This is a difference in population of {Math.abs(population[0] - population[1])}</h1></Container>
        : <Container maxWidth="sm">Please select 2 cities.</Container>
      }
    </div>
  );
}

export default App;

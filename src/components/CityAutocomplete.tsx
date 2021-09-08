import React, { useMemo } from 'react'
import CityApi from '../CityApi'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import debounce from 'lodash/debounce';

type CityAutocompleteProps = {
    index: number;
    onSelectedCity: (index: number, populationChanged: number) => void
}

export default function CityAutocomplete({index, onSelectedCity}: CityAutocompleteProps) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<any>([]);
    const loading = open && options.length === 0;
    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState('');
    const [searchTerm, setSearchTerm] = React.useState('');
    const [population, setPopulation] = React.useState('');
    
    const eventHandlerCitySearch = async (event: any) => {
        console.log("onChange eventHandler TextField has been fired: " + event.target.value);
        const api = new CityApi();
        const response = await api.getCities(event.target.value);
        const cities = await response.data._embedded["city:search-results"];
        setOptions(cities.map((city: any) => {
            const cityURL = city["_links"]["city:item"]["href"];
            const cityName: string = city["matching_full_name"];
            return {
                url: cityURL,
                name: cityName}
            }));
    };

    const loadCityData = async (cityUrl: string) => {
        const api = new CityApi();
        console.log(cityUrl);
        const response = await api.getCity(cityUrl);
        const city = await response.data;
        const myPopulation = city["population"];
        console.log(myPopulation);
        setPopulation(myPopulation);
        onSelectedCity(index, myPopulation);
    };
    
    const debouncedEventHandler = React.useMemo(
    () => debounce(eventHandlerCitySearch, 300)
    , []);
    
  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

return (
    <div>
    <Autocomplete
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      value={value}
      onChange={(event, newValue) => {
        console.log("onChange Autocomplete has been fired");
        console.log(newValue);
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        if (newValue !== null) {
            loadCityData(newValue.url);
        }
      }}
      onInputChange={(event, newInputValue) => {
        console.log("onInputChange Autocomplete has been fired");
        setInputValue(newInputValue);
        console.log(newInputValue);
      }}
      getOptionSelected={(option: any, value: any) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for a city"
          variant="outlined"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(e.target.value);
            debouncedEventHandler(e);
          }}
              InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
    <h2>Population:{population}</h2>
    </div>
  );
}
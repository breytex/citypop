import React, { useMemo } from 'react'
import CityApi from '../CityApi'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import debounce from 'lodash/debounce';

export default function CityAutocomplete() {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<any>([]);
    const loading = open && options.length === 0;
    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState('');
    const [searchTerm, setSearchTerm] = React.useState('');
    
    const eventHandler = async (event: any) => {
        // the event uses `prop` and `value`
        console.log("onChange eventHandler TextField has been fired: " + event.target.value);
        const api = new CityApi();
        const response = await api.getCities(event.target.value);
        const cities = await response.data._embedded["city:search-results"];
        setOptions(cities.map((city: any) => {
            const cityURL = city["_links"]["city:item"];
            const cityName: string = city["matching_full_name"];
            return {
                url: cityURL,
                name: cityName}
            }));
    };
    
    const debouncedEventHandler = React.useMemo(
    () => debounce(eventHandler, 300)
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
        console.log("onChange has been fired");
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        console.log("onInputChange Autocomplete has been fired");
        setInputValue(newInputValue);
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
    </div>
  );
}
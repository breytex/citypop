import React from 'react'
import CityApi from '../CityApi'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function CityAutocomplete() {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<any>([]);
    const loading = open && options.length === 0;
  
    React.useEffect(() => {
      let active = true;
  
      if (!loading) {
        return undefined;
      }
  
      (async () => {
            const api = new CityApi();
            const response = await api.getCities('');
            const cities = await response.data._embedded["city:search-results"];
            if (active) {
            setOptions(cities.map((city: any) => {
                const cityURL = city["_links"]["city:item"];
                const cityName: string = city["matching_full_name"];
                return {
                    url: cityURL,
                    name: cityName}
                }));
            }
      })();
  
      return () => {
        active = false;
      };
    }, [loading]);
    
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
      getOptionSelected={(option: any, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for a city"
          variant="outlined"
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
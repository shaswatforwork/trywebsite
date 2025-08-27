import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Optional: MUI-styled link

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export default function Search() {
    const navigation = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  async function fetchProducts() {
    const res = await axios.get('https://backend2-2te4.onrender.com/products');
    setOptions(res.data.map(product => ({
      name: product.name,
      price: product.price,
      id: product._id,
      url: product.url,
      description: product.description,
    })));
  }

  const handleOpen = () => {
    setOpen(true);
    (async () => {
      setLoading(true);
      await sleep(1000);
      fetchProducts();
      setLoading(false);
    })();
  };

  const handleClose = () => {
    setOpen(false);
    setOptions([]);
  };

  return (
    <Autocomplete
    freeSolo
      sx={{ width: 300,border:'none', }}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderOption={(props, option) => (
        <li {...props}>
          <a onClick={() => navigation('Details', { state: { item: option } })} className='group w-72 cursor-pointer'>
            {option.name}
          </a>
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Products"
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            },
          }}
        />
      )}
    />
  );
}

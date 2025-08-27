import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Box, Button } from '@mui/material';


export default function Add() {
    const [name, setName] = useState("");
    const [originalPrice, setOriginalPrice] = useState("");
    const [price, setPrice] = useState("");
    const [description1, setDescription1] = useState("");
    const [description2, setDescription2] = useState("");
    const [description3, setDescription3] = useState("");
    const [description4, setDescription4] = useState("");
    const [category, setCategory] = useState("");
    const [url1, setUrl1] = useState("");
    const [url2, setUrl2] = useState("");
    const [url3, setUrl3] = useState("");
    const [url4, setUrl4] = useState("");
    const url = [url1, url2, url3, url4].filter(link => link.trim() !== "");
    const navigation = useNavigate();

    async function handleAddProduct() {
        const descriptionArray = [description1, description2, description3, description4].filter(desc => desc.trim() !== "");
        const productData = { name, originalPrice, price, description : descriptionArray, category ,url };
        try {
            await axios.post('https://backend2-2te4.onrender.com/addProducts', productData);
            alert('Product added successfully');
            navigation('/admin');
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Failed to add product. Please try again.');
        }
    }

    return (
        <div className=" w-320 justify-self-center mt-20 text-center bg-white text-gray-500 max-w-[550px] md:p-6 p-4 text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
            <form >
            <h1>Add New Product</h1>
            <br />
            <TextField sx={{width: '80%'}} id="outlined-basic" label="Product Name" variant="outlined" value={name} onChange={(e)=>{setName(e.target.value)}} />
                <br /><br />
            <TextField sx={{width: '80%'}} id="margin-normal" label="Original Price" variant="outlined" value={originalPrice} onChange={(e)=>{setOriginalPrice(e.target.value)}} />
                <br /><br />
            <TextField sx={{width: '80%'}} id="outlined-basic" label="Offer Price" variant="outlined" value={price} onChange={(e)=>{setPrice(e.target.value)}} />
                <br /><br />
            <TextField sx={{width: '80%'}} id="outlined-basic" label="Description-1" variant="outlined" value={description1} onChange={(e)=>{setDescription1(e.target.value)}} />
                <br /><br />
            <TextField sx={{width: '80%'}} id="outlined-basic" label="Description-2" variant="outlined" value={description2} onChange={(e)=>{setDescription2(e.target.value)}} />
                <br /><br />
            <TextField sx={{width: '80%'}} id="outlined-basic" label="Description-3" variant="outlined" value={description3} onChange={(e)=>{setDescription3(e.target.value)}} />
                <br /><br />
            <TextField sx={{width: '80%'}} id="outlined-basic" label="Description-4" variant="outlined" value={description4} onChange={(e)=>{setDescription4(e.target.value)}} />
            <br/>
            <Box sx={{ minWidth: 240, marginTop: 2 }}>
                {/* <FormControl fullWidth> */}
            <InputLabel  id="demo-simple-select-label">Category</InputLabel>
            <Select
            labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Age"
              onChange={(e) => setCategory(e.target.value)}
            >
            {/* <MenuItem value={10}>Age</MenuItem> */}
            <MenuItem value='Module'>Module</MenuItem>
            <MenuItem value='Microcontroller'>Micro Controller</MenuItem>
            <MenuItem value='Sensor'>Sensor</MenuItem>
            <MenuItem value='Display'>Display</MenuItem>
            <MenuItem value='Battery'>Battery</MenuItem>
            <MenuItem value='Components'>Components</MenuItem>
            <MenuItem value='Motor'>Motor</MenuItem>
            <MenuItem value='Wires'>Wires</MenuItem>
            <MenuItem value='Led'>LED</MenuItem>
            </Select>
            {/* </FormControl> */}
            </Box>
            <br />
            <TextField sx={{width: '80%'}} id="outlined-basic" label="Image URL" variant="outlined" value={url1} onChange={(e)=>{setUrl1(e.target.value)}} />
            <br /><br />
            <TextField sx={{width: '80%'}} id="outlined-basic" label="Image URL" variant="outlined" value={url2} onChange={(e)=>{setUrl2(e.target.value)}} />
            <br /><br />
            <TextField sx={{width: '80%'}} id="outlined-basic" label="Image URL" variant="outlined" value={url3} onChange={(e)=>{setUrl3(e.target.value)}} />
            <br /><br />
            <TextField sx={{width: '80%'}} id="outlined-basic" label="Image URL" variant="outlined" value={url4} onChange={(e)=>{setUrl4(e.target.value)}} />
            <br /><br />
            <Button variant='contained' onClick={()=>{handleAddProduct()}}>Add Product</Button>
            </form>
        </div>
    );
}
import axios from "axios";
import { TextField } from "@mui/material";
import { useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';



export default function Address() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobile, setMobile] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");

    const navigation = useNavigate();
    const location = useLocation();
    const orderData=location.state.order||{}

    function newOrder() {
        const address = {
            firstName: firstName,
            lastName: lastName,
            mobile: mobile,
            street: street,
            city: city,
            state: state,
            zipcode: pincode,
            country: "India"
        };
        console.log(orderData);
        const order = {
            ...orderData,
            address: address
        };
        console.log(order);
        axios.post('https://backend2-2te4.onrender.com/newOrder', order).then((res)=>{
              if(res.data.status === 'ok'){
                alert('Order placed successfully');
                // Clear cart after order placement
                localStorage.setItem('cartLength', 0);
                navigation('/orders');
                }else{
                console.log('Order placement failed:', res.data.error);
                alert('Order placement failed');
                }
            }).catch((error) => {
              console.error('Error during order placement:', error);
                alert('An error occurred during order placement. Please try again.');
            });
    }

    


    return (
        <div className="text-center mt-10">
            <h1>Address Page</h1>
            <div style={{ display: "inline-flex", marginTop: "25px", gap: "26px" }}>
                <TextField id="outlined-basic" label="First Name" variant="outlined" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} />
                <TextField id="outlined-basic" label="Last Name" variant="outlined" value={lastName} onChange={(e)=>{setLastName(e.target.value)}} />
            </div>
            <div className="mt-10">
                <TextField id="outlined-basic" label="Contact Number" variant="outlined" value={mobile} onChange={(e)=>{setMobile(e.target.value)}} />
                    <br /><br />
                <TextField id="outlined-basic" label="Street" variant="outlined" value={street} onChange={(e)=>{setStreet(e.target.value)}} />
                    <br /><br />
                <TextField id="outlined-basic" label="City" variant="outlined" value={city} onChange={(e)=>{setCity(e.target.value)}} />
                    <br /><br />
                <TextField id="outlined-basic" label="PinCode" variant="outlined" value={pincode} onChange={(e)=>{setPincode(e.target.value)}} />
                    <Box sx={{ minWidth: 140, justifySelf:'center', marginTop: 2, width: 300 }}>
    <InputLabel id="demo-simple-select-label">State</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={state}
      label="State"
      onChange={(e) => setState(e.target.value)}
      fullWidth
    >
      <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
      <MenuItem value="Arunachal Pradesh">Arunachal Pradesh</MenuItem>
      <MenuItem value="Assam">Assam</MenuItem>
      <MenuItem value="Bihar">Bihar</MenuItem>
      <MenuItem value="Chhattisgarh">Chhattisgarh</MenuItem>
      <MenuItem value="Goa">Goa</MenuItem>
      <MenuItem value="Gujarat">Gujarat</MenuItem>
      <MenuItem value="Haryana">Haryana</MenuItem>
      <MenuItem value="Himachal Pradesh">Himachal Pradesh</MenuItem>
      <MenuItem value="Jharkhand">Jharkhand</MenuItem>
      <MenuItem value="Karnataka">Karnataka</MenuItem>
      <MenuItem value="Kerala">Kerala</MenuItem>
      <MenuItem value="Madhya Pradesh">Madhya Pradesh</MenuItem>
      <MenuItem value="Maharashtra">Maharashtra</MenuItem>
      <MenuItem value="Manipur">Manipur</MenuItem>
      <MenuItem value="Meghalaya">Meghalaya</MenuItem>
      <MenuItem value="Mizoram">Mizoram</MenuItem>
      <MenuItem value="Nagaland">Nagaland</MenuItem>
      <MenuItem value="Odisha">Odisha</MenuItem>
      <MenuItem value="Punjab">Punjab</MenuItem>
      <MenuItem value="Rajasthan">Rajasthan</MenuItem>
      <MenuItem value="Sikkim">Sikkim</MenuItem>
      <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
      <MenuItem value="Telangana">Telangana</MenuItem>
      <MenuItem value="Tripura">Tripura</MenuItem>
      <MenuItem value="Uttar Pradesh">Uttar Pradesh</MenuItem>
      <MenuItem value="Uttarakhand">Uttarakhand</MenuItem>
      <MenuItem value="West Bengal">West Bengal</MenuItem>
      <MenuItem value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</MenuItem>
      <MenuItem value="Chandigarh">Chandigarh</MenuItem>
      <MenuItem value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</MenuItem>
      <MenuItem value="Delhi">Delhi</MenuItem>
      <MenuItem value="Jammu and Kashmir">Jammu and Kashmir</MenuItem>
      <MenuItem value="Ladakh">Ladakh</MenuItem>
      <MenuItem value="Lakshadweep">Lakshadweep</MenuItem>
      <MenuItem value="Puducherry">Puducherry</MenuItem>
    </Select>
</Box>
            </div>
            <Button variant="contained" sx={{marginTop: 3}} onClick={newOrder}>Confirm Order</Button>
        </div>
        
    );
}
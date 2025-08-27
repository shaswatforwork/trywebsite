import * as React from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { Button ,TextField } from '@mui/material';
import './Login.css';



export default function SignUp ()  {
  const navigation = useNavigate();
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [otpSent, setOtpSent] = React.useState(false);
  const [otpInput, setOtpInput] = React.useState('');
  const [otp, setOtp] = React.useState();
  const [verified, SetVerified] = React.useState(false);
  const [loading, setLoading] = React.useState(false);



  function verifyOtp() {
    if (otp == otpInput) {
      SetVerified(true);
      alert('Verification Successful');
    } else {
      alert('Incorrect OTP');
    }    
  }


function sendOtp () {
  setLoading(true)
    const userData = {
      name:name,
      email: email,
    };
    axios.get('https://backend2-2te4.onrender.com/verify',{params : userData}).then((res)=>{
      if(res.data.status === 'ok'){
        setOtp(res.data.otp)
        setOtpSent(true)
        setLoading(false)
      }else{
        console.log('Login failed:', res.data);
        alert('Invalid credentials');
      }
    }).catch((error) => {
      console.error('Error during login:', error);
      alert('An error occurred during login. Please try again.');
    });
  };




  function handleSignUp () {
    const userData = {
      name:name,
      phone:phone,
      email: email,
      password: password,
    };
    axios.post('https://backend2-2te4.onrender.com/register',userData).then((res)=>{
      if(res.data.status === 'ok'){
        localStorage.setItem('user',res.data.user);
        localStorage.setItem('userId',res.data.userId);
        navigation('/');
      }else{
        console.log('Login failed:', res.data.error);
        alert('Invalid credentials');
      }
    }).catch((error) => {
      console.error('Error during login:', error.status);
      alert('An error occurred during login. Please try again.');
    });
  };

  

  return (        
    <div className='text-center'>
        <h1>SignUp</h1>
    <div className=" justify-self-center w-450 mt-20 text-center bg-white text-gray-500 max-w-[350px] md:p-6 p-4 text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
        <TextField className='mb-100' id="outlined-basic" label="Name" variant="outlined" onChange={(e)=>{setName(e.target.value)}} />
          <br /><br />
        <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(e)=>{setEmail(e.target.value)}} />
          <br /><br />
          {/* {loading? <p>Sending OTP...</p> : null} */}
        {otpSent ? (
          <>
            <TextField id="outlined-basic" label="OTP" variant="outlined" onChange={(e)=>{setOtpInput(e.target.value)}} />
              <br /><br />
            <Button variant="contained" onClick={verifyOtp}>Verify OTP</Button>
          </>
        ) : (
            <Button variant="contained" loading={loading} onClick={sendOtp}>Send OTP</Button>
            
        )}
        <br /><br />
        <TextField id="outlined-basic" label="Phone" variant="outlined" onChange={(e)=>{setPhone(e.target.value)}} />
          <br /><br />
        <TextField id="outlined-basic" label="Password" type='password' variant="outlined" onChange={(e)=>{setPassword(e.target.value)}}/>
        <br/><br />
        <Button variant="contained" disabled={!verified} onClick={(e)=>{console.log('Login button clicked');
            e.preventDefault();
            handleSignUp()}}>Login</Button>
    </div></div>
  );
};

import * as React from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { Button ,TextField } from '@mui/material';
import './Login.css';



export default function Login ()  {
  const navigation = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(true);


  function fetchCartItems() {
        axios.get(`https://backend2-2te4.onrender.com/getCart/${localStorage.getItem('userId')}`, {  
        }).then((res) => {
            if (res.data.status === 'ok') {
                localStorage.setItem('cartLength', res.data.cart.length);
            }
        }).catch(() => {
            navigation('/login');
        });

}



  function handleLogin () {
    console.log('Login button clicked');
    const userData = {
      email: email,
      password: password,
    };
    axios.post('https://backend2-2te4.onrender.com/login',userData).then((res)=>{
      if(res.data.status === 'ok'){
        localStorage.setItem('user',res.data.user);
        localStorage.setItem('userId',res.data.userId);
        fetchCartItems();
        if(res.data.user === 'satyam'){
          navigation('/admin');
        }else{  
        navigation('/');
        window.location.reload();
        }
      }else{
        console.log('Login failed:', res.data.error);
        alert('Invalid credentials');
      }
    }).catch((error) => {
      console.error('Error during login:', error);
      alert('An error occurred during login. Please try again.');
    });
  };


  return (        
    <div className=' text-center'>
        <h1>LOGIN</h1>
    <div className=" w-390 justify-self-center mt-20 text-center bg-white text-gray-500 max-w-[350px] md:p-6 p-4 text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
        <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(e)=>{setEmail(e.target.value)}} />
          <br />
          <br />
        <TextField id="outlined-basic" label="Password" variant="outlined" onChange={(e)=>{setPassword(e.target.value)}}/>
        <br/><br /><br />
        <Button variant="contained" onClick={(e)=>{console.log('Login button clicked');
            e.preventDefault();
            handleLogin()}}>Login</Button>
            <br /><br />
        <a href="/signup" className='text-blue-500 hover:underline'>Don't have an account? Sign Up</a>
    </div></div>
  );
};

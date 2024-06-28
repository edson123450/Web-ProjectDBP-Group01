import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchRegister } from '../services/api'

const Register = () => {
    const [firstName, setFirstName]=useState('');
    const [lastName, setLastName]=useState('');
    const [password,setPassword]=useState('');
    const [email,setEmail]=useState('');
    const [age, setAge]=useState('');
    const [isWorker, setIsWorker]=useState(false);
    const [telephone, setTelephone]=useState('');
    const [schedule, setSchedule]=useState('');
    const navigate=useNavigate();

    const handleCheckboxChange = () => {
        setIsWorker(!isWorker);
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const res=await fetchRegister(firstName, lastName, email, password, age, isWorker, telephone, schedule);
            if(res){
                console.log('Registration Successful!');
                navigate('/login');
            }
        }catch(error){
            console.log('Registration failed: ',error);
        }
    }
    const handleLoginRedirect=()=>{
        navigate('/login');
    }

  return (
    <>
    <h1>Register</h1>
    <form onSubmit={handleSubmit}>
        <label htmlFor='firstName'>First Name</label>
        <input onChange={(e)=>{setFirstName(e.target.value)}} id="firstName" required/>
        <label htmlFor='lastName'>Last Name</label>
        <input onChange={(e)=>{setLastName(e.target.value)}} id="lastName" required/>
        <label htmlFor='email'>First Name</label>
        <input onChange={(e)=>{setEmail(e.target.value)}} id="email" required/>
        <label htmlFor='age'>First Name</label>
        <input onChange={(e)=>{setAge(e.target.value)}} id="age" required/>
        <label htmlFor='telephone'>First Name</label>
        <input onChange={(e)=>{setTelephone(e.target.value)}} id="telephone" required/>
        <label htmlFor='password'>Password</label>
        <input onChange={(e)=>{setPassword(e.target.value)}} type="password" id="password" required/>
        <label>
        <input
          type="checkbox"
          checked={isWorker}
          onChange={handleCheckboxChange}
        />Is Worker?
        </label>
        <button type="button" onClick={handleLoginRedirect}>Go to Login</button>
    </form>
    </>
  )
}

export default Register
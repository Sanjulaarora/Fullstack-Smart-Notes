import React, { useState } from 'react';
import rightBg from '../images/container.png';
import icon from '../images/icon.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({
    name: "",
    dateofbirth: "",
    email: "",
    password: ""
  });

  const addSignUpData = (e) => {
    const { name, value } = e.target;
    setSignUpData(() => {
      return {
        ...signUpData,
        [name]: value
      }
    })
  }

  const handleSignUp = async(e) => {
    e.preventDefault();
    const { name, dateofbirth, email, password } = signUpData;

    const res = await fetch('/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, dateofbirth, email, password })
    });

    const data = await res.json();

    if(res.status !== 201 || !data) {
      alert('Something went wrong');
    } else {
      alert('Sign Up Successfull');
      setSignUpData({...signUpData, name: "", dateofbirth: "", email: "", password: ""});
      navigate('/');
    }
  }

  return (
    <div className='flex justify-center items-center md:justify-between'>
      <div className='flex justify-center items-center w-[591px] h-screen'>
        <div className='h-[689px] w-10/12'>
          <div className='flex justify-center mt-24 md:mt-10'>
            <img className='h-5 md:h-8 w-5 md:w-8' src={icon} alt='logo' loading='lazy'/>
            <p className='text-base font-semibold md:text-xl ml-3'>HD</p>
          </div>
          <div className='flex flex-col justify-center items-center mt-4 md:mt-10'>
            <div className='flex flex-col'>
              <p className='w-60 sm:w-[399px] md:w-32 h-11 font-extrabold md:font-bold text-[20px] md:text-2xl text-center'>Sign up</p>
              <p className='w-60 sm:w-[399px] h-7 font-normal text-[14px] md:text-lg text-[#969696] text-center'>Sign up to enjoy the feature of HD</p>
            </div>
            <div className='mt-2'>
              <form method='POST'>
               <div className='flex flex-col'>
                  <label htmlFor='name' className='text-[14px] md:text-base'>Name</label>
                  <input 
                    className='w-60 sm:w-[399px] h-8 md:h-12 text-[14px] md:text-base border-slate-300 border-solid border-[2px] rounded-lg p-2'
                    id='name'
                    name='name'
                    type='text'
                    placeholder='Enter your Name'
                    value={signUpData.name}
                    onChange={addSignUpData}
                  />
                </div>
                <div className='flex flex-col mt-2'>
                  <label htmlFor='dateofbirth' className='text-[14px] md:text-base'>Date of Birth</label>
                  <input 
                    className='w-60 sm:w-[399px] h-8 md:h-12 text-[14px] md:text-base border-slate-300 border-solid border-[2px] rounded-lg p-2'
                    id='dateofbirth'
                    name='dateofbirth'
                    type='date'
                    placeholder='Enter your Date of Birth'
                    value={signUpData.dateofbirth}
                    onChange={addSignUpData}
                  />
                </div>
                <div className='flex flex-col mt-2'>
                  <label htmlFor='email' className='text-[14px] md:text-base'>Email</label>
                  <input 
                    className='w-60 sm:w-[399px] h-8 md:h-12 text-[14px] md:text-base border-slate-300 border-solid border-[2px] rounded-lg p-2'
                    id='email'
                    name='email'
                    type='text'
                    placeholder='Enter your Email'
                    value={signUpData.email}
                    onChange={addSignUpData}
                  />
                </div>
                <div className='flex flex-col mt-2'>
                  <label htmlFor='password' className='text-[14px] md:text-base'>Password</label>
                  <input 
                    className='w-60 sm:w-[399px] h-8 md:h-12 text-[14px] md:text-base border-slate-300 border-solid border-[2px] rounded-lg p-2'
                    id='password'
                    name='password'
                    type='password'
                    placeholder='Enter your Password'
                    value={signUpData.password}
                    onChange={addSignUpData}
                  />
                </div>             
                <p className='text-blue-500 mt-2 hover:underline text-[14px] md:text-base'>Forgot password?</p>
                <button className='bg-blue-500 text-white w-60 sm:w-[399px] h-8 md:h-12 rounded-lg mt-4 hover:scale-110 text-[14px] md:text-base' type='submit' onClick={handleSignUp} 
                  disabled={!signUpData.name || !signUpData.dateofbirth || !signUpData.email || !signUpData.password}
                >
                  Sign up
                </button>
              </form>
              <p className='text-center text-slate-400 mt-1'>or</p>
              <button className='w-60 sm:w-[399px] h-8 md:h-12 border-slate-300 border-solid border-[2px] rounded-lg mt-1 md:mt-3 hover:scale-110 text-[14px] md:text-base'>Sign in with Google</button>
              <p className='text-center text-slate-400 mt-5 text-[14px] md:text-base'>Already have an account?? <Link to='/' className='text-blue-500 hover:underline text-[14px] md:text-base'>Sign In</Link ></p>
            </div>
          </div>
        </div> 
      </div>
      <div className='hidden md:block'>
        <img className='w-[849px] h-screen' src={ rightBg } alt='right-background' loading='lazy'/>
      </div>
    </div>
  )
}

export default SignUp;
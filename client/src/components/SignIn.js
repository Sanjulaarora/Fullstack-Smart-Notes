import React ,{ useState }from 'react';
import rightBg from '../images/container.png';
import icon from '../images/icon.png';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [signInData, setSignInData] = useState({
    email: "",
    password: ""
  });

  const addSignInData = (e) => {
    const { name, value} = e.target;
    setSignInData(() => { 
      return {
        ...signInData,
        [name]: value
      }
    })
  }

  const handleSignIn = async(e) => {
    e.preventDefault();
    setIsLoading(true);

    const { email, password  } = signInData;

    try {
      const res = await fetch('/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if(res.status === 400 || !data) {
        alert('Something went wrong.')
      } else {
        alert('Sign-in Successfull!');
        setSignInData({...signInData, email: "", password: ""});
        navigate('/dashboard');
      }
    } catch(error) {
      console.log('Error during sign-in:', error);
      alert('Somwthing went wrong. Try again later.');
    } finally {
      setIsLoading(false);
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
              <p className='w-60 sm:w-[399px] md:w-32 h-11 font-extrabold md:font-bold text-[20px] md:text-2xl text-center'>Sign in</p>
              <p className='w-60 sm:w-[399px] h-7 font-normal text-[14px] md:text-lg text-[#969696] text-center'>Please login to continue to your account.</p>
            </div>
            <div className='mt-4'>
              <form>
                <div className='flex flex-col'>
                  <label htmlFor='email' className='text-[14px] md:text-base'>Email</label>
                  <input 
                    className='w-60 sm:w-[399px] h-8 md:h-12 text-[14px] md:text-base border-slate-300 border-solid border-[2px] rounded-lg p-2'
                    value={signInData.email}
                    onChange={addSignInData}
                    id='email'
                    name='email'
                    type='text'
                    placeholder='Enter your Email'
                  />
                </div>
                <div className='flex flex-col mt-3'>
                  <label htmlFor='password' className='text-[14px] md:text-base'>Password</label>
                  <input 
                    className='w-60 sm:w-[399px] h-8 md:h-12 text-[14px] md:text-base border-slate-300 border-solid border-[2px] rounded-lg p-2'
                    value={signInData.password}
                    onChange={addSignInData}
                    id='password'
                    name='password'
                    type='password'
                    placeholder='password'
                  />
                </div>             
                <p className='text-blue-500 mt-2 hover:underline text-[14px] md:text-base'>Forgot password?</p>
                <button className='bg-blue-500 text-white w-60 sm:w-[399px] h-8 md:h-12 rounded-lg mt-4 hover:scale-110 text-[14px] md:text-base' type='submit' disabled={!signInData.email || !signInData.password} onClick={ handleSignIn }>
                  {isLoading ? "Signing In": "Sign In"}
                </button>
              </form>
              <p className='text-center text-slate-400 mt-1 md:mt-3'>or</p>
              <button className='w-60 sm:w-[399px] h-8 md:h-12 border-slate-300 border-solid border-[2px] rounded-lg mt-1 md:mt-3 hover:scale-110 text-[14px] md:text-base'>Sign in with Google</button>
              <p className='text-center text-slate-400 mt-5 text-[14px] md:text-base'>Need an account? <Link to='/sign-up' className='text-blue-500 hover:underline text-[14px] md:text-base'>Create one</Link></p>
            </div>
          </div>
        </div> 
      </div>
      <div className='hidden md:block'>
        <img className='w-[620px] xl:w-[849px] h-screen' src={ rightBg } alt='right-background' loading='lazy'/>
      </div>
    </div>
  )
}

export default SignIn;
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const SignUp = lazy(() => import('./components/SignUp'));
const SignIn = lazy(() => import('./components/SignIn'));
const Dashboard = lazy(() => import('./components/Dashboard'));

function App() {
  return (
    <div>
      <Suspense fallback = {<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={ <SignIn />} />
          <Route path='/sign-up' element={ <SignUp />} />
          <Route path='/dashboard' element={ <Dashboard />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './commonPages/login';
import { SignUp } from './commonPages/signup';
import { ForgotPassword } from './commonPages/forgotPassword.js';
import { Verification } from './commonPages/verification/index.js';
import { CreateProject } from './pages/createProject/index.js';
import { Dashboard } from './pages/dashboard/index.js';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot_password" element={<ForgotPassword />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create_project" element={<CreateProject />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

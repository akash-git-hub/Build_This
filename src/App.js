import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './commonPages/login';
import { SignUp } from './commonPages/signup';
import { ForgotPassword } from './commonPages/forgotPassword.js';
import { Verification } from './commonPages/verification/index.js';
import { Dashboard } from './pages/dashboard/index.js';
import { MyProject } from './pages/dashboard/myProject/MyProject.js';
import { PublishProject } from './pages/dashboard/publishProject/PublishProject.js';
import { MyProjectDetail } from './pages/dashboard/myProject/MyProjectDetail.js';
import { CreateProject } from './pages/createProject/index.js';
import { Profile } from './pages/myProfile/Profile.js';
import { EditProfile } from './pages/myProfile/EditProfile.js';


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
          <Route path="/my_project" element={<MyProject />} />
          <Route path="/my_project_detail" element={<MyProjectDetail />} />
          <Route path="/publish_project" element={<PublishProject />} />
          <Route path="/create_project" element={<CreateProject />} />
          <Route path='/my_profile' element={<Profile/>} />
          <Route path='/edit_profile' element={<EditProfile/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

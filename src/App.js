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
import { UserProfile } from './pages/profile/UserProfile.js';
import { Chat } from './pages/chatPages/index.js';
import { MyProfile } from './pages/profile/myProfile/index.js';
import { EditProfile } from './pages/profile/editProfile/index.js';
import { InviteUser } from './pages/inviteUserPage/index.js';


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
          <Route path="/my_project" element={<MyProject />} />
          <Route path="/my_project_detail" element={<MyProjectDetail />} />
          <Route path="/publish_project" element={<PublishProject />} />
          <Route path='/my_profile' element={ <MyProfile/> } />
          <Route path='/edit_profile' element={<EditProfile/>} />
          <Route path="/user_profile" element={<UserProfile/>}/>
          <Route path="/invite_user" element={<InviteUser/>}/> 
          <Route path="/chats" element={<Chat/>}/> 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

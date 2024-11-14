import './App.css';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import { Login } from './commonPages/login';
import { SignUp } from './commonPages/signup';
import { ForgotPassword } from './commonPages/forgotPassword.js';
import { Verification } from './commonPages/verification/index.js';
import { Dashboard } from './pages/dashboard/index.js';
import { MyProject } from './pages/dashboard/myProject/MyProject.js';
import { MyAllProject } from './pages/dashboard/publishProject/MyAllProject.js';
import { MyProjectDetail } from './pages/dashboard/myProject/MyProjectDetail.js';
import { CreateProject } from './pages/createProject/index.js';
import { Profile } from './pages/myProfile/Profile.js';
import { EditProfile } from './pages/myProfile/EditProfile.js';
import { AcademicInformation } from './pages/myProfile/AcademicInformation.js';
import { SkillsAndExpertise } from './pages/myProfile/SkillsAndExpertise.js';
import { ProjectPreferences } from './pages/myProfile/ProjectPreferences.js';
import { createContext, useEffect, useState } from 'react';
import { getAcademic_API, getMyCertificates_API, getMySkills_API, userProfileAPI } from './APIServices/service.js';
import { EditCertificate } from './pages/myProfile/EditCertificate.js';
import { DetailsProject } from './pages/dashboard/myProject/DetailsProject.js';
import Auth from './Auth.js';
import { InviteUser } from './pages/inviteUserPage/index.js';
import { Chat } from './pages/chatPages/index.js'
import MyInvitation from './pages/inviteUserPage/MyInvitation.js';

const MyContext = createContext();


function App() {
  const [info, setInfo] = useState();
  const [mySkills, setMySkills] = useState([]);
  const [myCertificate, setMyCertificate] = useState([]);
  const [myAcademic, setMyAcademic] = useState([]);

  const userData = async () => {
    const resp = await userProfileAPI();
    if (resp) {
      const information = resp.data;
      setInfo(information);
    }
  }
  const getMySkills = async () => {
    const resp = await getMySkills_API();
    const pr = (resp && resp.data) || [];
    setMySkills(pr);

  }
  const getMyCertificate = async () => {
    const resp = await getMyCertificates_API();
    const pr = (resp && resp.data) || [];
    setMyCertificate(pr);
  }
  const getAcademic = async () => {
    const resp = await getAcademic_API();
    const pr = (resp && resp.data) || [];
    setMyAcademic(pr);
  }

  useEffect(() => {
    if (info) {
      getMySkills(); getMyCertificate(); getAcademic();
      return;
    }
  }, [info])

  useEffect(() => {
    if (localStorage.getItem('Authorization')) {
      userData();
      return;
    }
  }, [localStorage.getItem('Authorization')])

  return (
    <>
      <MyContext.Provider value={{ info, mySkills, getMySkills, userData, getMyCertificate, myCertificate, myAcademic, getAcademic }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<Auth />} >
              <Route path="/forgot_password" element={<ForgotPassword />} />
              <Route path="/verification" element={<Verification />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create_project" element={<CreateProject />} />
              <Route path="/my_project" element={<MyProject />} />
              <Route path="/my_project_detail" element={<MyProjectDetail />} />
              <Route path="/detailsProject" element={<DetailsProject />} />
              <Route path="/my_all_project" element={<MyAllProject />} />
              <Route path='/my_profile' element={<Profile />} />
              <Route path='/edit_profile' element={<EditProfile />} />
              <Route path='/AcademicInfo' element={<AcademicInformation />} />
              <Route path='/skillsExpertise' element={<SkillsAndExpertise />} />
              <Route path='/projectPreferences' element={<ProjectPreferences />} />
              <Route path='/editCertificate' element={<EditCertificate />} />
              <Route path='/inviteUser' element={<InviteUser />} />
              <Route path='/my-invitation' element={<MyInvitation />} />
              <Route path='/chats' element={<Chat />} />
            </Route>

          </Routes>
        </BrowserRouter >
      </MyContext.Provider >
    </>
  );
}

export default App;
export { MyContext };
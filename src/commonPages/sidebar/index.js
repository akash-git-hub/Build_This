import React from 'react'
import { Image, Stack } from 'react-bootstrap'
import { LinkSidebar } from '../../components/LinkSidebar';
// import { Avatar } from '../../components/Avatar';
import { CgLogOut } from "react-icons/cg";
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SharedButton } from '../../components/Button';
import { Avatar } from '../../components/Avatar';

const Box = styled.div`
  background: #ffffff;
  min-height: 100%;
  margin-right:10px;
  `;

export const Sidebar = () => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;


  

  return (
    <>
      <Box className='Sidebar p-md-4' style={{}}>
        <Stack direction='vertical' gap={3}>
          <img src="./assets/images/Logo.svg" className='img-fluid p-4' alt='' />
          <h6 style={{
            color: '#64748B'
          }}>Menu</h6>
          <ul style={{
            listStyle: 'none',
            padding: 0
          }}>
            <Stack direction='vertical' gap={3}>
              <li className={pathname === "/dashboard" || pathname === "/my_project" || pathname === "/publish_project" || pathname === "/my_project_detail" ? 'active' : ""} style={{
                padding: '10px'
              }}>
                <LinkSidebar LinkIcon={<Image src='./assets/images/Icons/Dashboard.svg' />} LinkLabel={'Dashboard'} LinkPath={'/dashboard'} />
              </li>
              <li className={pathname === "/create_project" || pathname === "/editprofileadminstrator" || pathname === "/profileadminstrator" ? 'active' : ""} style={{
                padding: '10px',
                position: 'relative'
              }}>
                <LinkSidebar LinkIcon={<Image src='./assets/images/Icons/CreateProject.svg' />} LinkLabel={'Create Project'} LinkPath={'/create_project'} />
              </li>
              <li className={pathname === "/traininglist" || pathname === "/TraningListDetail" || pathname === "/training" ? 'active' : ""} style={{
                padding: '10px'
              }}>
                <LinkSidebar LinkIcon={<Image src='./assets/images/Icons/Chats.svg' />} LinkLabel={'Chats'} LinkPath={'/traininglist'} />
              </li>
              <li className={pathname === "/messages" ? 'active' : ""} style={{
                padding: '10px'
              }}>
                <LinkSidebar LinkIcon={<Image src='./assets/images/Icons/Notification.svg' />} LinkLabel={'Notification'} LinkPath={'/messages'} />
              </li>
              <li className={pathname === "/inventorymodulelist" || pathname === "/apparatusInfoDetails" || pathname === "/createGeareType" || pathname === "/gearinfo" || pathname === "/CreateGear" || pathname === "/CreateApparatus" || pathname === "/GearListDetail" ? 'active' : ""} style={{
                padding: '10px'
              }}>
                <LinkSidebar LinkIcon={<Image src='./assets/images/Icons/InviteUser.svg' />} LinkLabel={'Invite Users'} LinkPath={'/inventorymodulelist'} />
              </li>

            </Stack>
          </ul>
          <hr />
          <h6 style={{
            color: '#64748B'
          }}>Profile</h6>
          <ul style={{
            listStyle: 'none',
            padding: 0
          }}>
            <Stack direction='vertical' gap={3}>
              <li className={pathname === "/my_profile" ? 'active' : ""} style={{ padding: '0px 10px' }} onClick={() => navigate('/my_profile')} >
                <Avatar UserName={'Jaylee Fox'} UserEmail={'jaylee@foxgmail.com'} />
              </li>
              <li>
                <SharedButton label={'LogOut'} variant={'light'} startIcon={<CgLogOut />} size={'sm'} className={"w-100"} />
              </li>
            </Stack>
          </ul>
        </Stack>
      </Box>
    </>
  )
}

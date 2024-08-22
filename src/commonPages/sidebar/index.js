import React from 'react'
import { Image, Stack } from 'react-bootstrap'
import { LinkSidebar } from '../../components/LinkSidebar';
// import { Avatar } from '../../components/Avatar';
import { CgLogOut } from "react-icons/cg";
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SharedButton } from '../../components/Button';
import { Avatar } from '../../components/Avatar';

export const Sidebar = () => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;


  const Box = styled.div`
  background: #ffffff;
  `

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
              <li className={pathname === "/roleadminstratorlist" || pathname === "/rolelistdetail" || pathname === "/roleadminstrator" ? 'active' : ""} style={{
                padding: '10px'
              }}>
                <LinkSidebar LinkIcon={<Image src='./assets/images/Icons/Dashboard.svg' />} LinkLabel={'Dashboard'} LinkPath={'/roleadminstratorlist'} />
              </li>
              <li className={pathname === "/adminstratorprofilelist" || pathname === "/editprofileadminstrator" || pathname === "/profileadminstrator" ? 'active' : ""} style={{
                padding: '10px',
                position: 'relative'
              }}>
                <LinkSidebar LinkIcon={<Image src='./assets/images/Icons/CreateProject.svg' />} LinkLabel={'Create Profile'} LinkPath={'/adminstratorprofilelist'} />
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
              <li className={pathname === "/myprofile" ? 'active' : ""} style={{ padding: '0px 10px' }} onClick={() => navigate('/myprofile')} >
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

import React, { useContext, useState } from 'react'
import { Image, Stack } from 'react-bootstrap'
import { LinkSidebar } from '../../components/LinkSidebar';
// import { Avatar } from '../../components/Avatar';
import { Navbar, Nav, Offcanvas, Button } from 'react-bootstrap';
import { CgLogOut } from "react-icons/cg";
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SharedButton } from '../../components/Button';
import { Avatar } from '../../components/Avatar';
import { MyContext } from '../../App';

const Box = styled.div`
  background: #ffffff;
  min-height: 100%;
  margin-right:10px;
  `;

export const AdminSidebar = () => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const { info } = useContext(MyContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const logOutHandler = () => {
    localStorage.removeItem('Authorization');
    navigate('/');
  }




  return (
    <>
      <Box className='Sidebar p-md-4'>

        <Stack direction='horizontal' gap={2} className={'justify-content-between align-items-center px-3 p-md-0'}>
          <img src="./assets/images/Logo.svg" className='img-fluid p-lg-4' alt='' style={{ width: '20vw', height: '10vw' }} />
          <Navbar bg="transparent" expand="lg">
            <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />
          </Navbar>
        </Stack>

        <Stack direction='vertical' gap={3} className='d-none  d-lg-block'>
          <h6 style={{
            color: '#64748B'
          }}>Menu</h6>
          <ul style={{
            listStyle: 'none',
            padding: 0
          }}>
            <Stack direction='vertical' gap={3}>
              <li className={"my_project_detail active "} style={{padding: '10px'}}>
                <LinkSidebar LinkIcon={<Image src='./assets/images/Icons/Dashboard.svg' />} LinkLabel={'Dashboard'} LinkPath={'#'} />
              </li>
            </Stack>
          </ul>
          <hr />
          <h6 style={{ color: '#64748B' }}>Profile</h6>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <Stack direction='vertical' gap={3} style={{ cursor: "pointer" }}>
              <li className={pathname === "/my_profile" ? 'active' : ""} style={{ padding: '0px 10px' }} onClick={() => navigate('/my_profile')} >
                <Avatar UserName={info && info.full_name} UserEmail={info && info.email} Pr_Image={info && info.pr_image} />
              </li>
              <li>
                <SharedButton label={'LogOut'} variant={'light'} onClick={logOutHandler} startIcon={<CgLogOut />} size={'sm'} className={"w-100"} />
              </li>
            </Stack>
          </ul>
        </Stack>
      </Box>

      {/* --------------offcanvas sidebar------------------ */}
      <Offcanvas show={show} onHide={handleClose} placement="start" className='d-md-block d-block d-lg-none'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link  className={pathname === "/admin_dashboard" ? 'active' : ""} style={{ padding: '10px' }}>
              <LinkSidebar LinkIcon={<Image src='./assets/images/Icons/Dashboard.svg' />} LinkLabel={'Dashboard'} LinkPath={'/admin_dashboard'} />
            </Nav.Link>
            <hr />
            <Nav.Link className={pathname === "/my_profile" ? 'active' : ""} style={{ padding: '0px 10px' }} onClick={() => navigate('/my_profile')} >
              <Avatar UserName={info && info.full_name} UserEmail={info && info.email} Pr_Image={info && info.pr_image} />
            </Nav.Link>
            <Nav.Link>
              <SharedButton label={'LogOut'} variant={'light'} onClick={logOutHandler} startIcon={<CgLogOut />} size={'sm'} className={"w-100"} />
            </Nav.Link>
          </Nav>
        </Offcanvas.Body >
      </Offcanvas >
    </>
  )
}
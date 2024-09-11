import React from 'react' 
import { SharedButton } from './Button'
import { FiUserPlus } from 'react-icons/fi'
import { Table } from 'react-bootstrap'; 
import Swal from 'sweetalert2'; 
import { CheckBox } from './CheckBox';
import { FaUserPlus } from 'react-icons/fa6';
import { PopupModal } from './PopupModal';
import styled from 'styled-components';


const Icon = styled.div`
background:#e6f5ff;
width:50px;
height:50px;
color:green; 
display:flex;
justify-content:center;
align-items:center;
margin:auto;  
border-radius: 50%;
overflow:hidden;
`;


export const UserList = () => {
    const [modalShow, setModalShow] = React.useState(false);

    const list = [{ name:'Tatiana Curtis', email:'Futurristics@gmail.com', phone:'+966583317251' },
    { name: 'Tatiana Curtis', email: 'Futurristics@gmail.com', phone: '+966583317251' },
    { name: 'Tatiana Curtis', email: 'Futurristics@gmail.com', phone: '+966583317251' },
    { name: 'Tatiana Curtis', email: 'Futurristics@gmail.com', phone: '+966583317251' },
    { name: 'Tatiana Curtis', email: 'Futurristics@gmail.com', phone: '+966583317251' },
    ]

    const handleClick=()=>{      
       alert(); 
    }
    
    const alert=()=>{
        Swal.fire({
            imageUrl:'./assets/images/Icons/UserAdd.svg',
            title:"Invite Successfully",
            text:"Your invite has been processed successfully",
            showCloseButton:true,
            showCancelButton:true,
            confirmButtonText: "Continue",
            cancelButtonText: "Close",
            customClass: {
                confirmButton: 'btn btn-outline-primary w-100',
                cancelButton: 'btn btn-primary w-100 ',   
                title:'p-0',
                actions:'flex-nowrap w-75'   
            },  
          }) 
    }

    

    return (

        <Table hover responsive>
            <thead>
                <tr>
                    <td> </td>
                    <td className='text-secondary'>FULL NAME</td>
                    <td className='text-secondary'>EMAIL</td>
                    <td className='text-secondary'>PHONE NO</td>
                    <td className='text-secondary'>ACTION</td>
                </tr>
            </thead>
            <tbody>
                {list.map((userlist, index) => {
                    return (
                        <tr key={index}>
                            <td><CheckBox type={'checkbox'} id={index} onClick={()=>{console.log("user selected");}}/></td>
                            <td>{userlist.name}</td>
                            <td>{userlist.email}</td>
                            <td>{userlist.phone}</td>
                            <td> <SharedButton
                                label={'Invite'}
                                size={'sm'}
                                variant={'primary'}
                                startIcon={<FiUserPlus/>}
                                onClick={() => setModalShow(true)}
                            /><PopupModal 
                            size={'sm'}
                            icon={<Icon><FaUserPlus fontSize={"1.5rem"}/></Icon>}
                            title={'Invite Successfully'}
                            subtitle={'Your invite has beeen processed successfully'}
                            dialogClassName={'text-center'}
                            btn1label={'Close'}
                            btn1variant={'outline-primary'}
                            btn2variant={'primary'}
                            btn2label={'Continue'}
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                          />
                          </td>

                         {/* <td><SharedButton
                                label={'Invite'}
                                size={'sm'}
                                variant={'primary'}
                                startIcon={<FiUserPlus/>}
                                onClick={handleClick}
                            /></td>  */}
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}




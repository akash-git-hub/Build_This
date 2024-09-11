import { Image, ListGroup, Stack } from "react-bootstrap"
import styled from "styled-components"

const user = [{ image: '/assets/images/user.svg', name: 'Elmer laverty', message: ' hahaha oh man', msgtime: '12m' },
{ image: '/assets/images/user.svg', name: 'Elmer laverty', message: ' hahaha oh man', msgtime: '12m' },
{ image: '/assets/images/user.svg', name: 'Elmer laverty', message: ' hahaha oh man', msgtime: '12m' },
{ image: '/assets/images/user.svg', name: 'Elmer laverty', message: ' hahaha oh mansadfghjkldsfghjkldfghjk sadfghj', msgtime: '12m' },
{ image: '/assets/images/user.svg', name: 'Elmer laverty', message: ' hahaha oh mansadfghjkldsfghjkldfghjk sadfghj', msgtime: '12m' },
{ image: '/assets/images/user.svg', name: 'Elmer laverty', message: 'Adipisicing officia reprehenderit voluptate dolor occaecat sint cillum occaecat amet Lorem consequat aute laboris enim. Non deserunt officia nulla mollit consectetur deserunt enim. Adipisicing magna dolore consectetur do sint duis ad id pariatur sunt duis.', msgtime: '12m' },
{ image: '/assets/images/user.svg', name: 'Elmer laverty', message: ' hahaha oh man', msgtime: '12m' },
{ image: '/assets/images/user.svg', name: 'Elmer laverty', message: ' hahaha oh man', msgtime: '12m' },
{ image: '/assets/images/user.svg', name: 'Elmer laverty', message: ' hahaha oh man', msgtime: '12m' }
]

const ListBox = styled.div`
max-height:470px;  
overflow-y:auto;
&::-webkit-scrollbar {
  display: none;
}
`;

export const ChatList = () => {

    const handleclick= (index) =>{
        console.log(user[index]);
    }

    return (
        <ListBox>
            <ListGroup variant="flush">
                {user.map((user, index) => {
                    
                    return (

                        <ListGroup.Item onClick={()=>{handleclick(index)}} key={index}>
                            <Stack direction="horizontal" gap={2} style={{ justifyContent: 'space-between' }}>
                                <Stack direction="horizontal" gap={2}>
                                    <Image src={user.image} fluid rounded />
                                    <Stack direction="vertical" gap={0} className="p-1">
                                        <h6 className="mb-0">{user.name}</h6>
                                        <small className="text-secondary text-ellipsis fw-bold " style={{ maxWidth: '160px' }}>{user.message}</small>
                                    </Stack>
                                </Stack>
                                <small className="fw-bold text-secondary">{user.msgtime}</small>
                            </Stack>
                        </ListGroup.Item >

                    )
                })
                }
            </ListGroup>
        </ListBox>
    )
}


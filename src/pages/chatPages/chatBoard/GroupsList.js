
import { Image, Stack } from "react-bootstrap"
 
export const GroupsList = (groups,key) => {
        
    return (
        <Stack direction="horizontal" gap={2} style={{ justifyContent: 'space-between',cursor:'pointer'}} key={key}>
            <Stack direction="horizontal" gap={2} className='mb-2'>
                <Image
                //  src={user?.user?.photoURL}
                  fluid rounded style={{maxWidth:"30px"}}
                 src={groups?.groups?.groupImage ? groups?.groups?.groupImage : '/assets/images/user.svg'}
                  />
                <Stack direction="vertical" gap={0} className="p-1">
                    <h6 className="mb-0">{groups?.groups?.groupName}</h6>
                    {/* <p className="text-secondary text-ellipsis fw-bold mb-0" style={{ maxWidth: '160px' }}>{user?.user?.message}</p> */}
                </Stack>
            </Stack>
            {/* <p className="fw-bold text-secondary">{user?.user?.msgtime}</p> */}
        </Stack>
    )
}
import { Modal, Stack } from "react-bootstrap";
import { Heading } from "./Heading";
import { SharedButton } from "./Button";
import styled from "styled-components";
import { FaUserPlus } from "react-icons/fa6";



export const PopupModal = ({
    show,
    onHide,
    size,
    dialogClassName,
    icon,
    modalTitle,
    title,
    subtitle,
    modalBody,
    btn1label,
    btn2label,
    btn1variant,
    btn2variant
}) => {

    return (
        <Modal
            size={size}
            show={show}
            onHide={onHide}
            backdrop="static"
            dialogClassName={dialogClassName}
            centered
        >
            <Modal.Header className="border-0" closeButton>
            <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                {icon}
                <Heading Heading={title} SubHeading={subtitle} />
                {modalBody}
            </Modal.Body>
            <Modal.Footer className="border-0 d-inline">
                <Stack direction='horizontal' gap={2}>
               { btn1label &&  <SharedButton onClick={onHide} label={btn1label} variant={btn1variant} className={'w-50'} />}
                {btn2label &&  <SharedButton label={btn2label} variant={btn2variant} className={'w-50'} />}
                </Stack>
            </Modal.Footer>
        </Modal>
    )
}
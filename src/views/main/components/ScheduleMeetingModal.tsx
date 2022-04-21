import { Modal } from "react-bootstrap";

export default function ScheduleMeetingModal(props: { showModal: boolean, setshowModal: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <Modal show={props.showModal} onHide={()=>props.setshowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Agendar Reunião</Modal.Title>
      </Modal.Header>
      <Modal.Body>

    

      </Modal.Body>
    </Modal>
  )
}
import { useState } from "react";
import { Button } from "react-bootstrap";
import { FaRegCalendarPlus } from "react-icons/fa";
import ScheduleMeetingModal from "../components/ScheduleMeetingModal";

export default function Home() {

  const [showModal, setshowModal] = useState<boolean>(false);

  return (
    <div className="m-2">
      <div className="d-flex justify-content-end">
        <Button onClick={() => setshowModal(true)}><FaRegCalendarPlus /> Agendar Reunião</Button>
      </div>

      <ScheduleMeetingModal showModal={showModal} setshowModal={setshowModal} />

    </div>
  )
}
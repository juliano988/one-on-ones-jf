import { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Select from 'react-select'
import { UserContext } from "../../../App";

export default function ScheduleMeetingModal(props: { showModal: boolean, setshowModal: React.Dispatch<React.SetStateAction<boolean>> }) {

  const userInfoContext = useContext(UserContext);

  const nowFormFilter = new Date().toISOString().slice(0, 16).replace(/T.{2}/, 'T' + new Date().getHours());

  const [selectedUser, setselectedUser] = useState<{ value: string, label: string } | null>(null);
  const [usersOptions, setusersOptions] = useState<Array<{ value: string, label: string }>>([]);

  const [meetingDate, setmeetingDate] = useState<string>(nowFormFilter);

  const [meetingLocal, setmeetingLocal] = useState<string>('');

  useEffect(function () {

    const fetchOption: RequestInit = {
      headers: new Headers({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'bearer ' + localStorage.getItem('token')
      }),
      method: 'GET',
    }

    fetch((process.env.REACT_APP_API_DOMAIN as string) + '/api/user/all', fetchOption)
      .then(function (res) {
        return res.json();
      }).then(function (data: { users: Array<{ name: string, teamName: string, _id: string }>, message: string }) {

        const formattedUsersOptions = data.users.map(function (user) { return { value: user._id, label: user.name + ' • ' + user.teamName } })
          .filter(function (userOption) { return userOption.value !== userInfoContext.userInfo?._id })

        setusersOptions(formattedUsersOptions);

      })

  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const updatedMeeting = {
      place: meetingLocal,
      date: new Date(meetingDate).toISOString(),
      done: false,
      _id_user: [userInfoContext.userInfo?._id, selectedUser?.value,],
    }

    const fetchOption: RequestInit = {
      headers: new Headers({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'bearer ' + localStorage.getItem('token')
      }),
      method: 'POST',
      body: JSON.stringify(updatedMeeting)
    }

    fetch((process.env.REACT_APP_API_DOMAIN as string) + '/api/meeting', fetchOption)
      .then(function (res) {
        return res.json();
      }).then(function (data) {



      })

  }

  return (
    <Modal show={props.showModal} onHide={() => props.setshowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Agendar Reunião</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Form onSubmit={(e) => handleSubmit(e)}>

          <label>Com quem?</label>
          <Select
            className="mb-2"
            value={selectedUser}
            options={usersOptions}
            onChange={(newValue) => setselectedUser(newValue)} />

          <label>Quando?</label>
          <Form.Control className="mb-2" type="datetime-local" min={nowFormFilter} value={meetingDate} onChange={(e) => setmeetingDate(e.target.value)} />

          <label>Onde?</label>
          <Form.Control className="mb-2" type="text" placeholder="Escritório Principal" value={meetingLocal} onChange={(e) => setmeetingLocal(e.target.value)} />

          <Button className="w-100 mt-2" type="submit">Agendar!</Button>

        </Form>

      </Modal.Body>
    </Modal>
  )
}
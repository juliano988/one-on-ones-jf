import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export default function UpdateUserModal(props: { showUpdateUserModal: boolean, setshowUpdateUserModal: React.Dispatch<React.SetStateAction<boolean>>, selectedUser: any, setforceUpdateTable: React.Dispatch<React.SetStateAction<boolean>> }) {

  const [name, setname] = useState<string>(props.selectedUser?.name);
  const [role, setrole] = useState<string>(props.selectedUser?.role);
  const [teamName, setteamName] = useState<string>(props.selectedUser?.teamName);

  useEffect(function () {
    console.log(props.selectedUser)
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const fetchOption: RequestInit = {
      headers: new Headers({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'bearer ' + localStorage.getItem('token')
      }),
      method: 'PUT',
      body: JSON.stringify({
        _id: props.selectedUser._id,
        name: name,
        teamName: teamName,
        role: role
      })
    }

    fetch((process.env.REACT_APP_API_DOMAIN as string) + '/api/user', fetchOption)
      .then(function (res) {

        props.setshowUpdateUserModal(false);
        props.setforceUpdateTable((oldState) => !oldState);

      })

  }

  return (
    <Modal show={props.showUpdateUserModal} onHide={() => props.setshowUpdateUserModal(!props.showUpdateUserModal)}>
      <Modal.Header closeButton>
        <Modal.Title>Editar {props.selectedUser?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Form className="mb-3" method="POST" onSubmit={(e) => handleSubmit(e)}>

          <Form.Group className="mb-3">
            <Form.Label>Nome:</Form.Label>
            <Form.Control type="text" defaultValue={props.selectedUser?.name} onChange={(e) => setname(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Permissão:</Form.Label>
            <Form.Select defaultValue={props.selectedUser?.role} onChange={(e) => setrole(e.target.value)} required>
              <option value="">Selecione uma opção</option>
              <option value="administrator">Administrador</option>
              <option value="leader">Líder</option>
              <option value="worker">Liderado</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Equipe:</Form.Label>
            <Form.Select defaultValue={props.selectedUser?.teamName} onChange={(e) => setteamName(e.target.value)} required>
              <option value="">Selecione uma opção</option>
              <option value="Financeiro">Financeiro</option>
              <option value="Programação">Programação</option>
              <option value="Marketing">Marketing</option>
            </Form.Select>
          </Form.Group>

          <Button className="w-100 mt-3" variant="primary" type="submit">Editar usuário</Button>

        </Form>

      </Modal.Body>
    </Modal>
  )

}
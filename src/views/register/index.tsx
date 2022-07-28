import { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const navigate = useNavigate();

  const [name, setname] = useState<string>('');
  const [teamName, setteamName] = useState<string>('');
  const [userName, setuserName] = useState<string>('');
  const [password, setpassword] = useState<string>('');
  const [role, setrole] = useState<string>('');

  const [errMessage, seterrMessage] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const fetchOption: RequestInit = {
      headers: new Headers({
        'Content-Type': 'application/json; charset=utf-8',
      }),
      method: 'POST',
      body: JSON.stringify({
        name: name,
        teamName: teamName,
        userName: userName,
        password: password,
        role: role
      })
    }

    fetch((process.env.REACT_APP_API_DOMAIN as string) + '/api/register', fetchOption)
      .then(function (res) {
        return res.json();
      }).then(function (data: { token: string, message: string }) {

        if (data.token) {
          localStorage.setItem('token', data.token);
          navigate('/main')
        } else {
          seterrMessage(data.message)
        }

      })

  }

  return (
    <Container>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <img src="images/dti_logo.png" alt="DTI logo"></img>
        <Form className="mb-3" method="POST" onSubmit={(e) => handleSubmit(e)}>

          <Form.Group>
            <Form.Label>Nome:</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setname(e.target.value)} required />
          </Form.Group>

          <Form.Group>
            <Form.Label>Equipe:</Form.Label>
            <Form.Select value={teamName} onChange={(e) => setteamName(e.target.value)} required>
              <option value="">Selecione uma opção</option>
              <option value="Financeiro">Financeiro</option>
              <option value="Programação">Programação</option>
              <option value="Marketing">Marketing</option>
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Usuário:</Form.Label>
            <Form.Control type="text" value={userName} onChange={(e) => setuserName(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Senha:</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setpassword(e.target.value)} required />
          </Form.Group>

          <Form.Group>
            <Form.Label>Permissão:</Form.Label>
            <Form.Select value={role} onChange={(e) => setrole(e.target.value)} required>
              <option value="">Selecione uma opção</option>
              <option value="admin">Administrador</option>
              <option value="leader">Líder</option>
              <option value="worker">Liderado</option>
            </Form.Select>
          </Form.Group>

          <Button className="w-100 mt-3" variant="primary" type="submit">Criar usuário</Button>
          <Button className="w-100 mt-3" variant="outline-primary" type="button" onClick={()=>navigate('/login')}>Ir para login</Button>

        </Form>
        {errMessage ?
          <Alert variant='danger'>
            {errMessage}
          </Alert> :
          <></>}
      </div>
    </Container>
  )
}
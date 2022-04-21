import { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [userName, setuserName] = useState<string>('');
  const [password, setpassword] = useState<string>('');

  const [errMessage, seterrMessage] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const fetchOption: RequestInit = {
      headers: new Headers({
        'Content-Type': 'application/json; charset=utf-8',
      }),
      method: 'POST',
      body: JSON.stringify({
        userName: userName,
        password: password
      })
    }

    fetch((process.env.REACT_APP_API_DOMAIN as string) + '/api/login', fetchOption)
      .then(function (res) {
        return res.json();
      }).then(function (data: { token: string, message: string }) {

        if (data.token) {
          localStorage.setItem('token', data.token);
          navigate('/main')
        } else {
          setpassword('');
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
            <Form.Label>Usuário:</Form.Label>
            <Form.Control type="text" value={userName} onChange={(e) => setuserName(e.target.value)} required />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Senha:</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setpassword(e.target.value)} required />
          </Form.Group>
          <Button className="mt-3 w-100" variant="primary" type="submit">Entrar!</Button>
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
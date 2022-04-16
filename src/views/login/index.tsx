import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [userName, setuserName] = useState<string>('');
  const [password, setpassword] = useState<string>('');

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
        return res.text();
      }).then(function (data) {

        localStorage.setItem('token', data);

        navigate('/home')

      })

  }

  return (
    <>
      <form method="POST" onSubmit={(e) => handleSubmit(e)}>
        <label>Usuário:</label>
        <input type="text" value={userName} onChange={(e) => setuserName(e.target.value)} />
        <label>Senha:</label>
        <input type="text" value={password} onChange={(e) => setpassword(e.target.value)} />
        <button type="submit">Entrar!</button>
      </form>
    </>
  )
}
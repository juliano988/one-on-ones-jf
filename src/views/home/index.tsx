export default function Home(){

  const fetchOption: RequestInit = {
    headers: new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'bearer ' + localStorage.getItem('token')
    }),
    method: 'GET',
  }

  fetch((process.env.REACT_APP_API_DOMAIN as string) + '/api/teste', fetchOption)
    .then(function (res) {
      return res.text();
    }).then(function (data) {
      
      console.log(data)

    })

  return(
    <>
      Home
    </>
  )
}
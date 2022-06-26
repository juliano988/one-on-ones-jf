import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import Swal from 'sweetalert2'

export default function ExpandedComponent(props: {
  data: { _id: string, _id_user: Array<{ _id: string, name: string, teamName: string, role: string }>, status: string; place: string; date: string; host: string; hostTeamName: string; hostRole: string; person: string; role: string, teamName: string }
}) {

  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const nowFormFilter = `${year}-${month}-${day}T${hours}:${minutes}`;

  const [updatingMeeting, setupdatingMeeting] = useState<boolean>(false);

  function handleClick() {
    setupdatingMeeting(true);

    Swal.fire({
      title: 'Vamos conversar de novo?',
      html:
        `<input type="datetime-local" min="${nowFormFilter}"  value="${nowFormFilter}" id="swal-input1" class="swal2-input">`,
      focusConfirm: false,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, claro!',
      cancelButtonText: 'Não, talvez depois',
    }).then((result) => {
      if (result.isConfirmed) {

        const updatedMeeting = {
          place: props.data.place,
          date: new Date((document.getElementById('swal-input1') as HTMLInputElement).value).toISOString(),
          done: false,
          _id_user: props.data._id_user
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

      }
    }).finally(function () {

      const updatedMeeting = {
        _id: props.data._id,
        done: true
      }

      const fetchOption: RequestInit = {
        headers: new Headers({
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': 'bearer ' + localStorage.getItem('token')
        }),
        method: 'PUT',
        body: JSON.stringify(updatedMeeting)
      }

      fetch((process.env.REACT_APP_API_DOMAIN as string) + '/api/meeting', fetchOption)
        .then(function (res) {
          return res;
        }).then(function (data) {

          window.location.reload();

        })

    })

  }

  return (
    <div className=" m-2 d-flex justify-content-between">
      <div className="w-100">
        <div className="w-100 d-flex justify-content-around">
          <h6>Anfitrião:</h6>
          <span>{props.data.host}</span>
          <span>{props.data.hostTeamName}</span>
          <span>{props.data.hostRole}</span>
        </div>
        <div className="w-100 d-flex justify-content-around">
          <h6>Convidado:</h6>
          <span>{props.data.person}</span>
          <span>{props.data.teamName}</span>
          <span>{props.data.role}</span>
        </div>
      </div>
      <Button
        variant="success"
        type="button"
        disabled={updatingMeeting || props.data.status === '🟢' ? true : false}
        onClick={() => handleClick()}>
        {updatingMeeting ? <Spinner animation="border" size="sm" /> : 'Concluída?'}
      </Button>
    </div>
  )

}

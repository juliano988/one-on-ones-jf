import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";

export default function ExpandedComponent(props: {
  data: { _id: string, status: string; place: string; date: string; host: string; hostTeamName: string; hostRole: string; person: string; role: string, teamName: string }
}) {

  const [updatingMeeting, setupdatingMeeting] = useState<boolean>(false);

  function handleClick() {
    setupdatingMeeting(true);

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

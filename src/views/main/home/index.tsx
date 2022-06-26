import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { FaRegCalendarPlus } from "react-icons/fa";
import ScheduleMeetingModal from "../components/ScheduleMeetingModal";
import ExpandedComponent from "./components/ExpandedComponent";

export default function Home() {

  const [showModal, setshowModal] = useState<boolean>(false);
  const [forceUpdate, setforceUpdate] = useState<boolean>(false);

  const [formattedMeetingTable, setformatedMeetingTable] = useState<Array<{ _id: string, _id_user: Array<{ _id: string, name: string, teamName: string, role: string }>, status: string; place: string; date: string; host: string, hostTeamName: string; hostRole: string; person: string; role: string, teamName: string }>>([]);

  useEffect(function () {

    const fetchOption: RequestInit = {
      headers: new Headers({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'bearer ' + localStorage.getItem('token')
      }),
      method: 'GET',
    }

    fetch((process.env.REACT_APP_API_DOMAIN as string) + '/api/meeting', fetchOption)
      .then(function (res) {
        return res.json();
      }).then(function (data: Array<{ _id: string, date: string, done: boolean, place: string, _id_user: Array<{ _id: string, name: string, teamName: string, role: string }> }>) {

        const tempFormattedMeetingTable: Array<{ _id: string, _id_user: Array<{ _id: string, name: string, teamName: string, role: string }>, status: string; place: string; date: string; host: string; hostTeamName: string; hostRole: string; person: string; role: string, teamName: string }> = [];

        data.forEach(function (meeting) {

          const updatedFormattedMeetingTable = {
            _id: meeting._id,
            _id_user: meeting._id_user,
            status: meeting.done ? '🟢' : !meeting.done && new Date().getTime() >= new Date(meeting.date).getTime() ? '🔴' : '🟠',
            place: meeting.place,
            date: new Date(meeting.date).toLocaleString(),
            host: meeting._id_user[0].name,
            hostTeamName: meeting._id_user[0].teamName,
            hostRole: meeting._id_user[0].role === 'leader' ? 'Líder' : 'Liderado',
            person: meeting._id_user[1].name,
            teamName: meeting._id_user[1].teamName,
            role: meeting._id_user[1].role === 'leader' ? 'Líder' : 'Liderado'
          }
          tempFormattedMeetingTable.push(updatedFormattedMeetingTable);

        })

        setformatedMeetingTable(tempFormattedMeetingTable)

      })

  }, [forceUpdate]);

  const columns = [
    {
      name: 'Status',
      selector: (row: { status: string; place: string; date: string; host: string; person: string; }) => row.status,
    },
    {
      name: 'Lugar',
      selector: (row: { status: string; place: string; date: string; host: string; person: string; }) => row.place,
    },
    {
      name: 'Data',
      selector: (row: { status: string; place: string; date: string; host: string; person: string; }) => row.date,
    },
    {
      name: 'Anfitrião',
      selector: (row: { status: string; place: string; date: string; host: string; person: string; }) => row.host,
    },
    {
      name: 'Convidado',
      selector: (row: { status: string; place: string; date: string; host: string; person: string; }) => row.person,
    },
  ];

  return (
    <>
      <div className="m-2">
        <div className="d-flex justify-content-end mb-2">
          <Button onClick={() => setshowModal(true)}><FaRegCalendarPlus /> Agendar Reunião</Button>
        </div>

        <DataTable
          columns={columns}
          data={formattedMeetingTable}
          expandableRows
          expandOnRowClicked
          expandableRowsComponent={({ data }) => <ExpandedComponent data={data} setforceUpdate={setforceUpdate} />}
        />

      </div>

      <ScheduleMeetingModal showModal={showModal} setshowModal={setshowModal} setforceUpdate={setforceUpdate} />

    </>
  )
}
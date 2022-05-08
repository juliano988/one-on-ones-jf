import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { FaRegCalendarPlus } from "react-icons/fa";
import { isJSDocReturnTag } from "typescript";
import ScheduleMeetingModal from "../components/ScheduleMeetingModal";

export default function Home() {

  const [showModal, setshowModal] = useState<boolean>(false);

  const [formattedMeetingTable, setformatedMeetingTable] = useState<Array<{ status: string; place: string; date: string; person: string; }>>([]);

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
      }).then(function (data: Array<{ _id: string, date: string, done: boolean, place: string, _id_user: Array<{ _id: string, name: string, teamName: string, }> }>) {

        const tempFormattedMeetingTable: Array<{ status: string; place: string; date: string; person: string; }> = [];

        data.forEach(function (meeting) {

          const updatedFormattedMeetingTable = {
            status: meeting.done ? '🟢' : !meeting.done && new Date().getTime() >= new Date(meeting.date).getTime() ? '🔴' : '🟠',
            place: meeting.place,
            date: new Date(meeting.date).toLocaleString(),
            person: meeting._id_user[1].name + ` (${meeting._id_user[1].teamName})`
          }
          tempFormattedMeetingTable.push(updatedFormattedMeetingTable);

        })

        setformatedMeetingTable(tempFormattedMeetingTable)

      })

  }, [showModal]);

  const columns = [
    {
      name: 'Status',
      selector: (row: { status: string; place: string; date: string; person: string; }) => row.status,
    },
    {
      name: 'Lugar',
      selector: (row: { status: string; place: string; date: string; person: string; }) => row.place,
    },
    {
      name: 'Data',
      selector: (row: { status: string; place: string; date: string; person: string; }) => row.date,
    },
    {
      name: 'Pessoa',
      selector: (row: { status: string; place: string; date: string; person: string; }) => row.person,
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
        />

      </div>

      <ScheduleMeetingModal showModal={showModal} setshowModal={setshowModal} />

    </>
  )
}
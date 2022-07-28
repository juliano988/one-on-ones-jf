import { ResponsivePie } from "@nivo/pie";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import CenteredMetric from './components/CenteredMetric'

export default function Statistic() {

  const [formattedMeetingAllChart, setformatedMeetingAllChart] = useState<Array<{ id: string, value: number, color: string }>>([]);
  const [totalAllMeeting, settotalAllMeeting] = useState<number>(0);

  const [formattedMeetingChart, setformattedMeetingChart] = useState<Array<{ id: string, value: number, color: string }>>([]);
  const [totalMeeting, settotalMeeting] = useState<number>(0);

  useEffect(function () {

    const fetchOption: RequestInit = {
      headers: new Headers({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'bearer ' + localStorage.getItem('token')
      }),
      method: 'GET',
    }

    fetch((process.env.REACT_APP_API_DOMAIN as string) + '/api/meeting/all', fetchOption)
      .then(function (res) {
        return res.json();
      }).then(function (data: Array<{ _id: string, date: string, done: boolean, place: string, _id_user: Array<{ _id: string, name: string, teamName: string, role: string }> }>) {

        const countDone = data.filter(function (meeting) { return meeting.done }).length;
        const countLost = data.filter(function (meeting) { return !meeting.done && new Date().getTime() >= new Date(meeting.date).getTime() }).length;
        const countPending = data.length - countDone - countLost;

        const tempformattedMeetingAllChart: Array<{ id: string, value: number, color: string }> = [
          {
            id: 'Realizada',
            value: (countDone / data.length * 100),
            color: 'green'
          },
          {
            id: 'Perdida',
            value: countLost / data.length * 100,
            color: 'red'
          },
          {
            id: 'Pendente',
            value: countPending / data.length * 100,
            color: 'orange'
          }
        ];

        setformatedMeetingAllChart(tempformattedMeetingAllChart);
        settotalAllMeeting(data.length);

      })

  }, []);

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

        const countDone = data.filter(function (meeting) { return meeting.done }).length;
        const countLost = data.filter(function (meeting) { return !meeting.done && new Date().getTime() >= new Date(meeting.date).getTime() }).length;
        const countPending = data.length - countDone - countLost;

        const tempformattedMeetingAllChart: Array<{ id: string, value: number, color: string }> = [
          {
            id: 'Realizada',
            value: (countDone / data.length * 100),
            color: 'green'
          },
          {
            id: 'Perdida',
            value: countLost / data.length * 100,
            color: 'red'
          },
          {
            id: 'Pendente',
            value: countPending / data.length * 100,
            color: 'orange'
          }
        ];

        setformattedMeetingChart(tempformattedMeetingAllChart);
        settotalMeeting(data.length);

      })

  }, []);

  return (
    <>

      <div className="d-flex flex-wrap">

        <Card className="m-2">
          <Card.Body>
            <Card.Title>Desempenho geral</Card.Title>
            <div style={{ height: '300px', width: '300px' }}>
              <ResponsivePie
                data={formattedMeetingAllChart}
                margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                colors={{ datum: 'data.color' }}
                valueFormat={function (value) { return value.toFixed(0) + '%' }}
                innerRadius={0.7}
                activeInnerRadiusOffset={5}
                layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', (data) => CenteredMetric(data, totalAllMeeting)]}
              />
            </div>
          </Card.Body>
        </Card>

        <Card className="m-2">
          <Card.Body>
            <Card.Title>Seu desempenho</Card.Title>
            <div style={{ height: '300px', width: '300px' }}>
              <ResponsivePie
                data={formattedMeetingChart}
                margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                colors={{ datum: 'data.color' }}
                valueFormat={function (value) { return value.toFixed(0) + '%' }}
                innerRadius={0.7}
                activeInnerRadiusOffset={5}
                layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', (data) => CenteredMetric(data, totalMeeting)]}
              />
            </div>
          </Card.Body>
        </Card>

      </div>

    </>
  )
}


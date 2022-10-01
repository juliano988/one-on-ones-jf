import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { FaTrash, FaUserEdit } from "react-icons/fa";
import UpdateUserModal from "./components/UpdateUserModal";

export default function Configurations() {

  const [formattedMeetingTable, setformatedMeetingTable] = useState<Array<{ _id: string, name: string, role: "Líder" | "Funcionário" | "Administrador", teamName: string, edit: any, delete: any }>>([]);

  const [showUpdateUserModal, setshowUpdateUserModal] = useState<boolean>(false);
  const [selectedUser, setselectedUser] = useState<{ _id: string; name: string; role: "leader" | "worker" | "administrator"; teamName: string; } | {}>({})

  const [forceUpdateTable, setforceUpdateTable] = useState<boolean>(false)

  useEffect(function () {

    const fetchOption: RequestInit = {
      headers: new Headers({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'bearer ' + localStorage.getItem('token')
      }),
      method: 'GET',
    }

    fetch((process.env.REACT_APP_API_DOMAIN as string) + '/api/user/all', fetchOption)
      .then(function (res) {
        return res.json();
      }).then(function (data: { users: Array<{ _id: string, name: string, role: "leader" | "worker" | "administrator", teamName: string }>, message: string }) {

        const tempFormattedUserTable: Array<{ _id: string, name: string, role: "Líder" | "Funcionário" | "Administrador", teamName: string, edit: any, delete: any }> = [];

        data.users.forEach(function (user) {

          const updatedFormattedUserTable = {
            _id: user._id,
            name: user.name,
            role: (user.role === "leader" ? "Líder" : user.role === "worker" ? "Funcionário" : "Administrador") as "Líder" | "Funcionário" | "Administrador",
            teamName: user.teamName,
            edit: <span onClick={() => { setselectedUser(user); setshowUpdateUserModal(true) }} ><FaUserEdit /></span>,
            delete: <span><FaTrash /></span>
          }
          tempFormattedUserTable.push(updatedFormattedUserTable);

        })

        setformatedMeetingTable(tempFormattedUserTable)

      })

  }, [forceUpdateTable]);

  const columns = [
    {
      name: 'Nome',
      selector: (row: { name: string; role: string; teamName: string; edit: any; delete: any; }) => row.name,
    },
    {
      name: 'Setor',
      selector: (row: { name: string; role: string; teamName: string; edit: any; delete: any; }) => row.role,
    },
    {
      name: 'Perfil',
      selector: (row: { name: string; role: string; teamName: string; edit: any; delete: any; }) => row.teamName,
    },
    {
      name: 'Editar',
      selector: (row: { name: string; role: string; teamName: string; edit: any; delete: any; }) => row.edit,
    },
    {
      name: 'Excluir',
      selector: (row: { name: string; role: string; teamName: string; edit: any; delete: any; }) => row.delete,
    }
  ];

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>Todos os Usuários</Card.Title>
          <DataTable
            columns={columns}
            data={formattedMeetingTable}
          />
        </Card.Body>
      </Card>

      <UpdateUserModal showUpdateUserModal={showUpdateUserModal} setshowUpdateUserModal={setshowUpdateUserModal} selectedUser={selectedUser} setforceUpdateTable={setforceUpdateTable}/>

    </>
  )
}
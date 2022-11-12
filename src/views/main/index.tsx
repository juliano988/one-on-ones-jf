import { useNavigate } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader } from 'react-pro-sidebar';
import { FaHome, FaUserNinja, FaDoorOpen, FaChartPie, FaToolbox, FaAlignLeft } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import Home from './home';
import Statistic from './statistic';
import Configurations from './configurations';
import { Button } from 'react-bootstrap';

export default function Main(props: { pathName: string }) {

  const userInfoContext = useContext(UserContext);

  const navigate = useNavigate();

  const [toggleSideBar, settoggleSideBar] = useState(true)

  const [userInfo, setuserInfo] = useState<{ _id: string, name: string, teamName: string, role: string } | null>(null);
  const [selectedView, setselectedView] = useState(<Home />)

  useEffect(function () {

    switch (props.pathName) {
      case '/main/home':
        window.history.pushState("", "", window.location.origin + props.pathName);
        setselectedView(<Home />);
        break;
      case '/main/statistic':
        window.history.pushState("", "", window.location.origin + props.pathName);
        setselectedView(<Statistic />);
        break;
      case '/main/configurations':
        window.history.pushState("", "", window.location.origin + props.pathName);
        setselectedView(<Configurations />);
        break;
      default:
        window.history.pushState("", "", window.location.origin + '/main/home');
        setselectedView(<Home />);
        break;
    }

  }, []);

  useEffect(function () {

    const fetchOption: RequestInit = {
      headers: new Headers({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'bearer ' + localStorage.getItem('token')
      }),
      method: 'GET',
    }

    fetch((process.env.REACT_APP_API_DOMAIN as string) + '/api/user', fetchOption)
      .then(function (res) {
        return res.json();
      }).then(function (data: { _id: string, name: string, teamName: string, role: string }) {

        userInfoContext.setuserInfo(data);
        setuserInfo(data);

      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function logOut() {

    localStorage.clear();
    navigate('/login');

  }

  function handleMainNavigation(selectedMainPath: string) {

    switch (selectedMainPath) {
      case 'home':
        setselectedView(<Home />)
        break;
      case 'statistic':
        setselectedView(<Statistic />)
        break;
      case 'configurations':
        setselectedView(<Configurations />)
        break;
      default:
        break;
    }

    window.history.pushState(null, '', '/main/' + selectedMainPath);

  }

  return (
    <div className='d-flex'>
      <ProSidebar className='vh-100' breakPoint="lg" toggled={toggleSideBar} onToggle={(val) => settoggleSideBar(val)}>
        <SidebarHeader>
          <div className='d-flex p-1'>
            <img className='m-auto' src='/images/dti_logo.png' alt='DTI logo'></img>
          </div>
        </SidebarHeader>
        <Menu iconShape="square">
          <SubMenu title={userInfo?.name} icon={<FaUserNinja />}>
            {userInfo?.role === "administrator" ? <MenuItem icon={<FaToolbox />} onClick={() => handleMainNavigation('configurations')}> Configurações</MenuItem> : <></>}
            <MenuItem icon={<FaDoorOpen />} onClick={() => logOut()}> Sair</MenuItem>
          </SubMenu>
          <MenuItem icon={<FaHome />} onClick={() => handleMainNavigation('home')}>Home</MenuItem>
          <MenuItem icon={<FaChartPie />} onClick={() => handleMainNavigation('statistic')}>Estatísticas</MenuItem>
        </Menu>
      </ProSidebar>

      <div className='h-100 w-100 m-2'>
        <div className='mb-2'>{!toggleSideBar ? <Button onClick={() => settoggleSideBar(true)}><FaAlignLeft /></Button> : <></>}</div>
        {selectedView}
      </div>

    </div>
  )
}
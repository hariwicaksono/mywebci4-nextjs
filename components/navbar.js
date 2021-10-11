import React, {Component,useState} from 'react';
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';
import {Container, Navbar, Nav, NavItem, NavDropdown, Form, FormControl, Button, Modal, Badge} from 'react-bootstrap';
import API from '../lib/axios';
import {logout, isLogin, isAdmin} from '../lib/utils';
import {ImagesUrl} from '../lib/urls';
import SearchForm from './searchForm';
import {FaBars, FaSignInAlt, FaSignOutAlt, FaKey,FaUser,FaShoppingCart, FaDatabase} from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import { toast } from 'react-toastify';

class MyNavbar extends Component{
  constructor(props) {
    super(props)
    this.state = {
        Menu: [],
        login:false,
        id: '',
        name: '',
        foto:'',
        email:'',
        user: false,
        admin: false,
        url: ImagesUrl(),
        theme: '',
        loading: true
    }
  }
  Logout = () => {
    logout();
}

componentDidMount = () => {

  if(localStorage.getItem('isAdmin')){
    console.log('ADMIN')
    const data = JSON.parse(localStorage.getItem('isAdmin'))
    const id = data.data.id
    console.log(id)
        API.GetUserId(id).then(res=>{
          var data = res.data
          setTimeout(() => this.setState({
            id: data.id,
            name: data.name,
            email: data.email,
            loading: false,
            login: true
        }));
    })
  } else if(localStorage.getItem('isLogin')){
    console.log('USER')
    this.setState({
      login : true
    })
  } else {
      console.log('ORA LOGIN')
      this.setState({
          login : false
      })
  }
  
  API.GetMenu().then(res => {
    setTimeout(() => this.setState({
          Menu: res.data,
          loading: false,
      }), 100);
  })

  API.GetSetting().then(res=>{
      this.setState({
        theme: res.data.theme,
      })
})

//if (isAdmin()) {
  //return( Router.push('/admin') )
//}

  }

  render(){
   const {Menu} = this.state;
    const ListMenu = Menu.map((m, i) => (
        <li key={i}><Link href={m.url} passHref><a className="nav-link"> {m.menu} </a></Link></li>  
    ))
    return(  
      <>   
    <Navbar sticky="top" bg="primary" variant="dark" className="shadow py-3" expand="md" >
    <Container fluid>

      <Link href="/" passHref><Navbar.Brand className="fw-bold">{this.props.setting.company}</Navbar.Brand></Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="sub-menu-bar">
        <ul className="navbar-nav me-auto">
        { this.state.loading ?<><Skeleton width={180} height={25} /></>:<>{ListMenu}</>}
        </ul>

        <SearchForm/>

        {this.state.login === false ?
    <>
     <Link href="/login" passHref><Button className="btn text-light"><FaSignInAlt size="1.25em" /> Login</Button></Link>
    </>
    :
    <>
    <ul id="nav" className="navbar-nav">
    {/*<NavDropdown title=
    {this.state.foto ? (
    <>
    <img
        alt="Foto"
        width="30"
        className="rounded-circle"
        src={this.state.url+this.state.foto} /> {this.state.email}
    </>
        ) : (
    <>
    <img
        alt="Foto"
        width="30"
        className="rounded-circle"
        src={this.state.url+'no-avatar.png'} /> {this.state.email}
    </>
        )} id="basic-nav-dropdown" align="end"> */}
    <NavDropdown title={<><FaUser size="1.25em"/> {this.state.email}</>} id="basic-nav-dropdown" align="end"> 
    <NavDropdown.Item>{this.state.email}</NavDropdown.Item>
    <Link href="/admin" passHref><NavDropdown.Item><FaDatabase/> Dashboard</NavDropdown.Item></Link>
    <Link href="/admin/password" passHref><NavDropdown.Item><FaKey/> Ganti Password</NavDropdown.Item></Link>
    <NavDropdown.Item onClick={this.Logout} href=''><FaSignOutAlt/> Logout</NavDropdown.Item>
    </NavDropdown>
    </ul>
    </>
    }
        
      </Navbar.Collapse>
      </Container>
    </Navbar> 
    </>
    );
  }
}

export default MyNavbar;
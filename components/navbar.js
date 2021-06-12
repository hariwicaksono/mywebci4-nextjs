import React, {Component} from 'react';
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';
import {Container, Navbar, Nav, NavItem, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import API from '../libs/axios';
import {logout, isLogin, isAdmin} from '../libs/utils';
import {ImagesUrl} from '../libs/urls';
import SearchForm from './searchForm';
import {FaBars, FaSignInAlt, FaSignOutAlt, FaKey} from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';

class MyNavbar extends Component{
  constructor(props) {
    super(props)
    this.state = {
        Menu: [],
        loading: true
    }
  }


componentDidMount = () => {
  if (localStorage.getItem('isAdmin')) {
    return( Router.push('/admin') )
  }
  if (isLogin()) {
      const data = JSON.parse(localStorage.getItem('isLogin'))
      const id = data[0].email
      API.GetUserId(id).then(res=>{
        setTimeout(() => this.setState({
              id : res.data[0].id,
              name: res.data[0].name,
              email: res.data[0].email,
              loading: false,
          }), 100);
      })
          
  } 
  else {
    this.setState({
          loading: false
      })
  }

  API.GetMenu().then(res => {
      this.setState({
          Menu: res.data
      })
  })
  
  }

  render(){
    const {Menu, loading} = this.state;
    const ListMenu = Menu.map((m, i) => (
        <li key={i}><Link href={m.url} passHref><a className="nav-link">{m.menu}</a></Link></li>  
    ))
    return(  
      <>   
    <Navbar sticky="top" bg="light" className="shadow-sm border-bottom py-2" expand="md" >
    <Container>

      <Link href="/" passHref><Navbar.Brand>{ loading ?<><Skeleton width={180} height={25} /></>:<>{this.props.setting.company}</>}</Navbar.Brand></Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="sub-menu-bar">
        <ul className="navbar-nav me-auto">
        {ListMenu}
          {/*<NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <Link href="#" passHref><NavDropdown.Item>Action</NavDropdown.Item></Link>
            <Link href="#" passHref><NavDropdown.Item>Another action</NavDropdown.Item></Link>
            <Link href="#" passHref><NavDropdown.Item>Something</NavDropdown.Item></Link>
            <NavDropdown.Divider />
            <Link href="#" passHref><NavDropdown.Item>Separated link</NavDropdown.Item></Link>
    </NavDropdown>*/}
        </ul>

        <SearchForm/>
        
        <Form inline>
        <Link href="/login" passHref><Button variant="primary"><FaSignInAlt/> Login</Button></Link>
        </Form>
        
      </Navbar.Collapse>
      </Container>
    </Navbar> 
    </>
    );
  }
}

export default MyNavbar;
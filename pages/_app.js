import React, { Component } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';
import 'spin.js/spin.css';
import '@morteza-jamali/lineicons/WebFont/font-css/LineIcons.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import API from '../libs/axios';


class MyApp extends Component {
  constructor(props){
    super(props)
    this.state = {
      Pengaturan: [],
      cartCount: 0
        }
    }

 

  componentDidMount = () => {
    AOS.init();

    const cartData = JSON.parse(localStorage.getItem('cartItem'));
    const cartCount = cartData && cartData.length ? cartData.length : 0;
    this.setState({cartCount: cartCount});

    API.GetSetting().then(res=>{
      this.setState({
          Pengaturan: res.data[0]
      })
    })
  }

  render() {
    const { Component, pageProps } = this.props;

    let that = this;
        const cartCount = (cartCount) => {
            that.setState({cartCount: cartCount})
        }
    return (   
    <>
    <Component {...pageProps} setting={this.state.Pengaturan} totalCnt={cartCount} />
    <ToastContainer />
    </>
    );
  }
}

export default MyApp;

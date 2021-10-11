import React, { Component } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';
import Layout, { siteName, siteTitle } from '../components/layout';
import { Container, Card, Row, Col, Spinner, Button, Form, FloatingLabel } from 'react-bootstrap';
import API from '../lib/axios';
import { ImagesUrl } from '../lib/urls';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup.string().email(),
  password: yup.string()
});

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formLoginKeys: [],
      invalid: false,
      emailInvalid: '',
      passwordInvalid: '',
    }

  }
  componentDidMount = () => {
    if (localStorage.getItem('isAdmin')) {
      return (Router.push('/admin'))
    }
  }
  render() {
    const { invalid, emailInvalid, passwordInvalid } = this.state;
    return (
      <Layout login>
        <Head>
          <title>Login - {siteTitle}</title>
        </Head>

        <div className="modal modal-signin position-static d-block py-3" tabIndex="-1" role="dialog" id="modalSignin">
          <div className="modal-dialog" role="document">
            <div className="modal-content rounded-4 shadow">
              <div className="modal-header p-5 pb-3 border-bottom-0"><h2 className="fw-bold mb-0">Login</h2></div>
              <div className="modal-body p-5 pt-0 mb-0">
                <Formik
                  initialValues={{ email: '', password: '' }}
                  onSubmit={(values, actions) => {
                    //alert(JSON.stringify(values));
                    API.PostLogin(values).then(res => {
                      var data = res.data;
                      //console.log(data)
                      if (data.status == true) {
                        if (data.isadmin == true) {
                          localStorage.setItem('isAdmin', JSON.stringify(data))
                          toast.success(data.message, { position: "top-center" });
                          setTimeout(() => window.location.reload(), 1000);
                        } else {
                          localStorage.setItem('isLogin', JSON.stringify(data))
                          toast.success(data.message, { position: "top-center" });
                          setTimeout(() => window.location.reload(), 1000);
                        }
                      } else {
                        this.setState({
                          invalid: true,
                          emailInvalid: data.email,
                          passwordInvalid: data.password,
                        })
                        //toast.error(data.message, {position: "top-center"}); 
                      }
                    })
                    setTimeout(() => {
                      actions.setSubmitting(false);
                    }, 1000);
                  }}
                  validationSchema={validationSchema}
                >
                  {({ handleSubmit, handleChange, handleBlur, values, touched, errors, isSubmitting }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                      <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                        <Form.Control type="text" name="email" placeholder="your@email.com" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.email} isInvalid={!!invalid && !!emailInvalid} />
                        {invalid && <Form.Control.Feedback type="invalid">{emailInvalid}</Form.Control.Feedback>}
                      </FloatingLabel>
                      <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                        <Form.Control type="password" name="password" placeholder="Password" className="form-control" onChange={handleChange} onBlur={handleBlur} isInvalid={!!invalid && !!passwordInvalid} />
                        {invalid && <Form.Control.Feedback type="invalid">{passwordInvalid}</Form.Control.Feedback>}
                      </FloatingLabel>
                      <div className="d-grid">
                        <Button variant="primary" type="submit" disabled={isSubmitting} className="mb-3">
                          {isSubmitting ? (
                            <>
                              <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> Memuat...
                            </>
                          ) : (
                            <>Masuk</>
                          )}
                        </Button>
                      </div>
                      {/*<div className="text-center pt-3 pb-4">
                      <a href="auth-recovery-username.html" className="link">Daftar akun</a> <span className="mx-2">·</span> <a href="auth-recovery-password.html" className="link">Lupa Password?</a>
                    </div>*/}
                    </Form>

                  )}
                </Formik>
                <Link href="/"><a>← Kembali ke home</a></Link>
              </div>
            </div>

          </div>
        </div>

      </Layout>
    );
  }
}

export default Login;

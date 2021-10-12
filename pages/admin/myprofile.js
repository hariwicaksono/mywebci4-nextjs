import React, { Component } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { isLogin, isAdmin } from '../../lib/utils';
import Layout, { siteName, siteTitle } from '../../components/layout';
import API from '../../lib/axios';
import { toast } from 'react-toastify';
import { Container, Breadcrumb, Card, Row, Col, Spinner, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import Skeleton from 'react-loading-skeleton';
import { FaSave } from 'react-icons/fa';

const validationSchema = yup.object({
    //name: yup.string().required('Field harus diisi'),
    //email: yup.string().required('Field harus diisi')
});
class MyProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            name: '',
            email: '',
            loading: true
        }

    }

    componentDidMount = () => {
        const datas = JSON.parse(localStorage.getItem('isAdmin'))
        const id = datas.data.id
        API.GetUserId(id).then(res => {
            var data = res.data
            setTimeout(() => this.setState({
                id: data.data.id,
                name: data.data.name,
                email: data.data.email,
                loading: false
            }));
        })
    }

    render() {
        return (
            <Layout admin>
                <Head>
                    <title>Profil Saya - {siteTitle}</title>
                </Head>
                <Container className="my-3" fluid>
                    <Breadcrumb className="mb-2">
                        <Breadcrumb.Item>Admin</Breadcrumb.Item>
                        <Breadcrumb.Item active>Profil Saya</Breadcrumb.Item>
                    </Breadcrumb>
                    <Row>

                        <Col>

                            <Card body>
                                <h3 className="mb-3">Profil Saya</h3>
                                {this.state.loading ?
                                    <>
                                        <Skeleton count={4} height={40} className="mb-1" />
                                        <Skeleton width={100} height={40} />
                                    </>
                                    :
                                    <Formik
                                        initialValues={{
                                            id: this.state.id,
                                            name: this.state.name,
                                            email: this.state.email
                                        }}
                                        onSubmit={(values, actions) => {
                                            //alert(JSON.stringify(values));

                                            API.PutUser(values).then(res => {
                                                //console.log(res)
                                                var data = res.data;
                                                if (data.status == true) {
                                                    toast.success(data.message, { position: "top-center" });
                                                } else {
                                                    toast.warn(data.message, { position: "top-center" });
                                                }

                                            }).catch(err => {
                                                console.log(err.response)
                                                toast.warn("Tidak ada data yang diubah", { position: "top-center" });
                                            })

                                            setTimeout(() => {
                                                actions.setSubmitting(false);
                                            }, 1000);
                                        }}
                                    >
                                        {({
                                            handleSubmit,
                                            handleChange,
                                            handleBlur,
                                            values,
                                            touched,
                                            errors,
                                            isSubmitting
                                        }) => (
                                            <Form noValidate onSubmit={handleSubmit}>

                                                <Form.Group className="mb-3">
                                                    <Form.Label>Nama Lengkap*</Form.Label>
                                                    <Form.Control type="text" name="name" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.name} isInvalid={!!errors.name && touched.name} />
                                                    {errors.name && touched.name && <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>}
                                                </Form.Group>

                                                <Form.Group className="mb-3">
                                                    <Form.Label>Email *</Form.Label>
                                                    <Form.Control type="text" name="email" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.email} isInvalid={!!errors.email && touched.email} />
                                                    {errors.email && touched.email && <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>}
                                                </Form.Group>

                                                <Button variant="primary" type="submit" disabled={isSubmitting}>{isSubmitting ? (
                                                    <>
                                                        <Spinner
                                                            as="span"
                                                            animation="grow"
                                                            size="sm"
                                                            role="status"
                                                            aria-hidden="true"
                                                        /> Memuat...
                                                    </>
                                                ) : (<><FaSave /> Simpan</>)}</Button>

                                            </Form>
                                        )}
                                    </Formik>
                                }
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Layout>
        )
    }
}

export default MyProfile;
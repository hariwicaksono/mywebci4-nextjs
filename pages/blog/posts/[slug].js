import React, { Component } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../../../components/layout";
import API from "../../../lib/axios";
import { ImagesUrl } from "../../../lib/urls";
import { Container, Row, Col, Card } from "react-bootstrap";
import {} from "react-icons/md";
import parse from "html-react-parser";
import Skeleton from "react-loading-skeleton";
import FormComment from "../../../components/postComment";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      body: "",
      image: "",
      date: "",
      category: "",
      user: "",
      Comments: [],
      allCategory: [],
      url: ImagesUrl(),
      loading: true,
    };
  }
  static async getInitialProps({ query }) {
    const id = query.slug;
    return {
      id: id,
    };
  }

  componentDidMount = () => {
    const id = this.props.id;
    this.setState({
      post_id: id,
    });
    API.GetBlogId(id).then((res) => {
      //console.log(res);
      var data = res.data;
      setTimeout(
        () =>
          this.setState({
            id: data.data[0].id,
            title: data.data[0].title,
            slug: data.data[0].slug,
            body: data.data[0].body,
            image: data.data[0].post_image,
            date: data.data[0].created_at,
            category: data.data[0].category,
            user: data.data[0].user,
            loading: false,
          }),
        100
      );
    });
    API.GetCommentId(id)
      .then((res) => {
        var data = res.data;
        if (data.length > 0) {
          this.setState({
            Comments: data.data,
          });
        } else {
          this.setState({
            error: data.message,
          });
        }
        API.GetCategory().then((res) => {
          //console.log(res);
          var data = res.data;
          this.setState({
            allCategory: data.data,
          });
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  render() {
    const { id, title, body, image, date, category, user, url } = this.state;
    const ListComment = this.state.Comments.map((c, i) => (
      <Card className="mb-1" key={i} body>
        <h6 className="mb-0">
          {c.body} [by <strong>{c.name}</strong>]
        </h6>
      </Card>
    ));
    const ListCategory = this.state.allCategory.map((ct, i) => (
      <Link href={"/tag/" + ct.name} key={i} passHref>
        <a className="badge bg-secondary text-light me-2">{ct.name}</a>
      </Link>
    ));
    return (
      <Layout>
        <Head>
          <title>
            {title} - {siteTitle}
          </title>
        </Head>

        <main className="blog-section py-3">
          <Container>
            <Row>
              {this.state.loading ? (
                <>
                  <Skeleton count={4} height={40} className="mb-1" />
                  <Skeleton width={100} height={40} />
                </>
              ) : (
                <>
                  <div>
                    <h1 className="fw-bold">{title}</h1>
                  </div>
                  <hr />
                  <Col md={8}>
                    <div className="single-blog blog-style-2">
                      <div className="blog-img blog-img-2 mb-1">{image && <img src={url + image} className="img-fluid" alt={"gambar_" + title} />}</div>
                      <p className="mb-3">
                        Tanggal: {date} - Kategori:{" "}
                        <Link href={"/tag/" + category} passHref>
                          {category}
                        </Link>{" "}
                        - Penulis: {user}
                      </p>
                      <div className="blog-content">{parse(body)}</div>
                    </div>
                    <hr />

                    <h3>Komentar</h3>
                    {ListComment}
                    <hr />
                    <FormComment postID={id} />
                  </Col>

                  <Col md={4}>
                    <div className="sidebar-box catagories-box mb-3">
                      <h4>Kategori</h4>
                      {ListCategory}
                    </div>
                  </Col>
                </>
              )}
            </Row>
          </Container>
        </main>
      </Layout>
    );
  }
}

export default Detail;

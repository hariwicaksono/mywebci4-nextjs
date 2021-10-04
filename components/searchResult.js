import React, { useState } from "react";
import Link from "next/link";
//import {X} from 'react-bootstrap-icons'

const SearchResults = (props) => {
  const options = props.data.map((item, key) => (
    <div key={key}>
      <h6>
        <Link href={"/blog/posts/" + item.slug} passHref>
          <a>{item.title}</a>
        </Link>
      </h6>
    </div>
  ));

  const [show, setShow] = useState(true);

  if (show) {
    return (
      <div id="searchResult" className="col-md-3" style={{ paddingLeft: 0 }}>
        <div className="card card-body" style={{ maxHeight: "250px", overflowY: "auto" }}>
          <div className="d-flex justify-content-end">
            <a href="/#/" className="text-dark" >
              X
            </a>
          </div>
          {options}
        </div>
      </div>
    );
  }
  return true;
};

export default SearchResults;

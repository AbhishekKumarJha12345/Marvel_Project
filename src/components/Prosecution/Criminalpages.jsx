import React, { useState } from "react";
import { Navbar, Container, Tab, Tabs } from "react-bootstrap";
// import Prosecution from "./criminal/Prosecution";
import Prosecution from "./Prosecution";

import Home from "./Home";
import Carousel from "./Carousel";


import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css'; // Import custom CSS for additional styling



const CriminalPages = () => {
  const [key, setKey] = useState("home");

  return (
    <div>
      <Navbar variant="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Criminal Management</Navbar.Brand>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
          fill
        >
          <Tab eventKey="home" title="Home">
            <Home />
          </Tab>
          <Tab eventKey="prosecution" title="Prosecution">
            <Prosecution />
          </Tab>
          <Tab eventKey="carousal" title="Carousal">
            <Carousel />
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default CriminalPages;

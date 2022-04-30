import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Nav, Navbar, NavDropdown, ThemeProvider} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import GitForm from './GitForm';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import UserInfo from "./UserInfo";

function App() {
  return (
      <Router>
          <div className="App">
              <ThemeProvider
                  breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
              >
                  <Navbar bg="light" expand="lg">
                      <Container>
                          <Navbar.Brand href="#home">Travahos</Navbar.Brand>
                          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                          <Navbar.Collapse id="basic-navbar-nav">
                              <Nav className="me-auto">
                                  <Nav.Link href="#home">Home</Nav.Link>
                                  <Nav.Link href="#link">Link</Nav.Link>
                                  <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                      <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                      <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                      <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                      <NavDropdown.Divider/>
                                      <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                  </NavDropdown>
                              </Nav>
                          </Navbar.Collapse>
                      </Container>
                  </Navbar>

                  <Container>
                      <Routes>
                          <Route path="/" element={<GitForm/>}/>
                          <Route path="/redirect" element={<UserInfo/>}/>
                      </Routes>
                  </Container>

              </ThemeProvider>
          </div>
      </Router>
  );
}

export default App;

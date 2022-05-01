import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Image, Nav, Navbar, NavDropdown, ThemeProvider} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import GitForm from './GitForm';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import UserInfo from "./UserInfo";
import logo from './Images/beeLogo.png';

function App() {
  return (
      <Router>
          <div className="App">
              <ThemeProvider
                  breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
              >
                  <Navbar variant="dark" bg="dark" expand="lg">
                      <Container>
                          <Navbar.Brand href="/">
                              <Image height={40} src={logo} style={{position: 'relative', bottom: '5px'}} alt="Home page"/> GitJobs
                          </Navbar.Brand>
                      </Container>
                  </Navbar>

                  <Routes>
                      <Route path="/" element={<GitForm/>}/>
                      <Route
                          path="/redirect"
                          element={<Container className="user-info-container"><UserInfo/></Container>}
                      />
                  </Routes>

              </ThemeProvider>
          </div>
      </Router>
  );
}

export default App;

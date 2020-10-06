import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../screens/home/";
import Users from "./users";
import { useAuthContext } from "../contexts/authContext";
import Login from "../screens/auths/login";
import AuthorizedRoute from "../hocs/AuthorizedRoute";
import { logoutAction } from "../actions/authActions";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Routes() {
    const [authState, authDispatch] = useAuthContext();

    const handleLogout = () => {
        authDispatch(logoutAction());
    };

    return (
        <Router>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <NavDropdown title="Users" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/users">List</NavDropdown.Item>
                            <NavDropdown.Item href="/users/create">Create</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                            <Button variant="outline-info">Search</Button>
                        </Form>

                        {authState?.accessToken ? (
                            <>
                                <Nav.Link inline className="mr-sm-2">
                                    <span>Hi, {authState?.user?.userName ?? "guy"}</span>
                                </Nav.Link>
                                <Nav.Link inline className="mr-sm-2">
                                    <Button variant="outline-success" id="btn-logout" onClick={handleLogout}>Logout</Button>
                                </Nav.Link>
                            </>
                        ) : (
                            <Nav.Link inline href="/login" className="mr-sm-2">
                                <Button variant="outline-success">Login</Button>
                            </Nav.Link>
                        )}


                </Navbar>

            <div>

                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <AuthorizedRoute path="/users">
                        <Users />
                    </AuthorizedRoute>
                </Switch>
            </div>
        </Router>
    );
}
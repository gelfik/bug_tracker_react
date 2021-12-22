import React from "react";
import {Link, withRouter} from "react-router-dom";
import {inject, observer} from "mobx-react";

import {Button, Container, Nav, Navbar} from "react-bootstrap";


const Header = inject("userStore", "modalStore")(observer((stores) => {
    const {userStore, modalStore} = stores;

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to='/'>BugTracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav" className={'justify-content-end NavContentEnd'}>
                    <Nav className="me-auto">
                        {userStore.userAuthStatus && <>
                            <Button variant='outline-secondary' onClick={modalStore.LoginModalShow} type='button' size='sm' className={'me-3'}>
                                <svg aria-hidden="true" height="16" width="16" >
                                    <use xlinkHref={'#icon-plus'}/>
                                </svg> Добавить подсистему
                            </Button>
                            <Nav.Link as={Link} to={"/logout"}>
                                Выйти
                            </Nav.Link>
                        </>}
                        {!userStore.userAuthStatus &&
                        <div className={"nav-link pointer"} onClick={modalStore.LoginModalShow}>Войти</div>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}));
export default withRouter(Header);

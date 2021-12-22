import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {inject, observer} from "mobx-react";
import MainPage from "../../pages";
import Page404 from "../../pages/404";
import LogoutPage from "../../pages/Logout";
import Header from "../../components/Header";
import Spinner from "../../components/Spinner";
import Footer from "../../components/Footer";
import RootModal from "../../components/Modals";
import SVG from "../../components/SVG";
import SystemPage from "../../pages/System";


const PageService = inject('userStore')(observer((store) => {
        const {userStore} = store
        if (userStore.firstSpinnerStore.spinnerStatus) {
            return <Spinner/>
        }
        return (
            <Router>
                <Header/>
                <Switch>
                    <Route path='/' component={MainPage} exact/>

                    <Route path='/system:systemID' exact
                           render={() => !userStore.userAuthStatus ? <Redirect to='/'/> : <SystemPage/>}/>
                    <Route path='/logout'
                           render={() => !userStore.userAuthStatus ? <Redirect to='/'/> : <LogoutPage/>}
                           exact/>
                    <Route component={Page404}/>
                </Switch>
                <Footer/>
                <SVG/>
                <RootModal/>
            </Router>
        )
    }
))

export default PageService;
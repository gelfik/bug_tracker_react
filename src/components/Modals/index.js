import React from "react";
import {inject, observer} from "mobx-react";
import RegisterModal from "../Modals/RegisterModal";
import LoginModal from "../Modals/LoginModal";
import SubSystemAddModal from "./SubSystemAddModal";
import SubSystemDeleteModal from "./SubSystemDeleteModal";
import ModuleAddModal from "./ModuleAddModal";
import ModuleDeleteModal from "./ModuleDeleteModal";

const RootModal = inject('userStore')(observer((stores) => {
    const {userStore} = stores
    return (<>
        {!userStore.userAuthStatus && <>
            <LoginModal/>
            <RegisterModal/>
        </>
        }
        {userStore.userAuthStatus && <>
            <SubSystemAddModal/>
            <SubSystemDeleteModal/>
            <ModuleAddModal/>
            <ModuleDeleteModal/>
        </>}
    </>)
}))

export default RootModal;
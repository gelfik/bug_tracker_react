import React from "react";
import {inject, observer} from "mobx-react";
import RegisterModal from "../Modals/RegisterModal";
import LoginModal from "../Modals/LoginModal";

const RootModal = inject('userStore')(observer((stores) => {
    const {userStore} = stores
    return (<>
        {!userStore.userAuthStatus && <>
            <LoginModal/>
            <RegisterModal/>
        </>
        }
        {userStore.userAuthStatus && <>

        </>}
    </>)
}))

export default RootModal;
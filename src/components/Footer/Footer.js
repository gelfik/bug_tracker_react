import React from "react";
import {inject, observer} from "mobx-react";

const Footer = inject('userStore')(observer((props) => {
    return (<footer className="footer">
    </footer>)
}))

export default Footer;
import React from "react";
import {inject, observer} from "mobx-react";
import {Container} from "react-bootstrap";

const Page404 = inject('userStore')(observer((props) => {
    return (
        <Container>
            <main className={'mt-3'}>
                <div className="display-3 fw-bold pb-3">404: Страница не найдена!</div>
            </main>
        </Container>
    )
}))

export default Page404;
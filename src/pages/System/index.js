import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import {Col, Container, FloatingLabel, Row, Form} from "react-bootstrap";
import {useHistory, useParams} from "react-router-dom";
import SystemBlock from "./components/SystemBlock";
import ModuleBlock from "./components/ModuleBlock";

const SystemPage = inject('userStore', 'modalStore', 'systemStore')(observer((stores) => {
    const { systemStore} = stores;
    const history = useHistory();
    const queryParams = useParams()
    
    useEffect(() => {
        if (systemStore.load.status) {
            systemStore.load.setStatus(false)
            systemStore.filters.clearFilter()
            history.push(`/`)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [systemStore.load.status])
    
    useEffect(() => {
        systemStore.setSystemID(queryParams.systemID)
        systemStore.loadSystemData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [systemStore.filters.filter])


    return (
        <Container>
            <main className={'mt-3'}>
                <Row>
                    <Col md={12}>
                        <div className={'p-3 bg-light rounded-3'}>
                            <FloatingLabel className={'mb-3'} controlId="floatingInputGrid" label="Поиск">
                                <Form.Control size="sm" type="text" placeholder="Поиск" onChange={e => {
                                    systemStore.filters.setFilter('search', e.target.value)
                                }}/>
                            </FloatingLabel>
                            {/*<FloatingLabel controlId="floatingSelect" label="Модуль">*/}
                            {/*    <Form.Select size="sm" aria-label="Модуль" onChange={e => {*/}
                            {/*        systemStore.filters.setFilter('module', e.target.value)*/}
                            {/*    }}>*/}
                            {/*        <option value={'Любой модуль'}>Любой модуль</option>*/}
                            {/*        {getOptionProducts()}*/}
                            {/*    </Form.Select>*/}
                            {/*</FloatingLabel>*/}
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className={'p-3 bg-light rounded-3'}>
                            <SystemBlock/>
                            <hr/>
                            <ModuleBlock/>
                        </div>
                    </Col>
                </Row>
            </main>
        </Container>
    )
}))

export default SystemPage;
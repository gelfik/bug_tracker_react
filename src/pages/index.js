import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import {Col, Container, FloatingLabel, Row, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import {getStatusValid} from "../utils/StatusNameService";

const MainPage = inject('userStore', 'modalStore', 'systemListStore', 'dictionaryStore')(observer((stores) => {
    const {userStore, modalStore, systemListStore, dictionaryStore} = stores;

    useEffect(() => {
        if (userStore.userAuthStatus) {
            systemListStore.loadSystemList()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [systemListStore.filters.filter, userStore.userAuthStatus])

    useEffect(() => {
        if (userStore.userAuthStatus) {
            dictionaryStore.loadAllList()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getOptionProducts = () => {
        return dictionaryStore?.productList?.map((item, i) => <option key={i} value={item.title}>{item.title}</option>)
    }

    const getSystems = () => {
        if (systemListStore?.systemList.length > 0) {
            return systemListStore?.systemList?.map((item, i) =>
                <div key={i}>
                    {i !== 0 && <hr/>}
                    <Link to={`/system${item.id}`} className={'System'}>
                        <p className={'Title'}>{item?.product?.title} | {item.title}</p>
                        <p className={'Status'}>Статус: <span
                            className={getStatusValid(item?.status_type?.key)}>{item?.status_type?.title}</span></p>
                    </Link>
                </div>
            )
        } else {
            return <div className={'System'}><p className={'Title'}>Подсистемы не найдены!</p></div>
        }
    }

    return (
        <Container>
            <main className={'mt-3'}>
                {!userStore.userAuthStatus && <div className="display-5 fw-bold pb-3">
                    Для пользованиея системой, пройдите авторизацию!
                    <span onClick={() => modalStore.open('login')} className={'pointer text-danger'}> Войти</span>
                </div>}
                {userStore.userAuthStatus &&
                <Row>
                    <Col md={3}>
                        <div className={'p-3 bg-light rounded-3'}>
                            <FloatingLabel className={'mb-3'} controlId="floatingInputGrid" label="Поиск">
                                <Form.Control size="sm" type="text" placeholder="Поиск" onChange={e => {
                                    systemListStore.filters.setFilter('search', e.target.value)
                                }}/>
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingSelect" label="Продукт">
                                <Form.Select size="sm" aria-label="Продукт" onChange={e => {
                                    systemListStore.filters.setFilter('product', e.target.value)
                                }}>
                                    <option value={'Любой продукт'}>Любой продукт</option>
                                    {getOptionProducts()}
                                </Form.Select>
                            </FloatingLabel>
                        </div>
                    </Col>
                    <Col md={9}>
                        <div className={'p-3 bg-light rounded-3'}>
                            {getSystems()}
                        </div>
                    </Col>
                </Row>}

            </main>
        </Container>
    )
}))

export default MainPage;

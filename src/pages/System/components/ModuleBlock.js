import React from "react";
import {inject, observer} from "mobx-react";
import {Col, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {getStatusValid} from "../../../utils/StatusNameService";
import BugBlock from "./BugBlock";

const ModuleBlock = inject('userStore', 'systemStore', 'modalStore')(observer((store) => {
    const {systemStore} = store

    const getModules = () => {
        if (systemStore.systemData?.modules?.length > 0) {
            return systemStore.systemData?.modules?.map((item, i) =>
                <div key={i}>
                    <hr/>
                    <Row>
                        <Col md={11} xs={10}>
                            <h4>{item.title}</h4>
                        </Col>
                        <Col md={1} xs={2} className={'FlexStartEnd'}>
                            <OverlayTrigger key='bottom' placement='bottom' overlay={
                                <Tooltip id={`tooltip-edit-system`}>
                                    Редактировать модуль
                                </Tooltip>
                            }>
                                <svg width="24" height="24">*/}
                                    <use xlinkHref={'#icon-pencil'}/>
                                </svg>
                            </OverlayTrigger>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}>
                            <p><strong>Статус:</strong></p>
                        </Col>
                        <Col md={10}>
                            <p className={getStatusValid(item?.status_type?.key)}>{item?.status_type?.title}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}>
                            <p><strong>Описание:</strong></p>
                        </Col>
                        <Col md={10}>
                            <p>{item?.description?.length ? item?.description : '-'}</p>
                        </Col>
                    </Row>
                    <BugBlock bugs={item?.bugs}/>
                </div>
            )
        } else {
            return <div className={'System'}><p className={'Title'}>Модули не найдены или еще не добавлены!</p></div>
        }
    }

    return (
        <>
            <Row className={'mt-5'}>
                <Col md={11} xs={10}>
                    <h3>Модули</h3>
                </Col>
                <Col md={1} xs={2} className={'FlexStartEnd'}>
                    <OverlayTrigger key='bottom' placement='bottom' overlay={
                        <Tooltip id={`tooltip-edit-system`}>
                            Добавить модуль
                        </Tooltip>
                    }>
                        <svg width="24" height="24">*/}
                            <use xlinkHref={'#icon-plus'}/>
                        </svg>
                    </OverlayTrigger>
                </Col>
            </Row>
            {getModules()}
        </>
    )
}))

export default ModuleBlock;
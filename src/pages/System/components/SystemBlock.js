import React from "react";
import {inject, observer} from "mobx-react";
import {Col, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {getStatusType, getStatusValid} from "../../../utils/StatusNameService";

const SystemBlock = inject('userStore', 'systemStore', 'modalStore')(observer((store) => {
    const {systemStore} = store

    return (
        <div>
            <Row>
                <Col md={11} xs={10}>
                    <h2>{systemStore.systemData?.product?.title} | {systemStore.systemData?.title}</h2>
                </Col>
                <Col md={1} xs={2} className={'FlexStartEnd'}>
                    <OverlayTrigger key='bottom' placement='bottom' overlay={
                        <Tooltip id={`tooltip-edit-system`}>
                            Редактировать подсистему
                        </Tooltip>
                    }>
                        <svg width="24" height="24">*/}
                            <use xlinkHref={'#icon-pencil'}/>
                        </svg>
                    </OverlayTrigger>
                </Col>
            </Row>
            <hr/>
            <Row>
                <Col md={2}>
                    <p><strong>Статус:</strong></p>
                </Col>
                <Col md={10}>
                    <p className={getStatusValid(systemStore.systemData?.status_type)}>{getStatusType(systemStore.systemData?.status_type)}</p>
                </Col>
            </Row>
            <Row>
                <Col md={2}>
                    <p><strong>Описание:</strong></p>
                </Col>
                <Col md={10}>
                    <p>{systemStore.systemData?.description?.length ? systemStore.systemData?.description : '-'}</p>
                </Col>
            </Row>
        </div>
    )
}))

export default SystemBlock;
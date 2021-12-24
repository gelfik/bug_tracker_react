import React from "react";
import {inject, observer} from "mobx-react";
import {Accordion, Col, OverlayTrigger, Row, Tooltip} from "react-bootstrap";

const BugBlock = inject('userStore', 'systemStore', 'modalStore')(observer((store) => {
    const {bugs} = store
    
    const getFiles = (files) => {
      return files.map((item, i) =>
          <p key={i}><a href={item.file} rel="noreferrer" target="_blank">скачать документ {i}</a></p>
      )
    }
    
    const getBugs = () => {
        return bugs?.map((item, i) =>
            <Accordion.Item eventKey={i} key={i}>
                <Accordion.Header>{item.title}</Accordion.Header>
                <Accordion.Body className={'Bug'}>
                    <Row className={'mb-2'}>
                        <Col md={11} xs={10}>
                            <h6>{item.title}</h6>
                        </Col>
                        <Col md={1} xs={2} className={'FlexStartEnd'}>
                            <OverlayTrigger key='bottom' placement='bottom' overlay={
                                <Tooltip id={`tooltip-edit-system`}>
                                    Редактировать баг
                                </Tooltip>
                            }>
                                <svg width="24" height="24">*/}
                                    <use xlinkHref={'#icon-pencil'}/>
                                </svg>
                            </OverlayTrigger>
                        </Col>
                    </Row>
                    <Row className={'mb-2'}>
                        <Col md={3}>
                            <p><strong>Шаги воспроизведения:</strong></p>
                        </Col>
                        <Col md={9}>
                            <p style={{ whiteSpace: "pre-line" }}>{item?.steps}</p>
                        </Col>
                    </Row>
                    <Row className={'mb-2'}>
                        <Col md={3}>
                            <p><strong>Фактический результат:</strong></p>
                        </Col>
                        <Col md={9}>
                            <p style={{ whiteSpace: "pre-line" }}>{item?.actual_result}</p>
                        </Col>
                    </Row>
                    <Row className={'mb-2'}>
                        <Col md={3}>
                            <p><strong>Ожидаемый результат:</strong></p>
                        </Col>
                        <Col md={9}>
                            <p style={{ whiteSpace: "pre-line" }}>{item?.expected_result}</p>
                        </Col>
                    </Row>
                    <Row className={'mb-2'}>
                        <Col md={3}>
                            <p><strong>Проблема:</strong></p>
                        </Col>
                        <Col md={9}>
                            <p>{item?.problem_type?.title}</p>
                        </Col>
                    </Row>
                    <Row className={'mb-2'}>
                        <Col md={3}>
                            <p><strong>Приоритет:</strong></p>
                        </Col>
                        <Col md={9}>
                            <p>{item?.priority_type?.title}</p>
                        </Col>
                    </Row>
                    <Row className={'mb-2'}>
                        <Col md={3}>
                            <p><strong>Файлы:</strong></p>
                        </Col>
                        <Col md={9}>
                            {item.files ? getFiles(item.files) : <p>Файлы не найдены или еще не добавлены!</p>}
                        </Col>
                    </Row>
                </Accordion.Body>
            </Accordion.Item>
        )
    }

    return (
        <div>
            <Row className={'mt-3'}>
                <Col md={11} xs={10}>
                    <h5>Баги</h5>
                </Col>
                <Col md={1} xs={2} className={'FlexStartEnd'}>
                    <OverlayTrigger key='bottom' placement='bottom' overlay={
                        <Tooltip id={`tooltip-edit-system`}>
                            Добавить баг
                        </Tooltip>
                    }>
                        <svg width="24" height="24">*/}
                            <use xlinkHref={'#icon-plus'}/>
                        </svg>
                    </OverlayTrigger>
                </Col>
            </Row>
            {bugs?.length > 0 ? <Accordion>
                {getBugs()}
            </Accordion> : <div className={'System'}><p>Баги не найдены или еще не добавлены!</p></div>}

        </div>
    )
}))

export default BugBlock;
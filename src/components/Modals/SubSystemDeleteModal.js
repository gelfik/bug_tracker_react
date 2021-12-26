import React from "react";
import {inject, observer} from "mobx-react";
import Modal from "react-bootstrap/Modal";
import {useHistory} from "react-router-dom";
import {MODAL_DELETE_SUB_SYSTEM} from "./ModalType";
import {Col, Row} from "react-bootstrap";

const SubSystemDeleteModal = inject('userStore', 'modalStore', 'systemStore')(observer((stores) => {
    const {modalStore, systemStore} = stores;
    const history = useHistory();

    const onSubmitDelete = () => {
        systemStore.loadSystemDelete().then(() => {
            if (!systemStore.load?.status) {
                history.push(`/`)
                systemStore.load.clear()
                modalStore.close()
            }
        })
    }


    return (
        <Modal show={modalStore.status && modalStore.type === MODAL_DELETE_SUB_SYSTEM} centered
               onHide={modalStore.close}>
            <Modal.Header>
                <Modal.Title>Удаление подсистемы</Modal.Title>
                <button type="button" className="btn-close" aria-label="Close"
                        onClick={modalStore.close}/>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <strong>Вы точно хотитие удалить подсистему?</strong>
                    </Col>
                </Row>
                <Row className={'mt-3'}>
                    <Col md={6} className={'d-flex flex-column'}>
                        <button type={"button"} className={'btn btn-dark'} onClick={() => modalStore.close()}>Отменить
                        </button>
                    </Col>
                    <Col md={6} className={'d-flex flex-column'}>
                        <button type={"button"} className={'btn btn-danger'} onClick={() => onSubmitDelete()}>Удалить
                        </button>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    )
}))

export default SubSystemDeleteModal;
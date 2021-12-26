import React from "react";
import {inject, observer} from "mobx-react";
import Modal from "react-bootstrap/Modal";
import {MODAL_DELETE_MODULE} from "./ModalType";
import {Col, Row} from "react-bootstrap";

const ModuleDeleteModal = inject('userStore', 'modalStore', 'systemStore')(observer((stores) => {
    const {modalStore, systemStore} = stores;

    const onSubmitDelete = () => {
        systemStore.loadModuleDelete().then(() => {
            if (!systemStore.load?.status) {
                systemStore.loadSystemData()
                systemStore.load.clear()
                modalStore.close()
            }
        })
    }


    return (
        <Modal show={modalStore.status && modalStore.type === MODAL_DELETE_MODULE} centered
               onHide={modalStore.close}>
            <Modal.Header>
                <Modal.Title>Удаление модуля</Modal.Title>
                <button type="button" className="btn-close" aria-label="Close"
                        onClick={modalStore.close}/>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <strong>Вы точно хотитие удалить модуль?</strong>
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

export default ModuleDeleteModal;
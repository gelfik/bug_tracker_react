import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import Modal from "react-bootstrap/Modal";
import {useForm} from "react-hook-form";
import {MODAL_ADD_MODULE} from "./ModalType";
import {FloatingLabel, Form} from "react-bootstrap";

const ModuleAddModal = inject('userStore', 'modalStore', 'dictionaryStore', 'systemStore')(observer((stores) => {
    const {modalStore, dictionaryStore, systemStore} = stores;
    const {register, handleSubmit, reset} = useForm();

    const onSubmitAdd = (data) => {
        systemStore.loadModuleAdd(data).then(() => {
            if (!systemStore.load?.status) {
                reset()
                systemStore.loadSystemData()
                systemStore.load.clear()
                modalStore.close()
            }
        })
    }


    const getItemStatus = () => {
        return dictionaryStore?.statusList?.map((item, i) =>
            <option key={i} value={item.id}>{item.title}</option>
        )
    }


    useEffect(() => {
        if (modalStore.status) {
            reset()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalStore.status])


    return (
        <Modal show={modalStore.status && modalStore.type === MODAL_ADD_MODULE} centered
               onHide={modalStore.close}>
            <Modal.Header>
                <Modal.Title>Добавление модуля</Modal.Title>
                <button type="button" className="btn-close" aria-label="Close"
                        onClick={modalStore.close}/>
            </Modal.Header>
            <Modal.Body>
                <form className={'d-flex flex-column'} onSubmit={handleSubmit(onSubmitAdd)}>
                    <div className="col-lg-12 col-12 mb-3">
                        <FloatingLabel controlId="floatingTitle" label="Название">
                            <Form.Control type="text"  {...register("title")} placeholder="Название" required/>
                        </FloatingLabel>
                        {systemStore?.load?.error && systemStore?.load?.error['title'] &&
                        <p className={'custom-alert-danger-text'}>{systemStore?.load?.error['title']}</p>}
                    </div>
                    <div className="col-lg-12 col-12 mb-3">
                        <FloatingLabel controlId="floatingStatusType" label="Статус">
                            <Form.Select defaultValue={''} {...register("status_type", {valueAsNumber: true})}
                                         aria-label="Статус">
                                {getItemStatus()}
                            </Form.Select>
                        </FloatingLabel>
                        {systemStore?.load?.error && systemStore?.load?.error['status_type'] &&
                        <p className={'custom-alert-danger-text'}>{systemStore?.load?.error['status_type']}</p>}
                    </div>
                    <div className="col-lg-12 col-12 mb-3">
                        <div className="form-floating ">
                            <textarea style={{height: '100px'}} className={`form-control`}
                                      id={'description'} {...register('description')}
                                      placeholder={'Комментарий'}/>
                            <label htmlFor={'shortDescription'}>Комментарий</label>
                        </div>
                        {systemStore?.load?.error && systemStore?.load?.error['description'] &&
                        <p className={'custom-alert-danger-text'}>{systemStore?.load?.error['description']}</p>}
                    </div>
                    <button type={"submit"} className={'btn btn-dark'}>Добавить</button>
                </form>
            </Modal.Body>
        </Modal>
    )
}))

export default ModuleAddModal;
import React from "react";
import {inject, observer} from "mobx-react";
import Modal from "react-bootstrap/Modal";
import {useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import {MODAL_ADD_SUB_SYSTEM} from "./ModalType";
import {FloatingLabel, Form} from "react-bootstrap";

const SubSystemAddModal = inject('userStore', 'modalStore', 'systemListStore', 'dictionaryStore', 'systemStore')(observer((stores) => {
    const {modalStore, systemListStore, dictionaryStore, systemStore} = stores;

    const {register, handleSubmit, reset} = useForm();
    const history = useHistory();

    const onSubmitAdd = (data) => {
        systemListStore.loadSubSystemAdd(data).then(() => {
            if (!systemListStore.load?.status) {
                reset()
                systemStore.setSystemID(systemListStore.load?.result?.id)
                history.push(`/system${systemListStore.load?.result?.id}`)
                systemListStore.load.clear()
                modalStore.close()
            }
        })
    }


    const getItemStatus = () => {
        return dictionaryStore?.statusList?.map((item, i) =>
            <option key={i} value={item.id}>{item.title}</option>
        )
    }

    const getItemProduct = () => {
        return dictionaryStore?.productList?.map((item, i) =>
            <option key={i} value={item.id}>{item.title}</option>
        )
    }


    return (
        <Modal show={modalStore.status && modalStore.type === MODAL_ADD_SUB_SYSTEM} centered
               onHide={modalStore.close}>
            <Modal.Header>
                <Modal.Title>Добавление подсистемы</Modal.Title>
                <button type="button" className="btn-close" aria-label="Close"
                        onClick={modalStore.close}/>
            </Modal.Header>
            <Modal.Body>
                <form className={'d-flex flex-column'} onSubmit={handleSubmit(onSubmitAdd)}>
                    <div className="col-lg-12 col-12 mb-3">
                        <FloatingLabel controlId="floatingProduct" label="Продукт">
                            <Form.Select defaultValue={''} {...register("product", {valueAsNumber: true})}
                                         aria-label="Продукт">
                                {getItemProduct()}
                            </Form.Select>
                        </FloatingLabel>
                        {systemListStore?.load?.error && systemListStore?.load?.error['product'] &&
                        <p className={'custom-alert-danger-text'}>{systemListStore?.load?.error['product']}</p>}
                    </div>
                    <div className="col-lg-12 col-12 mb-3">
                        <FloatingLabel controlId="floatingTitle" label="Название">
                            <Form.Control type="text"  {...register("title")} placeholder="Название" required/>
                        </FloatingLabel>
                        {systemListStore?.load?.error && systemListStore?.load?.error['title'] &&
                        <p className={'custom-alert-danger-text'}>{systemListStore?.load?.error['title']}</p>}
                    </div>
                    <div className="col-lg-12 col-12 mb-3">
                        <FloatingLabel controlId="floatingStatusType" label="Статус">
                            <Form.Select defaultValue={''} {...register("status_type", {valueAsNumber: true})}
                                         aria-label="Статус">
                                {getItemStatus()}
                            </Form.Select>
                        </FloatingLabel>
                        {systemListStore?.load?.error && systemListStore?.load?.error['status_type'] &&
                        <p className={'custom-alert-danger-text'}>{systemListStore?.load?.error['status_type']}</p>}
                    </div>
                    <div className="col-lg-12 col-12 mb-3">
                        <div className="form-floating ">
                            <textarea style={{height: '100px'}} className={`form-control`}
                                      id={'description'} {...register('description')}
                                      required placeholder={'Комментарий'}/>
                            <label htmlFor={'shortDescription'}>Комментарий</label>
                        </div>
                        {systemListStore?.load?.error && systemListStore?.load?.error['description'] &&
                        <p className={'custom-alert-danger-text'}>{systemListStore?.load?.error['description']}</p>}
                    </div>
                    <button type={"submit"} className={'btn btn-dark'}>Добавить</button>
                </form>
            </Modal.Body>
        </Modal>
    )
}))

export default SubSystemAddModal;
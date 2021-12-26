import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {Col, FloatingLabel, Form, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {getStatusValid} from "../../../utils/StatusNameService";
import {useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import {MODAL_DELETE_SUB_SYSTEM} from "../../../components/Modals/ModalType";

const SystemBlock = inject('userStore', 'systemStore', 'dictionaryStore', 'modalStore')(observer((store) => {
    const {systemStore, dictionaryStore, modalStore} = store;
    const {register, handleSubmit, reset, setValue} = useForm();
    const [edited, setEdited] = useState(false);
    const queryParams = useParams()

    const onSubmitEdit = (data) => {
        systemStore.setSystemID(queryParams.systemID)
        systemStore.loadSystemEdit(data).then(() => {
            if (!systemStore.load?.status) {
                reset()
                systemStore.loadSystemData()
                systemStore.load.clear()
                setEdited(!edited)
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

    useEffect(() => {
        if (edited) {
            reset()
            setValue('description', systemStore.systemData?.description)
            setValue('title', systemStore.systemData?.title)
            setValue('status_type', systemStore.systemData?.status_type?.id)
            setValue('product', systemStore.systemData?.product?.id)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [edited])

    return (
        <div>
            <Row>
                <Col md={11} xs={10}>
                    <h2>{systemStore.systemData?.product?.title} | {systemStore.systemData?.title}</h2>
                </Col>
                <Col md={1} xs={2} className={'FlexStartEnd'}>
                    <OverlayTrigger placement='bottom' overlay={
                        <Tooltip id={`tooltip-edit-delete`}>
                            Удалить подсистему
                        </Tooltip>
                    }>
                        <svg width="24" height="24" onClick={() => modalStore.open(MODAL_DELETE_SUB_SYSTEM)}>
                            <use xlinkHref={'#icon-delete'}/>
                        </svg>
                    </OverlayTrigger>
                    <OverlayTrigger placement='bottom' overlay={
                        <Tooltip id={`tooltip-edit-system`}>
                            Редактировать подсистему
                        </Tooltip>
                    }>
                        <svg width="24" height="24" onClick={() => setEdited(!edited)}>
                            <use xlinkHref={'#icon-pencil'}/>
                        </svg>
                    </OverlayTrigger>
                </Col>
            </Row>
            <hr/>
            {edited && <form className={'d-flex flex-column'} onSubmit={handleSubmit(onSubmitEdit)}>
                <div className="col-lg-12 col-12 mb-3">
                    <FloatingLabel controlId="floatingProduct" label="Продукт">
                        <Form.Select defaultValue={''} {...register("product", {valueAsNumber: true})}
                                     aria-label="Продукт">
                            {getItemProduct()}
                        </Form.Select>
                    </FloatingLabel>
                    {systemStore?.load?.error && systemStore?.load?.error['product'] &&
                    <p className={'custom-alert-danger-text'}>{systemStore?.load?.error['product']}</p>}
                </div>
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
                <Row>
                    <Col md={6} className={'d-flex flex-column'}>
                        <button type={"button"} className={'btn btn-dark'} onClick={() => setEdited(!edited)}>
                            Отменить
                        </button>
                    </Col>
                    <Col md={6} className={'d-flex flex-column'}>
                        <button type={"submit"} className={'btn btn-warning'}>Сохранить</button>
                    </Col>
                </Row>

            </form>}

            {!edited && <>
                <Row>
                    <Col md={2}>
                        <p><strong>Статус:</strong></p>
                    </Col>
                    <Col md={10}>
                        <p className={getStatusValid(systemStore.systemData?.status_type?.key)}>{systemStore.systemData?.status_type?.title}</p>
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
            </>}
        </div>
    )
}))

export default SystemBlock;
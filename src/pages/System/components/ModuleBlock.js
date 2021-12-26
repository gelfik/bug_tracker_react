import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {Col, FloatingLabel, Form, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {getStatusValid} from "../../../utils/StatusNameService";
import BugBlock from "./BugBlock";
import {MODAL_ADD_MODULE, MODAL_DELETE_MODULE} from "../../../components/Modals/ModalType";
import {useForm} from "react-hook-form";

const ModuleBlock = inject('userStore', 'systemStore', 'modalStore', 'dictionaryStore')(observer((store) => {
    const {systemStore, modalStore, dictionaryStore} = store
    const [edited, setEdited] = useState(false)
    const {register, handleSubmit, reset, setValue} = useForm();

    const onSubmitEdit = (data) => {
        systemStore.loadModuleEdit(data).then(() => {
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

    useEffect(() => {
        if (edited) {
            reset()
            setValue('description', systemStore.moduleData?.description)
            setValue('title', systemStore.moduleData?.title)
            setValue('status_type', systemStore.moduleData?.status_type?.id)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [edited])

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
                            <OverlayTrigger placement='bottom' overlay={
                                <Tooltip id={`tooltip-delete-module`}>
                                    Удалить модуль
                                </Tooltip>
                            }>
                                <svg width="24" height="24" onClick={() => {
                                    systemStore.setModuleID(item.id);
                                    modalStore.open(MODAL_DELETE_MODULE);
                                }}>
                                    <use xlinkHref={'#icon-delete'}/>
                                </svg>
                            </OverlayTrigger>
                            <OverlayTrigger placement='bottom' overlay={
                                <Tooltip id={`tooltip-edit-module`}>
                                    Редактировать модуль
                                </Tooltip>
                            }>
                                <svg width="24" height="24" onClick={() => {
                                    systemStore.setModuleID(item.id);
                                    setEdited(true)
                                }}>
                                    <use xlinkHref={'#icon-pencil'}/>
                                </svg>
                            </OverlayTrigger>
                        </Col>
                    </Row>
                    {(edited && item.id === systemStore.moduleID) &&
                    <form className={'d-flex flex-column'} onSubmit={handleSubmit(onSubmitEdit)}>
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
                    {(!edited || item.id !== systemStore.moduleID) && <>
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
                    </>}
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
                    <OverlayTrigger placement='bottom' overlay={
                        <Tooltip id={`tooltip-edit-system`}>
                            Добавить модуль
                        </Tooltip>
                    }>
                        <svg width="24" height="24" onClick={() => modalStore.open(MODAL_ADD_MODULE)}>
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
import React from "react";
import {inject, observer} from "mobx-react";
import Modal from "react-bootstrap/Modal";
import ErrorAlert from "../ErrorAlert";
import {MODAL_LOGIN, MODAL_REGISTER} from "./ModalType";

const RegisterModal = inject('userStore', 'modalStore', 'registerStore')(observer((stores) => {
    const {userStore, modalStore, registerStore} = stores;

    const onSubmitRegister = (e) => {
        e.preventDefault();
        userStore.registration(registerStore.regData)
    }


    return (
        <Modal show={(modalStore.status && modalStore.type === MODAL_REGISTER)} centered onHide={modalStore.close}>
            <Modal.Header>
                <Modal.Title>Регистрация</Modal.Title>
                <button type="button" className="btn-close" aria-label="Close" onClick={modalStore.close}/>
            </Modal.Header>
            <Modal.Body>
                <form className={'d-flex flex-column'} onSubmit={onSubmitRegister}>
                    <div className="row mt-3">
                        <RegisterInput type={'text'} labelText={'Фамилия'} fieldName={'last_name'}/>
                        <RegisterInput type={'text'} labelText={'Имя'} fieldName={'first_name'}/>
                    </div>
                    <div className="row">
                        <RegisterInput type={'text'} labelText={'Логин'} fieldName={'username'}/>
                        <RegisterInput type={'email'} labelText={'Email'} fieldName={'email'}/>
                    </div>
                    <div className="row ">
                        <RegisterInput type={'password'} labelText={'Пароль'} fieldName={'password'}/>
                        <RegisterInput type={'password'} labelText={'Повтор пароля'} fieldName={'password2'}/>
                    </div>
                    {userStore.errors?.error && <ErrorAlert error={userStore.errors?.error}/>}
                    {userStore.errors?.detail && <ErrorAlert error={userStore.errors?.detail}/>}
                    <div className={'w-100 d-flex justify-content-center'}>
                        <p className="text-center">Есть учетная запись?</p>
                        <div onClick={() => modalStore.open(MODAL_LOGIN)} className={'link ms-2'}>Войти</div>
                    </div>
                    <button type="submit" className="btn btn-dark"
                            disabled={!registerStore.isButtonDisabled}>Регистрация
                    </button>
                </form>
            </Modal.Body>
        </Modal>
    )
}))


const RegisterInput = inject('userStore', 'registerStore')(observer((props) => {
    const {fieldName, labelText, type = 'text', userStore, registerStore} = props
    return (
        <div className="col-lg-6 col-12 mb-3">
            <div className="form-floating ">
                <input type={type} onChange={(e) => {
                    registerStore.setKeyRegData(e.target.name, e.target.value)
                }}
                       className={`form-control ${registerStore.isValid(fieldName)}`}
                       id={fieldName} name={fieldName} value={registerStore.regData[fieldName] || ''}
                       required placeholder={labelText}/>
                <label htmlFor={fieldName}>{labelText}</label>
            </div>
            {userStore?.errors && userStore?.errors[fieldName] &&
            <p className={'custom-alert-danger-text'}>{userStore?.errors[fieldName]}</p>}
        </div>
    )
}))


export default RegisterModal;
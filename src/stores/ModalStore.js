import {action, computed, makeObservable, observable} from "mobx"

export default class ModalStore {
    _status = false
    _type = ''

    constructor() {
        makeObservable(this, {
            _status: observable,
            _type: observable,
            status: computed,
            type: computed,
            open: action,
            close: action,
        })
    }

    get status() {
        return this._status;
    }

    get type() {
        return this._type;
    }

    close = () => {
        this._status = false;
        this._type = '';
    }

    open = (value) => {
        this._status = true;
        this._type = value;
    }
}

export const MODAL_LOGIN = 'LOGIN';
export const MODAL_REGISTER = 'REGISTER';
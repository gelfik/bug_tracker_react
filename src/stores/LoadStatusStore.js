import {action, computed, makeObservable, observable} from "mobx"

export default class LoadStatusStore {
    _status = false

    constructor() {
        makeObservable(this, {
            _status: observable,
            status: computed,
            setStatus: action,
        })
    }

    get status() {
        return this._status;
    }

    setStatus = (value) => {
        this._status = value
    }
}
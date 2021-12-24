import {action, computed, makeObservable, observable, toJS} from "mobx"

export default class LoadDataStore {
    _status = false
    _error = undefined
    _result = undefined

    constructor() {
        makeObservable(this, {
            _status: observable,
            status: computed,
            setStatus: action,

            _error: observable,
            error: computed,
            setError: action,

            _result: observable,
            result: computed,
            setResult: action,
        })
    }

    get status() {
        return this._status;
    }

    setStatus = (value) => {
        this._status = value
    }

    get error() {
        return toJS(this._error);
    }

    setError = (value) => {
        this._error = value
        this._result = undefined
        this._status = true
    }

    get result() {
        return toJS(this._result);
    }

    setResult = (value) => {
        this._error = undefined
        this._result = value
        this._status = false
    }

    clear = () => {
        this._error = undefined
        this._result = undefined
        this._status = false
    }
}
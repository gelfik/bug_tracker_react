import {action, computed, makeObservable, observable, toJS} from "mobx";

export default class DictionaryStore {
    _productList = []
    _statusList = []
    _problemList = []
    _priorityList = []

    constructor($client) {
        makeObservable(this, {
            _productList: observable,
            productList: computed,
            setProductList: action,
            loadProductList: action,

            _statusList: observable,
            statusList: computed,
            setStatusList: action,
            loadStatusList: action,

            _problemList: observable,
            problemList: computed,
            setProblemList: action,
            loadProblemList: action,

            _priorityList: observable,
            priorityList: computed,
            setPropertyList: action,
            loadPropertyList: action,

            loadAllList: action,
        })
        this.client = $client;
    }

    loadAllList = (force = false) => {
        this.loadProductList(force)
        this.loadPropertyList(force)
        this.loadProblemList(force)
        this.loadStatusList(force)
    }


    get productList() {
        return toJS(this._productList);
    }

    setProductList = (value) => {
        this._productList = value
    }

    loadProductList = (force = false) => {
        if (this.productList <= 0 || force) {
            return this.client.get(`/product`)
                .then(response => {
                    this.setProductList(response.data)
                })
        }
    }

    get statusList() {
        return toJS(this._statusList);
    }

    setStatusList = (value) => {
        this._statusList = value
    }

    loadStatusList = (force = false) => {
        if (this.statusList <= 0 || force) {
            return this.client.get(`/status/status`)
                .then(response => {
                    this.setStatusList(response.data)
                })
        }
    }

    get problemList() {
        return toJS(this._problemList);
    }

    setProblemList = (value) => {
        this._problemList = value
    }

    loadProblemList = (force = false) => {
        if (this.problemList <= 0 || force) {
            return this.client.get(`/status/problem`)
                .then(response => {
                    this.setProblemList(response.data)
                })
        }
    }

    get priorityList() {
        return toJS(this._priorityList);
    }

    setPropertyList = (value) => {
        this._priorityList = value
    }

    loadPropertyList = (force = false) => {
        if (this.priorityList <= 0 || force) {
            return this.client.get(`/status/priority`)
                .then(response => {
                    this.setPropertyList(response.data)
                })
        }
    }
}
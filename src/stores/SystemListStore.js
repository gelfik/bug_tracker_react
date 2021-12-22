import {action, computed, makeObservable, observable, toJS} from "mobx";
import FilterStore from "./FilterStore";

export default class SystemListStore {
    _systemList = []
    _productList = []
    _filters = new FilterStore()

    constructor($client) {
        makeObservable(this, {
            _systemList: observable,
            systemList: computed,
            setSystemList: action,
            loadSystemList: action,

            _productList: observable,
            productList: computed,
            setProductList: action,
            loadProductList: action,

            _filters: observable,
            filters: computed,
        })
        this.client = $client;
    }

    get filters() {
        return this._filters;
    }

    get systemList() {
        return toJS(this._systemList);
    }

    setSystemList = (value) => {
        this._systemList = value
    }

    loadSystemList = (params = '') => {
        return this.client.get(`/system`, {params: this.filters.filterData})
            .then(response => {
                this.setSystemList(response.data)
            })
    }

    get productList() {
        return toJS(this._productList);
    }

    setProductList = (value) => {
        this._productList = value
    }

    loadProductList = () => {
        return this.client.get(`/product`)
            .then(response => {
                this.setProductList(response.data)
            })
    }
}
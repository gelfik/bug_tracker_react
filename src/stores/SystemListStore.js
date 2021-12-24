import {action, computed, makeObservable, observable, toJS} from "mobx";
import FilterStore from "./FilterStore";
import LoadStatusStore from "./LoadStatusStore";

export default class SystemListStore {
    _systemList = []
    _filters = new FilterStore()

    _load = new LoadStatusStore()

    constructor($client) {
        makeObservable(this, {
            _systemList: observable,
            systemList: computed,
            setSystemList: action,
            loadSystemList: action,

            loadSubSystemAdd: action,

            _filters: observable,
            filters: computed,

            _load: observable,
            load: computed,
        })
        this.client = $client;
    }

    get filters() {
        return this._filters;
    }

    get load() {
        return this._load;
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


    loadSubSystemAdd = (data) => {
        return this.client.post(`/system/add`, data)
            .then(response => {
                this.load.setStatus(false)
                this.load.setResult(response.data)
            }).catch(errors => {
                if (errors.response.data?.errors) {
                    this.load?.setError(errors.response.data?.errors)
                }
                if (errors.response.data?.detail) {
                    this.load?.setError({error: errors.response.data?.detail})
                }
                if (errors.response.data?.error) {
                    this.load?.setError({error: errors.response.data?.error})
                }
            })
    }
}
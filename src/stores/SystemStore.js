import {action, computed, makeObservable, observable, toJS} from "mobx";
import LoadStatusStore from "./LoadStatusStore";
import FilterStore from "./FilterStore";

export default class SystemStore {
    _systemData = []
    _systemID = null

    _filters = new FilterStore()
    _load = new LoadStatusStore();

    constructor($client) {
        makeObservable(this, {
            _systemData: observable,
            systemData: computed,
            setSystemData: action,
            loadSystemData: action,

            _systemID: observable,
            systemID: computed,
            setSystemID: action,

            _filters: observable,
            filters: computed,

            _load: observable,
            load: computed,
        })
        this.client = $client;
    }

    get filters() {
        return this._filters
    }

    get load() {
        return this._load
    }

    get systemData() {
        return toJS(this._systemData);
    }

    setSystemData = (value) => {
        this._systemData = value
    }

    get systemID() {
        return toJS(this._systemID);
    }

    setSystemID = (value, force = false) => {
        if ((this.systemData.length === 0) || (this.systemID !== value) || (force)) {
            this._systemID = value
        }
    }

    loadSystemData = (params = '') => {
        return this.client.get(`/system${this.systemID}`, {params: this.filters.filterData})
            .then(response => {
                this.setSystemData(response.data)
            }).catch(error => {
                this.load.setStatus(true)
            })
    }


}
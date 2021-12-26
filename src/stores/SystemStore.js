import {action, computed, makeObservable, observable, toJS} from "mobx";
import LoadStatusStore from "./LoadStatusStore";
import FilterStore from "./FilterStore";

export default class SystemStore {
    _systemData = []
    _systemID = null
    _moduleID = null

    _filters = new FilterStore()
    _load = new LoadStatusStore();

    constructor($client) {
        makeObservable(this, {
            _systemData: observable,
            systemData: computed,
            setSystemData: action,

            loadSystemData: action,
            loadSystemEdit: action,
            loadSystemDelete: action,

            loadModuleAdd: action,
            loadModuleEdit: action,
            loadModuleDelete: action,

            _systemID: observable,
            systemID: computed,
            setSystemID: action,

            _moduleID: observable,
            moduleID: computed,
            setModuleID: action,

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

    get moduleID() {
        return toJS(this._moduleID);
    }

    get moduleData() {
        return toJS(this.systemData?.modules?.find((item) => item.id === this.moduleID));
    }

    setModuleID = (value, force = false) => {
        if ((this.moduleID !== value) || (force)) {
            this._moduleID = value
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

    loadSystemEdit = (data) => {
        return this.client.put(`/system${this.systemID}`, data)
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

    loadSystemDelete = () => {
        return this.client.delete(`/system${this.systemID}`)
            .then(response => {
                this.load.setStatus(false)
                this.load.setResult(response.data)
            }).catch(error => {
                this.load.setError(error)
            })
    }


    loadModuleAdd = (data) => {
        return this.client.post(`/system${this.systemID}/add`, data)
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

    loadModuleEdit = (data) => {
        return this.client.put(`/system${this.systemID}/module${this.moduleID}`, data)
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

    loadModuleDelete = () => {
        return this.client.delete(`/system${this.systemID}/module${this.moduleID}`)
            .then(response => {
                this.load.setStatus(false)
                this.load.setResult(response.data)
            }).catch(error => {
                this.load.setError(error)
            })
    }
}
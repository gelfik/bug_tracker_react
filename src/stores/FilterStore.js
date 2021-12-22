import {action, computed, makeObservable, observable, toJS} from "mobx"
import {cloneDeep} from "lodash";

export default class FilterStore {
    _filter = {
        product: 'Любой продукт',
        module: 'Любой модуль',
        search: '',
        status_type: 'Любой статус',
    }

    defaultFilter = cloneDeep(this._filter)

    constructor() {
        makeObservable(this, {
            _filter: observable,
            filter: computed,
            filterData: computed,
            setFilter: action,
            clearFilter: action,
        })
    }

    get filter() {
        return toJS(this._filter);
    }

    get filterData() {
        const data = {}
        if (this.filter['product'] !== 'Любой продукт') {
            data['product'] = this.filter['product']
        }
        if (this.filter['module'] !== 'Любой модуль') {
            data['module'] = this.filter['module']
        }
        if (this.filter['search'] !== '') {
            data['search'] = this.filter['search']
        }
        if (this.filter['status_type'] !== 'Любой статус') {
            data['status_type'] = this.filter['status_type']
        }
        return data
    }

    setFilter = (key, value) => {
        this._filter[key] = value;
    }

    clearFilter = () => {
        this._filter = cloneDeep(this.defaultFilter);
    }

}
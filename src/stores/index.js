import UserStore from "./UserStore";
import TokenStore from "./TokenStore";
import initAxios from "../utils/AxiosService";
import PictureStore from "./PictureStore";
import ModalStore from "./ModalStore";
import RegisterStore from "./RegisterStore";
import LoginStore from "./LoginStore";
import UiStore from "./UiStore";
import SystemListStore from "./SystemListStore";
import SystemStore from "./SystemStore";
import DictionaryStore from "./DictionaryStore";


class RootStore {
    constructor(initialState = null) {
        this.tokenStore = new TokenStore(initialState?.tokenStore);
        this.$axios = initAxios(this.tokenStore);
        this.userStore = new UserStore(this.tokenStore, this.$axios);
        this.pictureStore = new PictureStore(this.$axios)
        this.modalStore = new ModalStore();
        this.registerStore = new RegisterStore(this.$axios, this.userStore);
        this.loginStore = new LoginStore(this.$axios);

        this.dictionaryStore = new DictionaryStore(this.$axios);

        this.systemListStore = new SystemListStore(this.$axios);
        this.systemStore = new SystemStore(this.$axios);

        this.uiStore = new UiStore();
    }
}

export default RootStore;
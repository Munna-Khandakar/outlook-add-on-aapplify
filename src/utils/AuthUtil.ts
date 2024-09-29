import {LocalStorageUtil} from "./LocalStorageUtil";

export class AuthUtil {

    static setToken(token: string) {
        LocalStorageUtil.setItem("token", token);
    }

    static getToken() {
        return LocalStorageUtil.getItem("token");
    }

    static removeToken() {
        LocalStorageUtil.removeItem("token");
    }

    static setRefreshToken(refreshToken: string) {
        LocalStorageUtil.setItem("refreshToken", refreshToken);
    }

    static getRefreshToken() {
        return LocalStorageUtil.getItem("refreshToken");
    }
}
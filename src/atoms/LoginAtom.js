import { atom } from "recoil";

export default loginAtom = atom({
    key: "login",
    default: {
        username: "",
        password: "",
    }
})
import { atom } from "recoil";

const PicSeconds = atom({
    key: "PicSeconds",
    default: 0,
});

const WriteSeconds = atom({
    key: "WriteSeconds",
    default: 0,
});

const ShowPic = atom({
    key: "ShowPic",
    default: false
})

const ButtonDisabledPic = atom({
    key: 'ButtonDisabledPic',
    default: false
})

const ButtonDisabledWrite = atom({
    key: 'ButtonDisabledWrite',
    default: true
})

const Data = atom({
    key: 'Data',
    default: []
})

export { PicSeconds, WriteSeconds, ShowPic, ButtonDisabledPic, ButtonDisabledWrite, Data };

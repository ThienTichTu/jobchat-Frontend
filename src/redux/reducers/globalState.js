export const initState = {
    pageName: "Trang chủ",
    btn_ActiveNav: false,
    messCout: 0,
    imgPreview: {
        active: false,
        img: "../../../../../../avatar.jpg"
    },
    imgPreviewChat: {
        active: false,
        img: ""
    }
}

const globalState = (state = initState, action) => {
    switch (action.type) {
        case "PAGE_NAME": {

            return { ...state, pageName: action.payload };

        }
        case "BTN_ACTIVE": {

            return { ...state, btn_ActiveNav: action.payload };
        }
        case "MESS_COUT": {

            return { ...state, messCout: action.payload };
        }
        case "PREVIEW_IMG": {

            return {
                ...state,
                imgPreview: {
                    active: action.payload.active,
                    img: action.payload.img
                }

            };
        }
        case "PREVIEW_IMG_CHAT": {

            return {
                ...state,
                imgPreviewChat: {
                    active: action.payload.active,
                    img: action.payload.img
                }

            };
        }
        default: {
            return state;
        }
    }
}

export default globalState;
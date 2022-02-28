export const initState = {
    pageName: "Trang chủ",
    btn_ActiveNav: false,
    messCout: 0
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
        default: {
            return state;
        }
    }
}

export default globalState;
export const initState = {
    pageName: "Trang chủ",
    btn_ActiveNav: false
}

const globalState = (state = initState, action) => {
    switch (action.type) {
        case "PAGE_NAME": {

            return { ...state, pageName: action.payload };

        }
        case "BTN_ACTIVE": {

            return { ...state, btn_ActiveNav: action.payload };
        }
        default: {
            return state;
        }
    }
}

export default globalState;
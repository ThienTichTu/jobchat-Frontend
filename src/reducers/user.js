export const initState = {
    name: "Thiện Tích Từ",
    phone: "0365 344 268",
    des: "Descriptions....",
    company: "PTN Global",
    address: "27 d4 kdc Hồng Loan",
    birth: "09/08/2000",
    tele: "",
    face: "",
    twitter: ""
}

const UserReducers = (state = initState, action) => {
    switch (action.type) {
        case "CHANGE_DETAIL": {
            const newUser = action.payload;
            console.log(newUser);
            return state;
        }

        default: {
            return state;
        }
    }
}

export default UserReducers;
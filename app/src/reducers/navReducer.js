function getCurrent(){
    let path = window.location.pathname;

    let fromGuestList = getKeyByValue(guestNavState.list,path);
    let fromAuthList = getKeyByValue(authNavState.list,path);

    let key = fromGuestList || fromAuthList || "Home";
    return key;
}

const guestNavState = {
    list: {
        "Home": '/',
        "Login": '/login',
        "Register": '/register',
    }
}

const authNavState = {
    list: {
        "Home": '/',
        "Schedule": '/schedule',
        "About me": '/aboutme',
        "Logout": '/logout',
    }
}

function getKeyByValue(object, value) {
    let res = Object.keys(object).find(key => object[key] === value);
    return res;
}

const navReducer = (state = {...guestNavState,current:getCurrent()}, action) => {
    switch (action.type) {
        case 'SET_NAV_AUTH': {
            return {current:getCurrent(),...authNavState};
        }

        case 'SET_NAV_GUEST': {
            return {current:getCurrent(),...guestNavState};
        }

        case 'SET_CURRENT': {
            let current;
            if (!action.payload.startsWith('/')) {
                current = action.payload;
            } else {
                current = getKeyByValue(state.list,action.payload);
            }
            return {...state,current};
        }

        default: {
            return {...state};
        }
    }
}

export default navReducer;
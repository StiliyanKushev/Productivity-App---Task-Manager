function getCurrent(){
    let path = window.location.pathname;

    let fromGuestList = getKeyByValue(guestNavState.list,path);
    let fromAuthList = getKeyByValue(authNavState.list,path);

    let key = fromGuestList || fromAuthList || "Home";

    return key;
}

const guestNavState = {
    current: "Home",
    list: {
        "Home": '/',
        "Login": '/login',
        "Register": '/register',
    }
}

const authNavState = {
    current: 'Home',
    list: {
        "Home": '/',
        "Schedule": '/schedule',
        "About me": '/about',
        "Logout": '/logout',
    }
}

function getKeyByValue(object, value) {
    let res = Object.keys(object).find(key => object[key] === value);
    return res;
}


//TODO if auth in cookies initial state is authState

const navReducer = (state = {...guestNavState,current:getCurrent()}, action) => {
    switch (action.type) {
        case 'SET_NAV_AUTH': {
            return authNavState;
        }

        case 'SET_NAV_GUEST': {
            return guestNavState;
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
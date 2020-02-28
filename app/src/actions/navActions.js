const setNavGuest = () => {
    return{
        type: "SET_NAV_GUEST",
    }
}

const setNavAuth = () => {
    return{
        type: "SET_NAV_AUTH",
    }
}

const setCurrent = (current) => {
    return{
        type: "SET_CURRENT",
        payload: current
    }
}

export {
    setNavGuest,
    setNavAuth,
    setCurrent
};
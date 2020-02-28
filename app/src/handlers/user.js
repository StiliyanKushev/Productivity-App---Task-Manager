import {
    toast
} from 'react-toastify';

async function sendAuth(data, route) {
    let response = {
        success: false,
        data: null
    };
    const raw = await fetch('http://localhost:8080/auth/' + route, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    
    let res = await raw.json();

    if (!res.success) {
        for (let err of res.errors) {
            toast.error(err);
        }
    } else {
        toast.success(res.message);
        response = {
            success: true,
            data: {
                username: res.user.username,
                email: res.user.email,
                token: res.token
            }
        }
    }
    return response;
}

function login(data) {
    return sendAuth(data, "login");
}

function register(data) {
    return sendAuth(data, "register");
}

function logout() {
    //TODO
}

const UserHandler = {
    login,
    register,
    logout,
};

export default UserHandler;
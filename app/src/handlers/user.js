import { toast } from 'react-toastify';

function login(data){
    //TODO
    console.log(data);

    //TODO IF VALID DATA AND TOAST ERROR IF FETCHED DATA ERROR
    //toast.success(fetchedData.result);
    toast.success("Welcome User");
}

function register(data){
    //TODO
    console.log(data);

    //TODO IF VALID DATA AND TOAST ERROR IF FETCHED DATA ERROR
    //toast.success(fetchedData.result);
    toast.success("Welcome User");
}

function logout(){
    //TODO
}

const UserHandler = {
    login,
    register,
    logout,
};

export default UserHandler;
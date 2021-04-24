import { constants } from '../../constants';
import { services } from '../../services';

export const actions = {
    login,
    logout,
    register,
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username })); 

        services.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                   
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(user) { return { type: constants.LOGIN_REQUEST, user } }
    function success(user) { return { type: constants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: constants.LOGIN_FAILURE, error } }
}

function logout() {
    services.logout();
    return { type: constants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        services.register(user)
            .then(
                user => { 
                    dispatch(success());
                },
                error => {
                    dispatch(failure(error.toString()));
                   
                }
            );
    };

    function request(user) { return { type: constants.REGISTER_REQUEST, user } }
    function success(user) { return { type: constants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: constants.REGISTER_FAILURE, error } }
}

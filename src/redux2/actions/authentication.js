import { authenticationAction } from "../actionTypes";

export const loginInitiate = (data, prevData, prevPage, navigate) => ({
    type: authenticationAction.USER_LOGIN_INITIATE,
    payload: data,
    prevData,
    prevPage,
    navigate,
});

export const loginSuccess = (data) => ({
    type: authenticationAction.USER_LOGIN_SUCCESS,
    payload: data,
});

export const loginFailure = (error) => ({
    type: authenticationAction.USER_LOGIN_FAILURE,
    payload: error,
});

export const registerInitiate = (data, navigate) => ({
    type: authenticationAction.USER_REGISTER_INITIATE,
    payload: data,
    navigate,
});

export const registerSuccess = (data) => ({
    type: authenticationAction.USER_REGISTER_SUCCESS,
    payload: data,
});

export const registerFailure = (error) => ({
    type: authenticationAction.USER_REGISTER_FAILURE,
    payload: error,
});

export const forgotPasswordInitiate = (data, navigate) => ({
    type: authenticationAction.FORGOT_PASSWORD_INITIATE,
    payload: data,
    navigate,
});

export const forgotPasswordSuccess = (data) => ({
    type: authenticationAction.FORGOT_PASSWORD_SUCCESS,
    payload: data,
});

export const forgotPasswordFailure = (error) => ({
    type: authenticationAction.FORGOT_PASSWORD_FAILURE,
    payload: error,
});

export const forgotLinkVerificationInitiate = (data, navigate) => ({
    type: authenticationAction.FORGOT_LINK_VERIFICATION_INITIATE,
    payload: data,
    navigate,
});

export const forgotLinkVerificationSuccess = (data) => ({
    type: authenticationAction.FORGOT_LINK_VERIFICATION_SUCCESS,
    payload: data,
});

export const forgotLinkVerificationFailure = (error) => ({
    type: authenticationAction.FORGOT_LINK_VERIFICATION_FAILURE,
    payload: error,
});

export const resetPasswordInitiate = (data, navigate) => ({
    type: authenticationAction.RESET_PASSWORD_INITIATE,
    payload: data,
    navigate,
});

export const resetPasswordSuccess = (data) => ({
    type: authenticationAction.RESET_PASSWORD_SUCCESS,
    payload: data,
});

export const resetPasswordFailure = (error) => ({
    type: authenticationAction.RESET_PASSWORD_FAILURE,
    payload: error,
});

export const changePasswordInitiate = (data, navigate) => ({
    type: authenticationAction.CHANGE_PASSWORD_INITIATE,
    payload: data,
    navigate,
});

export const changePasswordSuccess = (data) => ({
    type: authenticationAction.CHANGE_PASSWORD_SUCCESS,
    payload: data,
});

export const changePasswordFailure = (error) => ({
    type: authenticationAction.CHANGE_PASSWORD_FAILURE,
    payload: error,
});

export const userProfileInitiate = (data, navigate) => ({
    type: authenticationAction.USER_PROFILE_INITIATE,
    payload: data,
    navigate,
});

export const userProfileSuccess = (data) => ({
    type: authenticationAction.USER_PROFILE_SUCCESS,
    payload: data,
});

export const userProfileFailure = (error) => ({
    type: authenticationAction.USER_PROFILE_FAILURE,
    payload: error,
});

export const userProfileEditInitiate = (data, navigate) => ({
    type: authenticationAction.USER_PROFILE_EDIT_INITIATE,
    payload: data,
    navigate,
});

export const userProfileEditSuccess = (data) => ({
    type: authenticationAction.USER_PROFILE_EDIT_SUCCESS,
    payload: data,
});

export const userProfileEditFailure = (error) => ({
    type: authenticationAction.USER_PROFILE_EDIT_FAILURE,
    payload: error,
});

export const contactUsFormInitiate = (data, navigate) => ({
    type: authenticationAction.CONTACT_US_FORM_INITIATE,
    payload: data,
    navigate,
});

export const contactUsFormSuccess = (data) => ({
    type: authenticationAction.CONTACT_US_FORM_SUCCESS,
    payload: data,
});

export const contactUsFormFailure = (error) => ({
    type: authenticationAction.CONTACT_US_FORM_FAILURE,
    payload: error,
});

export const logoutInitiate = (data, navigate) => ({
    type: authenticationAction.USER_LOGOUT,
    payload: data,
    navigate,
});

export const drawerAction = (data, key) => {
    const action = {
        type: authenticationAction.DRAWER_EVENT,
        payload: data,
        key
    }
    return action;
}

export const updateAuthenticationState = (data, key) => {
    const action = {
        type: authenticationAction.UPDATE_AUTHENTICATION_STATE,
        payload: data,
        key
    }
    return action;
}

export const clearUserData = () => ({
    type: authenticationAction.CLEAR_USER_DATA
});

import { authenticationAction } from "../actionTypes";

const initialState = {
  loginSuccess: false,
  loginLoader: false,
  loginData: '',
  registerData: {},
  registerLoader: false,
  registerSuccess: false,
  forgotPasswordSuccess: false,
  forgotPasswordLoader: false,
  forgotLinkVerificationLoader: false,
  forgotLinkVerificationSuccess: false,
  forgotLinkVerificationKey: false,
  resetPasswordLoader: false,
  resetPasswordSuccess: false,
  changePasswordLoader: false,
  changePasswordSuccess: false,
  userProfileDetail: {},
  userProfileLoader: false,
  userProfileSuccess: false,
  userProfileEditLoader: false,
  userProfileEditSuccess: false,
  userProfileEditData: {},
  contactUsFormLoader: false,
  contactUsFormSuccess: false,
  logoutSuccess: false,
  drawerState: false
}

export default function authenticationModule(
  state = initialState,
  { payload, type, key }
) {
  switch (type) {
    case authenticationAction.USER_LOGIN_INITIATE:
      return {
        ...state,
        loginLoader: true,
        loginSuccess: false,
        logoutSuccess: false
      };

    case authenticationAction.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loginLoader: false,
        loginData: payload,
        loginSuccess: true,
      };

    case authenticationAction.USER_LOGIN_FAILURE:
      return {
        ...state,
        loginLoader: false,
      };

    case authenticationAction.USER_REGISTER_INITIATE:
      return {
        ...state,
        registerLoader: true,
        registerSuccess: false
      };

    case authenticationAction.USER_REGISTER_SUCCESS:
      return {
        ...state,
        registerLoader: false,
        registerData: payload,
        registerSuccess: true,
      };

    case authenticationAction.USER_REGISTER_FAILURE:
      return {
        ...state,
        registerLoader: false,
      };

    case authenticationAction.FORGOT_PASSWORD_INITIATE:
      return {
        ...state,
        forgotPasswordLoader: true,
        forgotPasswordSuccess: false
      };

    case authenticationAction.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswordLoader: false,
        forgotPasswordSuccess: true,
      };

    case authenticationAction.FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        forgotPasswordLoader: false,
      };

    case authenticationAction.FORGOT_LINK_VERIFICATION_INITIATE:
      return {
        ...state,
        forgotLinkVerificationLoader: true,
        forgotLinkVerificationSuccess: false,
        forgotLinkVerificationKey: false
      };

    case authenticationAction.FORGOT_LINK_VERIFICATION_SUCCESS:
      return {
        ...state,
        forgotLinkVerificationLoader: false,
        forgotLinkVerificationSuccess: true,
        forgotLinkVerificationKey: payload
      };

    case authenticationAction.FORGOT_LINK_VERIFICATION_FAILURE:
      return {
        ...state,
        forgotLinkVerificationLoader: false,
        forgotLinkVerificationKey: payload
      };

    case authenticationAction.RESET_PASSWORD_INITIATE:
      return {
        ...state,
        resetPasswordLoader: true,
        resetPasswordSuccess: false,
      };

    case authenticationAction.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordLoader: false,
        resetPasswordSuccess: true,
      };

    case authenticationAction.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        resetPasswordLoader: false,
      };

    case authenticationAction.CHANGE_PASSWORD_INITIATE:
      return {
        ...state,
        changePasswordLoader: true,
        changePasswordSuccess: false
      };

    case authenticationAction.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePasswordLoader: false,
        changePasswordSuccess: true,
      };

    case authenticationAction.CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        changePasswordLoader: false,
      };

    case authenticationAction.USER_PROFILE_INITIATE:
      return {
        ...state,
        userProfileLoader: true,
        userProfileSuccess: false
      };

    case authenticationAction.USER_PROFILE_SUCCESS:
      return {
        ...state,
        userProfileLoader: false,
        userProfileSuccess: true,
        userProfileDetail: payload
      };

    case authenticationAction.USER_PROFILE_FAILURE:
      return {
        ...state,
        userProfileLoader: false,
      };

    case authenticationAction.USER_PROFILE_EDIT_INITIATE:
      return {
        ...state,
        userProfileEditLoader: true,
        userProfileEditSuccess: false
      };

    case authenticationAction.USER_PROFILE_EDIT_SUCCESS:
      return {
        ...state,
        userProfileEditLoader: false,
        userProfileEditSuccess: true,
        userProfileEditData: payload
      };

    case authenticationAction.USER_PROFILE_EDIT_FAILURE:
      return {
        ...state,
        userProfileEditLoader: false,
      };

    case authenticationAction.CONTACT_US_FORM_INITIATE:
      return {
        ...state,
        contactUsFormLoader: true,
        contactUsFormSuccess: false,
      };

    case authenticationAction.CONTACT_US_FORM_SUCCESS:
      return {
        ...state,
        contactUsFormLoader: false,
        contactUsFormSuccess: true,
      };

    case authenticationAction.CONTACT_US_FORM_FAILURE:
      return {
        ...state,
        contactUsFormLoader: false,
      };

    case authenticationAction.USER_LOGOUT:
      return {
        ...state,
        logoutSuccess: true,
        loginSuccess: false
      };

    case authenticationAction.DRAWER_EVENT:
      state[key] = payload
      return { ...state, }

    case authenticationAction.UPDATE_AUTHENTICATION_STATE:
      state[key] = payload
      return { ...state }

    case authenticationAction.CLEAR_USER_DATA:
      return {
        userProfileSuccess: false,
        changePasswordSuccess: false,
        registerSuccess: false,
        userProfileEditSuccess: false,
        forgotLinkVerificationSuccess: false,
        forgotLinkVerificationKey: false,
        resetPasswordSuccess: false,
        contactUsFormSuccess: false,
        userProfileDetail: {}
        // loginSuccess: false,
        // loginData: {}
      }

    default:
      return state;
  }
}

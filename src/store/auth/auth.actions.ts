import { newBusniessForm, AuthActionsEnum } from "./auth.types";
import { instace } from '../../models/axios/axios';

export const postBusiness = (form: newBusniessForm) => {
  instace.post('employee/register', form).then((res) => {
    const token = res.data.token;
    return localStorage.setItem("token", token);

  }).then(() => {
    return ({ type: AuthActionsEnum.SUCCESS_POST_BUSINESS });
  }).catch((error: any) => {
    return ({ type: AuthActionsEnum.FALID_POST_BUSINESS, error });
  })




  // return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
  //   const firebase = getFirebase();
  //   const firestore = getFirestore();

  //   firebase.auth().createUserWithEmailAndPassword(
  //     newUser.email,
  //     newUser.password
  //   ).then((resp: any) => {
  //     return firestore.collection('users').doc(resp.user.uid).set({
  //       firstName: newUser.firstName,
  //       lastName: newUser.lastName,
  //       shoppingList: [],
  //       historyList: [],
  //       language: newUser.language,
  //       registrationDate: new Date()
  //     });
  //   }).then(() => {
  //     dispatch({ type: 'SIGNUP_SUCCESS' });
  //   }).catch((err: any) => {
  //     dispatch({ type: 'SIGNUP_ERROR', err });
  //   });
  // }
}

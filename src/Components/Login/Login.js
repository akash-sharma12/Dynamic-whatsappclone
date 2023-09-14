import React from 'react';
import './Login.css';
import Button from '@mui/material/Button'; 
import { auth, provider } from '../../firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { actionTypes } from '../../reducer';
import { useStateValue } from '../../StateProvider';






function Login() {
  const [{}, dispatch] = useStateValue();

    const signIn = () => {
      const auth = getAuth();
      signInWithPopup(auth, provider)
  .then((result) => {
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;
  const user = result.user;
  console.log(user);
    dispatch({
      type: actionTypes.SET_USER,
      user: result.user,
    });


    
  }).catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   const email = error.customData.email;
  //   const credential = GoogleAuthProvider.credentialFromError(error);
  alert(error.message)
  });
        // auth
        // .signInWithPopup(provider)
        // .then((result) => console.log(result))
        // .catch((error) => alert(error.message));
    };
  return (
    <div className="login">
        <div className="login__container">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png" alt=""/> 
                <div className="login_text">
                    <h1>Sign in to Whatsapp</h1>
                </div>
                <Button onClick={signIn}>Sign in With Google</Button>

        </div>
    </div>
  )
}

export default Login
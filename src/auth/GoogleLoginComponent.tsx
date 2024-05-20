import React from 'react';
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/store';
import { useNavigate } from 'react-router-dom';

const clientId = 'YOUR_GOOGLE_CLIENT_ID';

const GoogleLoginComponent: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSuccess = (response: CredentialResponse) => {
    console.log('Login Success: currentUser:', response);
    if (response.credential) {
      localStorage.setItem('token', response.credential);
      const user = {
        id: 'some-id', // replace with actual user id
        email: 'user@example.com', // replace with actual user email
      };
      dispatch(setUser(user));
      navigate('/');
    }
  };

  const onError = () => {
    console.log('Login Failed');
  };

  return (
    <div>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onError}
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default GoogleLoginComponent;

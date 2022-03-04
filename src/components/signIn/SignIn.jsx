import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DataContext } from '../../utils/DataContext';

const StyledCard = styled(Card)`
  width: 20%;
  /* height: 300px; */
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 1rem;
  margin-top: 15%;
`;

const StyledHeading = styled.h3`
  font-size: 1.2rem;
  margin: auto;
  padding: 1rem;
`;

const StyledText = styled(TextField)`
  margin: 0.5rem;
`;

const StyledButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledButton = styled(Button)`
  margin: auto 1rem auto 1rem;
`;

const SignIn = () => {
  const [signInDetails, setSignInDetails] = useState({
    email: '',
    password: '',
  });

  const context = useContext(DataContext);

  const handleEmailChange = (event) => {
    setSignInDetails({ ...signInDetails, email: event.target.value });
  };

  const handlePasswordChange = (event) => {
    setSignInDetails({ ...signInDetails, password: event.target.value });
  };

  const handleSignIn = () => {
    context.signIn(signInDetails.email, signInDetails.password);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(context.userDetails).length !== 0) {
      navigate('/dashboard');
    }
  }, [context.userDetails, navigate]);
  return (
    <StyledCard>
      <StyledHeading>JWD Portfolio Dashboard</StyledHeading>
      <StyledText
        size="small"
        id="email"
        label="Email"
        value={signInDetails.email}
        onChange={handleEmailChange}
      />
      <StyledText
        size="small"
        id="password"
        label="Password"
        value={signInDetails.password}
        onChange={handlePasswordChange}
      />
      <StyledButtonDiv>
        <StyledButton
          style={{ marginLeft: 'auto' }}
          variant="outlined"
          onClick={handleSignIn}
        >
          Sign In
        </StyledButton>
        <StyledButton variant="outlined">Register</StyledButton>
      </StyledButtonDiv>
    </StyledCard>
  );
};

export default SignIn;

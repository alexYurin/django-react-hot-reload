import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Container, Button } from 'semantic-ui-react';
import StackIcons from './StackIcons';
import AuthLoginForm from './AuthLoginForm';
import { Wrapper, AuthForm, ModeDisplay, Greeting, Text } from './style';

import { login, logout } from '../../store/auth/auth.actions';

interface IProps {
  auth: any;
  login: (e?: any) => void;
  logout: () => void;
};

class Hello extends React.Component<IProps, {}> {
  state = {
    auth: this.props.auth.isAuthenticated as boolean,
    isLoading: this.props.auth.isLoading as boolean,
    username: '' as string,
    email: '' as string,
    password: '' as string,
    redirect: false,
    errorMessages: this.props.auth.errors as object
  };

  static getDerivedStateFromProps(nextProps: IProps) {
    return {
      isLoading : nextProps.auth.isLoading,
      auth: nextProps.auth.isAuthenticated,
      errorMessages: nextProps.auth.errors,
      username: nextProps.auth.user && nextProps.auth.user.username
    }
  };

  componentDidMount() {
    if (!this.state.auth) this.props.login();
  }

  handleInputs = (value: string, state: string) => {
    this.setState({
      [state]: value
    })
  };

  handleRedirectToAdmin = (e: any) => {
    e.preventDefault();
    this.setState({
      redirect: true
    })
  };

  handleLogin = (e: any) => {
    e.preventDefault();
    const { email, password } = this.state;
    
    this.props.login({
      email,
      password
    })
  };

  handleLogout = (e: any) => {    
    e.preventDefault();
    this.props.logout();
  };

  render() {
    const { auth, email, password, isLoading, errorMessages, redirect } = this.state;
    const mode = process.env.NODE_ENV;

    if (redirect) {
      return <Redirect to='/admin/' />
    }

    return (
      <Wrapper>
        <Container textAlign='center'>
          <StackIcons />
          <Greeting as='h1'>Welcome to the Django app with React!</Greeting>
          <Text>If you see this message, then setup is done.</Text>
          <ModeDisplay mode={mode}>{mode === 'development' ? 'in development mode' : 'in production mode'}</ModeDisplay>

          <AuthForm>
            {
              !auth ?

              <AuthLoginForm
                email={email}
                password={password}
                isLoading={isLoading}
                errorMessages={errorMessages}
                handleInputs={this.handleInputs}
                onClick={this.handleLogin}
              /> :

              <React.Fragment>
                <Button
                  name='admin'
                  color='blue'
                  content='Go to admin'
                  onClick={this.handleRedirectToAdmin}
                />
                <Button
                  name='logout'
                  color='red'
                  content='Logout'
                  onClick={this.handleLogout}
                />
              </React.Fragment>     
            }
            </AuthForm>          
          
        </Container>
      </Wrapper>
    )
  }
};

const mapStateToProps = (state: any) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch: any) => ({
  login: (params?: object) => dispatch(login(params)),
  logout: () => dispatch(logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hello);

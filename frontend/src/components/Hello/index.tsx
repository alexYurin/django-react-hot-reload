import * as React from 'react';
import { connect } from "react-redux";
import { Container, Header, Form, Button } from 'semantic-ui-react';
import { loginUser, logoutUser } from "drf-redux-auth";
import styled from 'styled-components';

const djangoLogo = require('../../../images/logos/django.png');
const reactLogo = require('../../../images/logos/react.png');
const reduxLogo = require('../../../images/logos/redux.png');
const routerLogo = require('../../../images/logos/router.png');
const webpackLogo = require('../../../images/logos/webpack.png');
const typescriptLogo = require('../../../images/logos/typescript.png');

const DjangoIcon = styled.img`
  width: 90px;
`;

const WebpackIcon = styled.img`
  width: 40px;
`;

const ReactIcon = styled.img`
  width: 40px;
`;

const ReduxIcon = styled.img`
  width: 40px;
`;

const RouterIcon = styled.img`
  width: 60px;
`;

const TypescriptIcon = styled.img`
  width: 40px;
`;

const IconsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0 40px;

  img {
    margin: 5px 20px;
  }

  img:nth-child(1) {
    margin-left: 0;
  }

  img:nth-last-child(1) {
    margin-right: 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  height: 100%;
  background-color: #2196f3;
`;

const Greeting = styled(Header)`
  margin: 0;
  font-size: 2.4em;
  color: #fafafa;
`;

const AuthForm = styled(Form)`
  margin: 30px 0;
`;

const FormGroup = styled(Form.Group)`
  justify-content: center;
`;

const Text = styled.p`
  margin: 50px 0 0;
  font-size: 1.2em;
  color: #fafafa;
`;

namespace Mode {
  export interface IProps {
    mode: string;
  };
}

const ModeDisplay = styled.p<Mode.IProps>`
  font-weight: bold;
  font-size: 1em;
  color: ${props => props.mode === 'development' ? '#ffcc80' : '#69f0ae'};
`;

export interface IProps {
  auth: any;
  loginUser: (e: any) => void;
};

class Hello extends React.Component<IProps, {}> {
  state = {
    auth_user: false as boolean,
    username: '' as string,
    password: '' as string,
  };

  handleInputs = (value: string, state: string) => {
    this.setState({
      [state]: value
    })
  }

  handleLoginClick = () => {
    const { username, password } = this.state;
    const creds = {
      username: username.trim(),
      password: password.trim()
    };
    this.props.loginUser(creds);
  };

  render() {
    const { username, password } = this.state;
    const mode = process.env.NODE_ENV;

    return (
      <Wrapper>
        <Container
          textAlign="center"
        >
          <IconsContainer>
            <DjangoIcon
              src={djangoLogo}
              alt="logo"
            />
            <WebpackIcon
              src={webpackLogo}
              alt="logo"
            />
            <ReactIcon
              src={reactLogo}
              alt="logo"
            />
            <ReduxIcon
              src={reduxLogo}
              alt="logo"
            />
            <RouterIcon
              src={routerLogo}
              alt="logo"
            />
            <TypescriptIcon
              src={typescriptLogo}
            />
          </IconsContainer>
          <Greeting as='h1'>Welcome to the Django app with React!</Greeting>
          <Text>
            If you see this message, then setup is done.
          </Text>
          <ModeDisplay mode={mode}>
            {
              mode === 'development' ?
              'in development mode' :
              'in production mode'
            }
          </ModeDisplay>
          <AuthForm>
            <FormGroup>
              <Form.Input
                width={5}
                placeholder='Username'
                value={username ? username : ''}
                onChange={event => this.handleInputs(event.target.value, 'username')}
              />
            </FormGroup>
            <FormGroup>
              <Form.Input
                type="password"
                width={5}
                placeholder='Password'
                value={password ? password : ''}
                onChange={event => this.handleInputs(event.target.value, 'password')}
              />
            </FormGroup>
          </AuthForm>
          <Button
            color='green'
            content='Submit'
            onClick={this.handleLoginClick}
          />
        </Container>
      </Wrapper>
    )
  }
};

const mapStateToProps = (state: any) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch: any) => ({
  loginUser: (creds: any) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hello);

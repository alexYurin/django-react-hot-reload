import * as React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Form, Button } from 'semantic-ui-react';
import CSRFToken from '../CSRFToken';
import styled from 'styled-components';
import { login } from '../../store/auth/auth.actions'

const djangoLogo = require('../../../images/logos/django.png');
const reactLogo = require('../../../images/logos/react.png');
const reduxLogo = require('../../../images/logos/redux.png');
const routerLogo = require('../../../images/logos/router.png');
const webpackLogo = require('../../../images/logos/webpack.png');
const typescriptLogo = require('../../../images/logos/typescript.png');

const Icon = styled.img`
  width: ${props => props.width || 'auto'};
`;

const IconsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  margin: 20px 0 40px;

  img {
    margin: 5px 20px;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
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

type Mode = {
  mode: string;
};

const ModeDisplay = styled.p<Mode>`
  font-weight: bold;
  font-size: 1em;
  color: ${props => props.mode === 'development' ? '#ffcc80' : '#69f0ae'};
`;

interface IProps {
  auth: any;
  login: (e: any) => void;
};

class Hello extends React.Component<IProps, {}> {
  state = {
    auth: localStorage.getItem('token') ? true : false as boolean,
    username: '' as string,
    password: '' as string,
  };

  handleInputs = (value: string, state: string) => {
    this.setState({
      [state]: value
    })
  }

  handleLogin = (e: any) => {
    e.preventDefault();
    const { username, password } = this.state;
    
    this.props.login({
      username,
      password
    })
  };

  render() {
    const { username, password } = this.state;
    const mode = process.env.NODE_ENV;

    return (
      <Wrapper>
        <Container
          textAlign='center'
        >
          <IconsContainer>
            <Icon src={djangoLogo} alt='Django' width='90px' />
            <Icon src={webpackLogo} alt='Webpack' width='40px'/>
            <Icon src={reactLogo} alt='React' width='40px'/>
            <Icon src={reduxLogo} alt='Redux' width='40px' />
            <Icon src={routerLogo} alt='Router' width='60px' />
            <Icon src={typescriptLogo} alt='Typescript' width='40px' />
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
          <AuthForm onSubmit={this.handleLogin}>
            <CSRFToken />
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
                type='password'
                width={5}
                placeholder='Password'
                value={password ? password : ''}
                onChange={event => this.handleInputs(event.target.value, 'password')}
              />
            </FormGroup>
            <Button
              color='green'
              content='Submit'
            />
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
  login: (params: object) => dispatch(login(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hello);

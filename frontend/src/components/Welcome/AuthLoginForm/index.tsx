import * as React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { FormGroup, Text } from '../style';

interface IProps {
  isLoading: boolean;
  email: string;
  password: string;
  handleInputs: (e: any, state: string) => void;
  onClick: (e: any) => void;
}

const AuthLoginForm: React.SFC<IProps> = ({email, password, isLoading, handleInputs, onClick}) => (
  <React.Fragment>
    <Text>Login</Text>
    <FormGroup>
      <Form.Input
        width={5}
        placeholder='E-mail'
        value={email ? email : ''}
        onChange={event => handleInputs(event.target.value, 'email')}
      />
    </FormGroup>
    <FormGroup>
      <Form.Input
        type='password'
        width={5}
        placeholder='Password'
        value={password ? password : ''}
        onChange={event => handleInputs(event.target.value, 'password')}
      />
    </FormGroup>
    <Button
      loading={isLoading}
      name='login'
      color='green'
      content='Login'
      onClick={onClick}
    />
  </React.Fragment>
)

export default AuthLoginForm;

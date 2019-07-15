import * as React from 'react';
import { Segment, Form, Button, Label } from 'semantic-ui-react';
import { FormGroup, Text } from '../style';

interface IProps {
  isLoading: boolean;
  email: string;
  password: string;
  errorMessages: any;
  handleInputs: (e: any, state: string) => void;
  onClick: (e: any) => void;
}

const AuthLoginForm: React.SFC<IProps> = ({email, password, isLoading, handleInputs, errorMessages, onClick}) => (
  <React.Fragment>
    <Text>Login</Text>
    {
      errorMessages.error &&
      <Segment inverted color='red' tertiary>
        {errorMessages.error}
      </Segment>
    }
    <FormGroup>
      {
        errorMessages.email &&
        <Label basic color='red' pointing='below'>
          {errorMessages.email}
        </Label>
      }
      <Form.Input
        width={5}
        type='email'
        icon='mail'
        iconPosition='left'
        placeholder='E-mail'
        value={email ? email : ''}
        onChange={event => handleInputs(event.target.value, 'email')}
      />
    </FormGroup>
    <FormGroup>
      {
        errorMessages.password &&
        <Label basic color='red' pointing='below'>
          {errorMessages.password}
        </Label>
      }
      <Form.Input
        icon='lock'
        iconPosition='left'
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

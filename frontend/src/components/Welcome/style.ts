import styled from 'styled-components';
import { Header, Form } from 'semantic-ui-react';

export const Icon = styled.img`
  width: ${props => props.width || 'auto'};
`;

export const IconsContainer = styled.div`
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

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  height: 100%;
  background-color: #2196f3;
`;

export const Greeting = styled(Header)`
  margin: 0;
  font-size: 2.4em;
  color: #fafafa;
`;

export const AuthForm = styled(Form)`
  margin: 30px 0;
`;

export const FormGroup = styled(Form.Group)`
  justify-content: center;
`;

export const Text = styled.p`
  margin: 50px 0 0;
  font-size: 1.2em;
  color: #fafafa;
`;

export type Mode = {
  mode: string;
};

export const ModeDisplay = styled.p<Mode>`
  font-weight: bold;
  font-size: 1em;
  color: ${props => props.mode === 'development' ? '#ffcc80' : '#69f0ae'};
`;
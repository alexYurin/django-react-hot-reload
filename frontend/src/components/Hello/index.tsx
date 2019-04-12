import * as React from 'react';
import { http } from '../../kernel/api';
import { Container, Header } from 'semantic-ui-react';
import styled from 'styled-components';

namespace Mode {
  export interface IProps {
    mode: string;
  };
}

const ModeDisplay = styled.p<Mode.IProps>`
  font-weight: bold;
  font-size: 1em;
  color: ${props => props.mode === 'development' ? '#ff5252' : '#69f0ae'};
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

const Welcome = styled(Header)`
  color: #fafafa;
`;

const Greeting = styled(Header)`
  margin: 0;
  color: #fafafa;
`;

const Text = styled.p`
  margin: 0;
  font-size: 1.2em;
  color: #fafafa;
`;

const Line = styled.div`
  margin: 20px 0 30px;
  width: 100%;
  height: 1px;
  background-color: #bbdefb;
`;

export default class Hello extends React.Component {
  state = {
    auth_user: false as boolean,
  };

  async componentWillMount() {
    await http.post('auth', {"username": "admin", "password": "adminadmin"})
      .then((res: any) => {
        this.setState({
          auth_user: res
        })
      })
      .catch(error => {
        console.log('error', error.message)
      })
  };

  render() {
    const { auth_user } = this.state;
    const mode = process.env.NODE_ENV;

    console.log('users', auth_user)

    return (
      <Wrapper>
        <Container>
          <Welcome as='h1'>Welcome to React with Django</Welcome>
          <Line />
          <Greeting as='h2'>Congratulations!</Greeting>
          <Text>
            If you see this message, it means everything is in development.
          </Text>
          <ModeDisplay mode={mode}>
            {
              mode === 'development' ?
              'in development mode' :
              'in production mode'
            }
          </ModeDisplay>
        </Container>
      </Wrapper>
    )
  }
}

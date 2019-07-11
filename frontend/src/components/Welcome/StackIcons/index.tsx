import * as React from 'react';
import { IconsContainer, Icon } from '../style';

const djangoLogo = require('../../../../images/logos/django.png');
const reactLogo = require('../../../../images/logos/react.png');
const reduxLogo = require('../../../../images/logos/redux.png');
const routerLogo = require('../../../../images/logos/router.png');
const webpackLogo = require('../../../../images/logos/webpack.png');
const typescriptLogo = require('../../../../images/logos/typescript.png');

const StackIcons = () => (
  <IconsContainer>
    <Icon src={djangoLogo} alt='Django' width='90px' />
    <Icon src={webpackLogo} alt='Webpack' width='40px'/>
    <Icon src={reactLogo} alt='React' width='40px'/>
    <Icon src={reduxLogo} alt='Redux' width='40px' />
    <Icon src={routerLogo} alt='Router' width='60px' />
    <Icon src={typescriptLogo} alt='Typescript' width='40px' />
  </IconsContainer>
)

export default StackIcons;

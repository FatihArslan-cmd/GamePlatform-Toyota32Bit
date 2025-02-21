import React from 'react';
import GrandientText from '../../../components/GrandientText';

const HeaderTitle = () => (
  <GrandientText
    text="Invite Friends"
    colors={['black', '#778899']}
    textStyle={{ fontSize: 28 }}
    gradientDirection="horizontal"
  />
);

export default HeaderTitle;
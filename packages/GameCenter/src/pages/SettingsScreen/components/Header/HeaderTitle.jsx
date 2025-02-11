import React from 'react';
import GrandientText from '../../../../components/GrandientText';  // Adjust path if needed

const HeaderTitle = () => (
  <GrandientText
    text="Settings"
    colors={['black', '#778899']}
    textStyle={{ fontSize: 28 }}
    gradientDirection="horizontal"
  />
);

export default HeaderTitle;
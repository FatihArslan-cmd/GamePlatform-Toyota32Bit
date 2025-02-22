import React from 'react';
import GrandientText from '../../../../components/GrandientText';  // Adjust path if needed

const HeaderTitle = () => (
  <GrandientText
    text="Chat with Friends"
    colors={['#FFD700', '#CD7F32']} // Gold to Bronze
    textStyle={{ fontSize: 28 }}
    gradientDirection="horizontal"
    width={400}
  />
);

export default HeaderTitle;
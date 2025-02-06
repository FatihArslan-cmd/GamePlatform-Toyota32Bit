import React from 'react';
import GrandientText from '../../../../components/GrandientText';

const RoomHeader = () => (
       <GrandientText
            text="Create a Community"
            colors={['black', '#778899']}
            textStyle={{ fontSize: 32, textAlign: 'center' }} 
            gradientDirection="horizontal"
            width={500}
          />
);


export default RoomHeader;
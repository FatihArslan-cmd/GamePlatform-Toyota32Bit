import React from "react";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";

const MyLoader = React.memo((props) => (
  <ContentLoader 
    speed={0.3}
    width={400}
    height={460}
    viewBox="0 0 400 460"
    backgroundColor="#707070"
    foregroundColor="#ffffff"
    {...props}
  >
    <Circle cx="524" cy="173" r="15" /> 
    <Rect x="20" y="11" rx="10" ry="10" width="364" height="404" /> 
    <Rect x="35" y="51" rx="5" ry="5" width="122" height="6" /> 
    <Rect x="35" y="27" rx="5" ry="5" width="124" height="7" /> 
  </ContentLoader>
));

export default MyLoader;

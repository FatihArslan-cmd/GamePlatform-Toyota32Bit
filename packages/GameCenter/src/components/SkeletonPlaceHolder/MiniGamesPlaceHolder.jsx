import React from "react";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";

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
    <Rect x="91" y="34" rx="5" ry="5" width="7" height="0" /> 
    <Rect x="89" y="31" rx="5" ry="5" width="7" height="0" />
    <Rect x="21" y="2" rx="10" ry="10" width="155" height="187" /> 
    <Rect x="231" y="168" rx="5" ry="5" width="83" height="11" /> 
    <Rect x="57" y="166" rx="5" ry="5" width="83" height="11" /> 
    <Rect x="71" y="476" rx="5" ry="5" width="83" height="11" /> 
    <Rect x="245" y="364" rx="5" ry="5" width="83" height="11" /> 
    <Rect x="211" y="3" rx="10" ry="10" width="155" height="187" /> 
    <Rect x="211" y="203" rx="10" ry="10" width="155" height="187" /> 
    <Rect x="21" y="202" rx="10" ry="10" width="155" height="187" /> 
    <Rect x="59" y="371" rx="5" ry="5" width="75" height="9" /> 
  </ContentLoader>
));

export default MyLoader;

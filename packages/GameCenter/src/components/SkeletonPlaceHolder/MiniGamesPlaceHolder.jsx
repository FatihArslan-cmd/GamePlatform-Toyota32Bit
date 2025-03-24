import React from "react";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";

const MyLoader = React.memo((props) => (
  <ContentLoader
    speed={0.3}
    width={800}  
    height={460}
    viewBox="0 0 800 460"
    backgroundColor="#707070"
    foregroundColor="#ffffff"
    {...props}
  >
    <Rect x="21" y="2" rx="10" ry="10" width="155" height="187" /> 
    <Rect x="211" y="2" rx="10" ry="10" width="155" height="187" />
    <Rect x="401" y="2" rx="10" ry="10" width="155" height="187" />
    <Rect x="591" y="2" rx="10" ry="10" width="155" height="187" />
    
    <Rect x="21" y="230" rx="10" ry="10" width="155" height="187" />
    <Rect x="211" y="230" rx="10" ry="10" width="155" height="187" />
    <Rect x="401" y="230" rx="10" ry="10" width="155" height="187" />
    <Rect x="591" y="230" rx="10" ry="10" width="155" height="187" />
    
    <Rect x="57" y="200" rx="5" ry="5" width="83" height="11" />
    <Rect x="247" y="200" rx="5" ry="5" width="83" height="11" />
    <Rect x="437" y="200" rx="5" ry="5" width="83" height="11" />
    <Rect x="627" y="200" rx="5" ry="5" width="83" height="11" />
    
    <Rect x="57" y="428" rx="5" ry="5" width="83" height="11" />
    <Rect x="247" y="428" rx="5" ry="5" width="83" height="11" />
    <Rect x="437" y="428" rx="5" ry="5" width="83" height="11" />
    <Rect x="627" y="428" rx="5" ry="5" width="83" height="11" />
  </ContentLoader>
));

export default MyLoader;
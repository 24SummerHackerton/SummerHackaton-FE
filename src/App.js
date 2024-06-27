import React from "react";

// 정규식을 사용하여 모바일 디바이스를 감지하는 함수
const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

const App = () => {
  const isMobile = isMobileDevice();

  return <div>{isMobile ? <MobileComponent /> : <DesktopComponent />}</div>;
};

const DesktopComponent = () => (
  <div>
    <h1>This is the Desktop View</h1>
    {/* 데스크톱용 컴포넌트 */}
  </div>
);

const MobileComponent = () => (
  <div>
    <h1>This is the Mobile View</h1>
    {/* 모바일용 컴포넌트 */}
  </div>
);

export default App;

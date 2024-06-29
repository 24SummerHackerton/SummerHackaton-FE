import GoogleSignin from "./components/google-login";

export default function DesktopLogin() {
  return (
    <div className="bg-pointRed bg-opacity-10 w-full h-[100vh] flex">
      <div className="flex-1 flex justify-center items-center">
        <div className="text-pointRed bebas text-[300px]">ChePL</div>
      </div>
      <div className="flex-1 flex justify-center items-center flex-col">
        <div className="mb-4 text-[38px]">
          <div className="text-left w-[600px]">당신의 수고로움을 덜어줄</div>
          <div className="text-right">우리만의 "체육대회 플래너"</div>
        </div>

        <GoogleSignin />
      </div>
    </div>
  );
}

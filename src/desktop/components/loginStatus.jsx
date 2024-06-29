import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

export default function LoginStatus() {
  const navigate = useNavigate();
  const onLogout = async () => {
    const ok = window.confirm("Are you sure?");
    if (ok) {
      await auth.signOut();
      navigate("/login");
    }
  };
  return (
    <div
      className="bg-pointRed text-white py-3 rounded-full text-center cursor-pointer w-[80%] mx-auto"
      onClick={onLogout}
    >
      로그아웃
    </div>
  );
}

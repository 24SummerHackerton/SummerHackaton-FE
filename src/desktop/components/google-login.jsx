import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, database } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

export default function GoogleSignin() {
  const navigate = useNavigate();
  const onGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    const user = auth.currentUser;
    await setDoc(doc(database, "user", user.uid), {
      email: user.email,
      name: user.displayName,
    });
    navigate("/");
  };
  return (
    <button
      className="bg-pointRed text-white px-16 py-2 rounded-2xl mt-24 text-[27px] w-[700px] h-[100px]"
      onClick={onGoogleLogin}
    >
      구글로 시작하기
    </button>
  );
}

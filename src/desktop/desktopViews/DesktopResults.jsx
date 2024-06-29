import { useRecoilState } from "recoil";
import { resultList } from "../../atom";
import ResultPageCard from "../components/resultPageCard";
import { doc, getDoc } from "firebase/firestore";
import { database } from "../../firebase";
import { useEffect, useState } from "react";

export default function DesktopResults() {
  const [results, setRes] = useState([]);
  const getResults = async () => {
    const ref = doc(database, "players", "결과");
    const docSnap = await getDoc(ref);

    if (docSnap.exists()) {
      const temp = docSnap.data();
      setRes(Object.values(temp));
    } else {
      console.log("No such document!");
    }
  };
  useEffect(() => {
    getResults();
  }, []);
  const what = () => {
    if (results.length !== 0) {
      return (
        <>
          <div className="font-bold text-3xl text-center w-full mb-10">
            경기 결과
          </div>
          <div>
            {results.map((res, i) => (
              <ResultPageCard res={res} key={i} />
            ))}
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="font-bold text-3xl text-center w-full mb-10">
            경기 결과
          </div>
          <div className="text-black">진행한 경기가 없습니다.</div>
        </>
      );
    }
  };
  return (
    <div className="py-10 flex flex-col items-center justify-center w-full">
      {what()}
    </div>
  );
}

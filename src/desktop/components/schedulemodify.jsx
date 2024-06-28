import { useRecoilState } from "recoil";
import { resultList, scheduleStatus } from "../../atom";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { database } from "../../firebase";

export default function ScheduleModify({ g, isDone, setIsDone }) {
  const [schedules, setSchedules] = useRecoilState(scheduleStatus);
  const [results, setResults] = useRecoilState(resultList);
  const scheduleRef = doc(database, "players", "대진");
  const resultRef = doc(database, "players", "결과");
  function parseObject(data) {
    return data.reduce((acc, item) => {
      acc[item[5]] = item;
      return acc;
    }, {});
  }
  const onSubmitElse = async (e) => {
    e.preventDefault();
    const resultValue = [e.target[0].value, e.target[1].value];
    e.target[0].value = null;
    e.target[1].value = null;
    let temp = schedules;
    let sliceInd = null;
    let done = null;
    temp.forEach((t) => {
      if (t[5] === g[5]) {
        sliceInd = temp.indexOf(t);
        done = schedules[sliceInd];
        setResults((prev) => prev.concat([done.concat(resultValue)]));
        setSchedules(temp.slice(0, sliceInd).concat(temp.slice(sliceInd + 1)));
      }
    });
    const convertedData = parseObject(
      temp.slice(0, sliceInd).concat(temp.slice(sliceInd + 1))
    );
    let tempRes = results;
    const convert = parseObject(tempRes.concat([done.concat(resultValue)]));
    console.log(convert);

    await setDoc(scheduleRef, convertedData);
    await setDoc(resultRef, convert);
    alert("결과가 입력되었습니다!");
    setIsDone((prev) => !prev);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const winner = e.target[0].value;
    let temp = schedules;

    temp.forEach((t) => {
      if (t[5] === g[5]) {
        const sliceInd = temp.indexOf(t);
        if (temp[sliceInd][2] === winner) {
          let done = schedules[sliceInd];
          setResults((prev) => prev.concat([done.concat([1, 0])]));
          setSchedules(
            temp.slice(0, sliceInd).concat(temp.slice(sliceInd + 1))
          );
          alert("결과가 입력되었습니다!");
        } else if (temp[sliceInd][3] === winner) {
          let done = schedules[sliceInd];
          setResults((prev) => prev.concat([done.concat([0, 1])]));
          setSchedules(
            temp.slice(0, sliceInd).concat(temp.slice(sliceInd + 1))
          );
          alert("결과가 입력되었습니다!");
        } else {
          alert("팀명을 다시 입력해주세요!");
        }
      }
    });

    setIsDone((prev) => !prev);
  };
  return (
    <div className="flex items-center gap-10">
      <div className="w-[80px]">{g[1]}</div>

      {isDone ? (
        g[0] === "계주" ? (
          <form
            className="w-[700px] text-center flex justify-between items-center"
            onSubmit={onSubmit}
          >
            <div>{g[2]}</div>
            <div>:</div>

            <div>{g[3]}</div>

            <div>
              <div>{g[4]}</div>
            </div>

            <input
              required
              type="text"
              placeholder="승리팀을 입력해주세요"
              className="placeholder:text-[12px] border-2 rounded-md border-black py-1 w-[115px]"
            />

            <input
              type="submit"
              value="완료"
              className="cursor-pointer bg-pointRed text-white py-3 px-5 rounded-xl"
            />
          </form>
        ) : (
          <form
            className="w-[700px] text-center flex justify-between items-center"
            onSubmit={onSubmitElse}
          >
            <div>{g[2]}</div>
            <input
              required
              type="number"
              className="border-2 rounded-md border-black py-1 w-10"
            />
            <div>:</div>
            <input
              required
              type="number"
              className="border-2 rounded-md border-black py-1 w-10"
            />
            <div>{g[3]}</div>

            <div>
              <div>{g[4]}</div>
            </div>

            <input
              type="submit"
              value="완료"
              className="cursor-pointer bg-pointRed text-white py-3 px-5 rounded-xl"
            />
          </form>
        )
      ) : (
        <>
          <div className="w-[300px] text-center">
            {g[2]} : {g[3]}
          </div>

          <div>
            <div>{g[4]}</div>
          </div>
        </>
      )}
    </div>
  );
}

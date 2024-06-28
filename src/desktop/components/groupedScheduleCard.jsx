import { useState } from "react";
import { useRecoilState } from "recoil";
import { resultList, scheduleStatus } from "../../atom";
import ScheduleModify from "./schedulemodify";

export default function GroupedScheduleCard({ group, type }) {
  const [isDone, setIsDone] = useState(false);
  return (
    <div className="border-2 rounded-3xl py-5 px-10 flex flex-col gap-5 mb-10 w-[800px]">
      <div className="flex justify-between">
        <div className="font-bold text-3xl">{type}</div>
        <div
          className="bg-black text-white py-2 px-5 rounded-xl cursor-pointer"
          onClick={() => {
            setIsDone((prev) => !prev);
          }}
        >
          결과 입력
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {group.map((g) => {
          return <ScheduleModify g={g} isDone={isDone} setIsDone={setIsDone} />;
        })}
      </div>
    </div>
  );
}

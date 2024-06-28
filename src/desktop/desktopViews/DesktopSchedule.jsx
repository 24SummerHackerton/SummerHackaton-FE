import { useRecoilState } from "recoil";
import { scheduleStatus } from "../../atom";
import { useEffect, useState } from "react";
import GroupedScheduleCard from "../components/groupedScheduleCard";

function divide(schedules) {
  let temp = schedules;
  const groupedData = temp.reduce((acc, current) => {
    const key = current[0]; // 첫 번째 요소를 키로 사용
    if (!acc[key]) {
      acc[key] = []; // 키가 존재하지 않으면 빈 배열을 생성
    }
    acc[key].push(current); // 현재 요소를 키에 해당하는 배열에 추가
    return acc;
  }, {});

  const groupedArray = Object.keys(groupedData).map((key) => groupedData[key]);

  return groupedArray;
}

export default function DesktopSchedule() {
  const [schedules, setSchedules] = useRecoilState(scheduleStatus);
  const [group, setGroup] = useState([]);
  useEffect(() => {
    setGroup(divide(schedules));
  }, [schedules]);
  return (
    <div className="py-5 flex flex-col items-center gap-5">
      <div className="text-3xl font-bold">경기 일정관리</div>
      <div>
        {group.map((t, i) => {
          return <GroupedScheduleCard group={t} type={t[0][0]} key={i} />;
        })}
      </div>
    </div>
  );
}

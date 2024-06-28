import ScheduleCard from "./scheduleCard";

const schedules = [
  ["축구", "결승전", "컴퓨터공학과", "이탈리아어통번역학과", "24.07.30(화)"],
  ["농구", "결승전", "데이터융합학부", "반도체공학과", "24.07.30(화)"],
  ["피구", "4강", "통계학과", "컴퓨터공학과", "24.07.29(화)"],
  ["축구", "4강", "컴퓨터공학과", "스페인통번역학과", "24.07.28(화)"],
  ["계주", "8강", "컴퓨터공학과", "바이오메디컬공학과", "24.07.26(화)"],
  [
    "줄다리기",
    "결승전",
    "컴퓨터공학과",
    "이탈리아어통번역학과",
    "24.07.15(화)",
  ],
];
function parseDate(dateStr) {
  const [year, month, day] = dateStr
    .split(/[.()]/)
    .filter((part) => part.trim() && !isNaN(part));
  const parsedYear = parseInt(year) + 2000; // 24를 2024로 변환
  const parsedMonth = parseInt(month) - 1; // 월은 0부터 시작하므로 1을 빼줌
  const parsedDay = parseInt(day);
  return new Date(parsedYear, parsedMonth, parsedDay);
}

export default function Todo() {
  // 데이터 정렬
  const sortedData = schedules.sort(
    (a, b) => parseDate(a[4]) - parseDate(b[4])
  );
  return (
    <div>
      {sortedData.map((schedule, i) => {
        console.log(schedule);
        return <ScheduleCard key={i} schedule={schedule} />;
      })}
    </div>
  );
}

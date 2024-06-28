import { PiSoccerBallFill } from "react-icons/pi";

export default function ScheduleCard() {
  return (
    <div className="flex justify-between items-center w-[450px]">
      <input type="checkbox" value="done" className="w-5 h-5" />

      <div className="font-bold text-[18px] flex items-center">
        <PiSoccerBallFill className="text-[23px]" />
        컴퓨터공학과 vs 이탈리아통번역학과
      </div>
      <div className="text-center text-blue-600">
        <div>24.07.30(화)</div>
        <div>결승전</div>
      </div>
    </div>
  );
}

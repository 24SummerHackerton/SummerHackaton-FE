import { useNavigate } from "react-router-dom";

export default function PartCard() {
  const navigate = useNavigate();
  return (
    <div className="border-2 border-black rounded-md w-[400px] px-3 py-2">
      <div className="flex justify-between">
        <div className="">
          <div className="font-bold text-2xl">종목 이름</div>
          <div>모집현황: 4팀</div>
        </div>

        <div className="flex self-start items-center gap-2 rounded-full shadow-md px-3">
          <div className="bg-green-300 rounded-full w-2 h-2" />
          모집중
        </div>
      </div>

      <div
        className="cursor-pointer flex justify-center items-center px-4 py-1 rounded-full bg-black text-white hover:bg-gray-500"
        onClick={() => navigate("/manage")}
      >
        관리
      </div>
    </div>
  );
}

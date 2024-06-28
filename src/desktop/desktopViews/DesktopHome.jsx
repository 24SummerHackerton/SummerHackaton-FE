import React, { useEffect, useState } from "react";
import PartCard from "../components/partCard";
import { PiSoccerBallFill } from "react-icons/pi";
import { PiBaseballHelmetFill } from "react-icons/pi";
import { GiSoccerField } from "react-icons/gi";
import { MdSportsFootball } from "react-icons/md";
import { FaBaseballBatBall } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Todo from "../components/todo";
import { auth, database } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { eventsState } from "../../atom";
import { useRecoilState } from "recoil";

export default function DesktopHome() {
  const [events, setEvents] = useRecoilState(eventsState);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [teams, setTeams] = useState({});
  const navigate = useNavigate();
  const user = auth.currentUser;
  const getPlayers = async () => {
    const docRef = doc(database, "players", "축구");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const temp = docSnap.data();
      setEvents(Object.values(temp));
      //setEvents(temp.values());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    getPlayers();
    if (selectedEvent) {
      const filteredData = events.filter((item) => item[4] === selectedEvent);

      const groupedTeams = filteredData.reduce((acc, item) => {
        const teamName = item[5];
        if (!acc[teamName]) {
          acc[teamName] = [];
        }
        acc[teamName].push({
          major: item[0],
          studentId: item[1],
          name: item[2],
          phone: item[3],
        });
        return acc;
      }, {});

      setTeams(groupedTeams);
      setSelectedTeam("");
    }
  }, [selectedEvent]);
  return (
    <div className="w-full">
      <div className="bg-pointRed text-white w-full px-52 h-[40vh] flex flex-col justify-center items-center overflow-hidden">
        <PiSoccerBallFill className="absolute text-[300px] left-72 top-52" />
        <PiBaseballHelmetFill className="absolute text-[250px] left-[300px] top-[-100px] rotate-45" />
        <MdSportsFootball className="absolute text-[250px] left-[190px] rotate-[20deg] top-[60px]" />
        <GiSoccerField className="absolute text-[400px] -rotate-[60deg] left-[400px] top-[-50px]" />
        <FaBaseballBatBall className="text-[180px] rotate-[-90deg] absolute left-[570px] top-[200px]" />

        <div className="text-center bebas text-[200px] flex justify-center items-center">
          ChePl
        </div>
      </div>

      <div className="flex gap-5 justify-center ">
        <div className="flex flex-col gap-5 relative z-10 px-10 py-5">
          <div className="text-2xl font-bold">현재 개설된 종목</div>
          <PartCard manageText="관리" onClick={() => navigate("/manage")} />
        </div>

        <div className="flex flex-col gap-5 relative z-10 px-10 py-5">
          <div className="">
            <Todo />
          </div>
        </div>
      </div>
    </div>
  );
}

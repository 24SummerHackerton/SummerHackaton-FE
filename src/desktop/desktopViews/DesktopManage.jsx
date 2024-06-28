import React, { useState, useEffect } from "react";
import Tournament from "../components/tournament";
import data from "./data.json";  // JSON 파일을 불러옵니다.

export default function DesktopManage() {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [teams, setTeams] = useState({});

  useEffect(() => {
    if (selectedEvent) {
      // 선택된 종목으로 데이터를 필터링
      const filteredData = data.filter(item => item[5] === selectedEvent);

      // 팀별로 데이터 그룹화
      const groupedTeams = filteredData.reduce((acc, item) => {
        const teamName = item[6];
        if (!acc[teamName]) {
          acc[teamName] = [];
        }
        acc[teamName].push({
          major: item[0],
          studentId: item[1],
          name: item[2],
          phone: item[4]
        });
        return acc;
      }, {});

      setTeams(groupedTeams);
      setSelectedTeam("");  // 팀 선택 초기화
    }
  }, [selectedEvent]);

  const handleTeamClick = (team) => {
    if (selectedTeam === team) {
      setSelectedTeam("");
    } else {
      setSelectedTeam(team);
    }
  };

  const handleEventSubmit = (event) => {
    event.preventDefault();
    const eventValue = event.target.elements.event.value;
    setSelectedEvent(eventValue);
  };

  const renderTeamList = () => (
    <div className="team-list text-center">
      {Object.keys(teams).map((team, index) => (
        <div
          key={index}
          className="text-xl cursor-pointer m-2 border-2 rounded-xl border-pointRed"
          onClick={() => handleTeamClick(team)}
        >
          팀 {team}
        </div>
      ))}
    </div>
  );

  const renderSelectedTeam = () => {
    if (selectedTeam === "") {
      return <div>팀 정보를 보고 싶으면 팀 이름을 클릭하세요.</div>;
    }

    const selectedTeamData = teams[selectedTeam];

    return (
      <div className="team-details">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">번호</th>
              <th className="py-2">이름</th>
              <th className="py-2">학번</th>
              <th className="py-2">학과</th>
              <th className="py-2">전화번호</th>
            </tr>
          </thead>
          <tbody>
            {selectedTeamData.map((participant, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{participant.name}</td>
                <td className="border px-4 py-2">{participant.studentId}</td>
                <td className="border px-4 py-2">{participant.major}</td>
                <td className="border px-4 py-2">{participant.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="flex">
      <div className="w-1/4 p-4 border-r-2">
        {!selectedEvent ? (
          <div>
            <h2>종목을 선택하세요</h2>
            <form onSubmit={handleEventSubmit}>
              <input
                type="text"
                name="event"
                placeholder="종목 입력"
                required
                className="border rounded p-2"
              />
              <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                확인
              </button>
            </form>
          </div>
        ) : (
          <div>
            <div>종목: {selectedEvent}</div>
            {renderTeamList()}
          </div>
        )}
      </div>
      <div className="w-3/4 p-4">
        {selectedEvent ? renderSelectedTeam() : <div>종목을 먼저 선택하세요.</div>}
      </div>
      <Tournament />
    </div>
  );
}

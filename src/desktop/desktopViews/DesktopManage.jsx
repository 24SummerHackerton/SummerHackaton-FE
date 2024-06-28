import React, { useState, useEffect } from "react";
import Tournament from "../components/tournament";
import data from "./data.json"; // JSON 파일을 불러옵니다.

export default function DesktopManage() {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [teams, setTeams] = useState({});
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [currentTeam, setCurrentTeam] = useState("선택 된 팀이 없습니다.");

  useEffect(() => {
    if (selectedEvent) {
      // 선택된 종목으로 데이터를 필터링
      const filteredData = data.filter((item) => item[5] === selectedEvent);

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
          phone: item[4],
        });
        return acc;
      }, {});

      setTeams(groupedTeams);
      setSelectedTeam(""); // 팀 선택 초기화
    }
  }, [selectedEvent]);

  const handleTeamClick = (team) => {
    setSelectedTeam(team);
    setEditingPlayer(null); // 선수 수정 모드 초기화
  };

  const handleEventSubmit = (event) => {
    event.preventDefault();
    const eventValue = event.target.elements.event.value;
    setSelectedEvent(eventValue);
  };

  const handleEditPlayer = (index) => {
    setEditingPlayer(index);
  };

  const handleSavePlayer = (index) => {
    setEditingPlayer(null);
  };

  const handleDeletePlayer = (index) => {
    setTeams((prevTeams) => {
      const updatedTeams = { ...prevTeams };
      updatedTeams[selectedTeam] = updatedTeams[selectedTeam].filter(
        (_, i) => i !== index
      );
      return updatedTeams;
    });
  };

  const handleInputChange = (e, field, index) => {
    const { value } = e.target;
    setTeams((prevTeams) => {
      const updatedTeams = { ...prevTeams };
      updatedTeams[selectedTeam][index][field] = value;
      return updatedTeams;
    });
  };

  const handleSendLink = () => {
    // 링크 전송 로직 구현
    alert("선수 추가 링크가 전송되었습니다.");
  };

  const renderTeamList = () => (
    <div className="team-list text-center flex ">
      {Object.keys(teams).map((team, index) => (
        <div
          key={index}
          className="text-xl cursor-pointer m-2 border-2 rounded-xl border-pointRed px-5"
          onClick={() => {
            handleTeamClick(team);
            setCurrentTeam(team);
          }}
        >
          {team}
        </div>
      ))}
    </div>
  );

  const renderSelectedTeam = () => {
    if (selectedTeam === "") {
      return (
        <div className="text-center">
          팀 정보를 보고 싶으면 팀 이름을 클릭하세요.
        </div>
      );
    }

    const selectedTeamData = teams[selectedTeam];

    return (
      <div className="team-details">
        <div className="text-2xl">
          현재 표시된 팀은 <strong>{currentTeam}</strong> 입니다.
        </div>
        <button
          onClick={handleSendLink}
          className="bg-pointRed text-white p-2 rounded mt-4"
        >
          선수 추가 링크 전송
        </button>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">번호</th>
              <th className="py-2">이름</th>
              <th className="py-2">학번</th>
              <th className="py-2">학과</th>
              <th className="py-2">전화번호</th>
              <th className="py-2">수정</th>
              <th className="py-2">삭제</th>
            </tr>
          </thead>
          <tbody>
            {selectedTeamData.map((participant, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">
                  {editingPlayer === index ? (
                    <input
                      type="text"
                      value={participant.name}
                      onChange={(e) => handleInputChange(e, "name", index)}
                    />
                  ) : (
                    participant.name
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editingPlayer === index ? (
                    <input
                      type="text"
                      value={participant.studentId}
                      onChange={(e) => handleInputChange(e, "studentId", index)}
                    />
                  ) : (
                    participant.studentId
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editingPlayer === index ? (
                    <input
                      type="text"
                      value={participant.major}
                      onChange={(e) => handleInputChange(e, "major", index)}
                    />
                  ) : (
                    participant.major
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editingPlayer === index ? (
                    <input
                      type="text"
                      value={participant.phone}
                      onChange={(e) => handleInputChange(e, "phone", index)}
                    />
                  ) : (
                    participant.phone
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editingPlayer === index ? (
                    <button onClick={() => handleSavePlayer(index)}>
                      저장
                    </button>
                  ) : (
                    <button onClick={() => handleEditPlayer(index)}>
                      수정
                    </button>
                  )}
                </td>
                <td className="border px-4 py-2">
                  <button onClick={() => handleDeletePlayer(index)}>
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="p-4">
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
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
              >
                확인
              </button>
            </form>
          </div>
        ) : (
          <div>
            <div className="text-[35px] font-bold">{selectedEvent}</div>
            {renderTeamList()}
          </div>
        )}
      </div>
      <div className="w-3/4 p-4">
        {selectedEvent ? (
          renderSelectedTeam()
        ) : (
          <div className="">종목을 먼저 선택하세요.</div>
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import data from "./data.json"; // JSON 파일을 불러옵니다.
import PartCard from "../components/partCard";
import DesktopCreate from "./DesktopCreate"; // 적절한 경로로 수정

export default function DesktopManage() {
  const [selectedEvent, setSelectedEvent] = useState("축구");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [teams, setTeams] = useState({});
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [currentTeam, setCurrentTeam] = useState("선택 된 팀이 없습니다.");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
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
  }, [selectedEvent]);

  const handleTeamClick = (team) => {
    setSelectedTeam(team);
    setEditingPlayer(null); // 선수 수정 모드 초기화
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
    <div className="team-list text-center flex flex-wrap">
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
        <div className="">팀 정보를 보고 싶으면 팀 이름을 클릭하세요.</div>
      );
    }

    const selectedTeamData = teams[selectedTeam];

    return (
      <div className="team-details mt-4">
        <div className="text-2xl font-bold">
          현재 표시된 팀은 {currentTeam} 입니다.
        </div>
        <button
          onClick={handleSendLink}
          className="bg-pointRed text-white p-2 rounded mt-4"
        >
          선수 추가 링크 전송
        </button>
        <table className="min-w-full bg-white mt-4 table-fixed">
          <thead>
            <tr>
              <th className="py-2 w-1/12">번호</th>
              <th className="py-2 w-2/12">이름</th>
              <th className="py-2 w-2/12">학번</th>
              <th className="py-2 w-2/12">학과</th>
              <th className="py-2 w-3/12">전화번호</th>
              <th className="py-2 w-1/12">수정</th>
              <th className="py-2 w-1/12">삭제</th>
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
                      className="w-full"
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
                      className="w-full"
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
                      className="w-full"
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
                      className="w-full"
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

  useEffect(() => {
    // 페이지 로드 시 가장 위에 있는 종목을 선택
    setSelectedEvent("축구");
  }, []);

  return (
    <div className="flex">
      <div className="w-[500px] border-2">
        <div className="text-3xl font-bold mb-4">종목 관리</div>
        <div className="flex flex-col gap-4">
          <PartCard
            manageText="종목 상세보기"
            onClick={() => setSelectedEvent("축구")}
          />
          <PartCard
            manageText="종목 상세보기"
            onClick={() => setSelectedEvent("야구")}
          />
          <PartCard
            manageText="종목 상세보기"
            onClick={() => setSelectedEvent("피구")}
          />
          <PartCard
            manageText="종목 상세보기"
            onClick={() => setSelectedEvent("계주")}
          />
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white p-2 rounded mt-4"
        >
          종목 추가
        </button>
      </div>
      <div className="w-[800px] p-4">
        {selectedEvent && (
          <>
            <div className="text-3xl font-bold mb-4">팀 관리</div>
            <div className="text-[35px] font-bold mb-4">{selectedEvent}</div>
            {renderTeamList()}
            {renderSelectedTeam()}
          </>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <DesktopCreate onClose={() => setIsModalOpen(false)} />
        </div>
      )}
    </div>
  );
}

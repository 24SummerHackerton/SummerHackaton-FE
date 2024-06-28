import React, { useState } from "react";
import Tournament from "../components/tournament";

export default function DesktopManage() {
  const event = "축구";
  const [teamA, setTeamA] = useState([
    {
      name: "구윤찬",
      studentId: "202301",
      major: "컴퓨터공학",
      phone: "010-1234-5678",
    },
    {
      name: "김대현",
      studentId: "202302",
      major: "컴퓨터공학",
      phone: "010-2345-6789",
    },
  ]);

  const [teamB, setTeamB] = useState([
    {
      name: "김민서",
      studentId: "202303",
      major: "이탈리아통번역학",
      phone: "010-3456-7890",
    },
    {
      name: "송강규",
      studentId: "202304",
      major: "컴퓨터공학",
      phone: "010-4567-8901",
    },
  ]);

  return (
    <div>
      <div>종목: {event}</div>
      <div>팀 A 참여 명단</div>
      <ol>
        {teamA.map((participant, index) => (
          <li key={index}>
            <div>이름: {participant.name}</div>
            <div>학번: {participant.studentId}</div>
            <div>학과: {participant.major}</div>
            <div>전화번호: {participant.phone}</div>
          </li>
        ))}
      </ol>
      <div>팀 B 참여 명단</div>
      <ol>
        {teamB.map((participant, index) => (
          <li key={index}>
            <div>이름: {participant.name}</div>
            <div>학번: {participant.studentId}</div>
            <div>학과: {participant.major}</div>
            <div>전화번호: {participant.phone}</div>
          </li>
        ))}
      </ol>
      <Tournament />
    </div>
  );
}

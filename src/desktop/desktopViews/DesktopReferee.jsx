import React, { useState, useEffect } from "react";
import refereeData from "./refData.json";  // JSON 파일을 불러옵니다.

export default function DesktopReferee() {
  const [referees, setReferees] = useState([]);
  const [editingReferee, setEditingReferee] = useState(null);

  useEffect(() => {
    // JSON 데이터를 불러와서 심판 리스트를 설정합니다.
    setReferees(refereeData.map(item => ({
      college: item[0],
      department: item[1],
      studentId: item[2],
      name: item[3],
      phone: item[4],
      team: item[5]
    })));
  }, []);

  const handleEditReferee = (index) => {
    setEditingReferee(index);
  };

  const handleSaveReferee = (index) => {
    setEditingReferee(null);
  };

  const handleDeleteReferee = (index) => {
    setReferees(prevReferees => prevReferees.filter((_, i) => i !== index));
  };

  const handleInputChange = (e, field, index) => {
    const { value } = e.target;
    setReferees(prevReferees => {
      const updatedReferees = [...prevReferees];
      updatedReferees[index][field] = value;
      return updatedReferees;
    });
  };

  return (
    <div className="p-4">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">번호</th>
            <th className="py-2">이름</th>
            <th className="py-2">학과</th>
            <th className="py-2">학번</th>
            <th className="py-2">전화번호</th>
            <th className="py-2">배정된 팀</th>
            <th className="py-2">수정</th>
            <th className="py-2">삭제</th>
          </tr>
        </thead>
        <tbody>
          {referees.map((referee, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">
                {editingReferee === index ? (
                  <input
                    type="text"
                    value={referee.name}
                    onChange={(e) => handleInputChange(e, 'name', index)}
                    className="border rounded p-1 focus:outline-none focus:border-pointRed"
                  />
                ) : (
                  referee.name
                )}
              </td>
              <td className="border px-4 py-2">{referee.department}</td>
              <td className="border px-4 py-2">{referee.studentId}</td>
              <td className="border px-4 py-2">
                {editingReferee === index ? (
                  <input
                    type="text"
                    value={referee.phone}
                    onChange={(e) => handleInputChange(e, 'phone', index)}
                    className="border rounded p-1 focus:outline-none focus:border-pointRed"
                  />
                ) : (
                  referee.phone
                )}
              </td>
              <td className="border px-4 py-2">{referee.team}</td>
              <td className="border px-4 py-2">
                {editingReferee === index ? (
                  <button onClick={() => handleSaveReferee(index)} className="bg-blue-500 text-white p-2 rounded ">
                    저장
                  </button>
                ) : (
                  <button onClick={() => handleEditReferee(index)} className="bg-blue-500 text-white p-2 rounded">
                    수정
                  </button>
                )}
              </td>
              <td className="border px-4 py-2">
                <button onClick={() => handleDeleteReferee(index)} className="bg-red-500 text-white p-2 rounded">
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

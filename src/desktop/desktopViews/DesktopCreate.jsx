import React, { useState } from 'react';

export default function DesktopCreate() {
  const [formData, setFormData] = useState({
    eventName: '',
    participants: '',
    rules: '',
  });

  const [errors, setErrors] = useState({
    eventName: false,
    participants: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { eventName, participants } = formData;
    let valid = true;

    if (eventName.trim() === '') {
      setErrors((prevErrors) => ({ ...prevErrors, eventName: true }));
      valid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, eventName: false }));
    }

    if (participants.trim() === '' || isNaN(participants) || parseInt(participants) <= 0) {
      setErrors((prevErrors) => ({ ...prevErrors, participants: true }));
      valid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, participants: false }));
    }

    if (valid) {
      alert('Form submitted successfully!');
      // Add your form submission logic here
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="text-[30px] font-bold text-center mb-4">종목 개설</div>
      <form className="border-4 border-pointRed rounded-xl p-7 items-center w-[600px] h-[600px] flex flex-col justify-center" onSubmit={handleSubmit}>
        <div className="border-2 rounded-xl p-3 m-3 w-full flex flex-col border-black">
          <label className="mb-2">종목명</label>
          <input
            name="eventName"
            value={formData.eventName}
            onChange={handleInputChange}
            className={`p-2 border rounded ${errors.eventName ? 'border-red-500' : ''}`}
            placeholder="종목명을 입력하세요"
          />
          {errors.eventName && <span className="text-red-500">종목명은 필수 항목입니다.</span>}
        </div>
        <div className="border-2 rounded-xl p-3 m-3 w-full flex flex-col border-black">
          <label className="mb-2">참가 인원</label>
          <input
            name="participants"
            type="number"
            value={formData.participants}
            onChange={handleInputChange}
            className={`p-2 border rounded ${errors.participants ? 'border-red-500' : ''}`}
            placeholder="참가 인원을 입력하세요"
          />
          {errors.participants && <span className="text-red-500">참가 인원은 필수 항목입니다.</span>}
        </div>
        <div className="border-2 rounded-xl p-3 m-3 w-full flex flex-col border-black">
          <label className="mb-2">규칙 (선택 사항)</label>
          <textarea
            name="rules"
            value={formData.rules}
            onChange={handleInputChange}
            className="p-2 border rounded resize-none"
            placeholder="규칙을 입력하세요"
            rows="4"
          />
        </div>
        <button type="submit" className="border-2 rounded-xl p-2 items-center mt-4 bg-pointRed text-white">확인</button>
      </form>
    </div>
  );
}

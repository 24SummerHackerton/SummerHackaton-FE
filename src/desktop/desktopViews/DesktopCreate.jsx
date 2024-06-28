export default function DesktopCreate() {
  return (
    <div>
      <div>
        <h1>종목 생성 페이지</h1>
      </div>
      <form>
        <div>
          <span>종목명</span>
          <input placeholder="종목명을 입력하세요" />
        </div>
        <div>
          <span>참가 인원</span>
          <input type="number" placeholder="참가 인원을 입력하세요" />
        </div>
        <div>
          <div>규칙</div>
          <textarea placeholder="규칙을 적어주세요" />
        </div>
        <button>완료</button>
      </form>
    </div>
  );
}

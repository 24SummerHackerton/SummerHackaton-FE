export default function DesktopCreate() {
  return (
    <div>
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
          <span>규칙</span>
          <input type="text" />
        </div>
      </form>
    </div>
  );
}

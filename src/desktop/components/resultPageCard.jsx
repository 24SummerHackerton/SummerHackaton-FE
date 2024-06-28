export default function ResultPageCard({ res }) {
  return (
    <div className="grid grid-cols-custom w-full px-5">
      <div className="flex flex-col items-start justify-center">
        <div>{res[0]}</div>
        <div>{res[1]}</div>
      </div>
      <div className="grid grid-cols-[2fr_1fr_2fr] justify-around text-xl font-bold py-2">
        <div className="text-center">{res[2]}</div>
        <div className="text-center">
          {res[6]} : {res[7]}
        </div>

        <div className="text-center">{res[3]}</div>
      </div>
      <div className="py-3 text-center">{res[4]}</div>
    </div>
  );
}

import "./style.css";

export default function ImageSection() {
  return (
    <div className="bg-gradient-custom h-screen w-full flex justify-center items-center">
        <div className="relative w-[400px] flex items-center justify-center h-[400px]">
            <div className="bg-white rounded-xl shadow-inner p-4 absolute top-0 z-0">
                <img src="img/board.png" alt="board" className="w-56 h-auto" />
            </div>
            <div className="bg-white rounded-xl shadow-inner p-4 z-10 absolute bottom-10 left-0">
                <img src="img/calculator.png" alt="board" className="w-32 h-auto" />
            </div>
            <div className="bg-white rounded-xl shadow-inner p-4 z-10 absolute bottom-20 right-0">
                <img src="img/cart.png" alt="board" className="w-36 h-auto" />
            </div>
        </div>
    </div>
  );
}

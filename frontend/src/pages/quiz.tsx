import '../app/globals.css';

export default function Quiz() {
  return (
    <div className="bg-custom-aqua min-h-screen flex flex-col items-center justify-center">
      {/* Timer at the top */}
      <div className="text-5xl font-bold mb-8 p-4">
        30
      </div>

      {/* Question section */}
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800">What is 2 + 2?</h2>
      </div>

      {/* Answer buttons in a 2x2 grid */}
      <div className="grid grid-cols-2 gap-4 max-w-xs w-full">
        <button className="bg-custom-brown p-4 text-white font-bold rounded-lg shadow-md transform transition duration-150 ease-in-out hover:scale-105 active:scale-90">
          1
        </button>
        <button className="bg-custom-orange p-4 text-white font-bold rounded-lg shadow-md transform transition duration-150 ease-in-out hover:scale-105 active:scale-90">
          2
        </button>
        <button className="bg-custom-orange p-4 text-white font-bold rounded-lg shadow-md transform transition duration-150 ease-in-out hover:scale-105 active:scale-90">
          3
        </button>
        <button className="bg-custom-brown p-4 text-white font-bold rounded-lg shadow-md transform transition duration-150 ease-in-out hover:scale-105 active:scale-90">
          4
        </button>
      </div>
    </div>
  );
}
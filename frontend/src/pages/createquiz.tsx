import '../app/globals.css';
export default function CreateQuiz() {
    return (
        <div className="bg-custom-aqua min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-center mb-6">NEW QUIZ</h1>
            <button className = "mb-5 bg-custom-yellow p-4 text-white font-bold rounded-lg shadow-md transform transition duration-150 ease-in-out hover:scale-105 active:scale-90">Import CSV file</button>
            <div className="bg-green-400 p-6 rounded-lg shadow-md max-w-2xl w-full mb-8">
            <h2 className="text-xl text-gray-800 mb-4">Create a name for your quiz</h2>
            <input type="text" className="text-gray-800 mb-4" placeholder="Snails"/>
            <p></p>
            <input id="default-checkbox" type="checkbox" value="" className="w-5 h-5"/>
            <label htmlFor="default-checkbox" className="ml-2 text-xl text-gray-800">Allow PowerUps?</label>
            </div>

        </div>
    );
}
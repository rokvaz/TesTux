import '../app/globals.css';


export default function Leaderboard() {
    
    return (
        <div className="bg-custom-aqua min-h-screen flex flex-col items-center justify-center">
        {/* Title Section */}    
            <h1 className="text-4xl font-bold text-center mb-6">LeaderBoard</h1>
            <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl w-full mb-8">
            <table className="table-auto w-full border border-gray-800">
            <thead>
                <tr className="text-gray-800 px-4 py-2">
                    <th className="px-4 py-2 border border-gray-800">Nr</th>
                    <th className="px-4 py-2 border border-gray-800">Username</th>
                    <th className="px-4 py-2 border border-gray-800">Time</th>
                    <th className="px-4 py-2 border border-gray-800">Awsners</th>
                </tr>
            </thead>
            <tbody>
                <tr className = "text-gray-800 text-center bg-amber-400">
                    <td className="px-4 py-2 border border-gray-800 ">1</td>
                    <td className="px-4 py-2 border border-gray-800">Petras</td>
                    <td className="px-4 py-2 border border-gray-800">1:00</td>
                    <td className="px-4 py-2 border border-gray-800">28/30</td>
                </tr>
            </tbody>
            <tbody>
                <tr className = "text-gray-800 text-center bg-gray-300">
                    <td className="px-4 py-2 border border-gray-800">2</td>
                    <td className="px-4 py-2 border border-gray-800">Aloyzas</td>
                    <td className="px-4 py-2 border border-gray-800">1:30</td>
                    <td className="px-4 py-2 border border-gray-800">27/30</td>
                </tr>
            </tbody>
            <tbody>
                <tr className = "text-gray-800 text-center bg-orange-600">
                    <td className="px-4 py-2 border border-gray-800">3</td>
                    <td className="px-4 py-2 border border-gray-800">Algis</td>
                    <td className="px-4 py-2 border border-gray-800">2:00</td>
                    <td className="px-4 py-2 border border-gray-800">25/30</td>
                </tr>
            </tbody>
            <tbody>
                <tr className = "text-gray-800 text-center">
                    <td className="px-4 py-2 border border-gray-800">4</td>
                    <td className="px-4 py-2 border border-gray-800">Ingvaras</td>
                    <td className="px-4 py-2 border border-gray-800">2:30</td>
                    <td className="px-4 py-2 border border-gray-800">24/30</td>
                </tr>
            </tbody>
            <tbody>
                <tr className = "text-gray-800 text-center">
                    <td className="px-4 py-2 border border-gray-800">5</td>
                    <td className="px-4 py-2 border border-gray-800">Aldona</td>
                    <td className="px-4 py-2 border border-gray-800">3:00</td>
                    <td className="px-4 py-2 border border-gray-800">24/30</td>
                </tr>
            </tbody>
            </table>
            </div>
            </div>);
}
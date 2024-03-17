import '../app/globals.css';
import Link from 'next/link';

export default function GameOver() {
    return (
    <div className="bg-custom-aqua min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-center mb-6 text-rose-600">GAME OVER</h1>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl w-full mb-8">
            <div className = "grid grid-cols-4 gap-6 py-2 text-center ">
                <div className = "bg-lime-400 p-4 text-black font-bold rounded-full shadow-md  border-4 border-indigo-500">Quiz Name</div>
                <div className = "bg-lime-400 p-4 text-black font-bold rounded-full shadow-md  border-4 border-indigo-500">Time spent</div>
                <div className = "bg-lime-400 p-4 text-black font-bold rounded-full shadow-md  border-4 border-indigo-500">Awnsers</div>
                <div className = "bg-lime-400 p-4 text-black font-bold rounded-full shadow-md  border-4 border-indigo-500">Powerups</div>
            </div>
            <div className = "grid grid-cols-4 gap-6 text-center">
                <div className = "bg-custom-brown p-4 text-white font-bold rounded-lg shadow-md">Music Genres</div>
                <div className = "bg-custom-brown p-4 text-white font-bold rounded-lg shadow-md">1min. 45s.</div>
                <div className = "bg-custom-brown p-4 text-white font-bold rounded-lg shadow-md">16 out of 30</div>
                <div className = "bg-custom-brown p-4 text-white font-bold rounded-lg shadow-md">3</div>    
            </div>    

        </div>
        <div className = "grid grid-cols-3 gap-6 text-center py-5 space-x-6">
            <Link href= "/quiz"><button className = "bg-custom-yellow p-4 text-white font-bold rounded-lg shadow-md transform transition duration-150 ease-in-out hover:scale-105 active:scale-90 ">Play again</button></Link>
            <Link href= "/menu"><button className = "bg-custom-yellow p-4 text-white font-bold rounded-lg shadow-md transform transition duration-150 ease-in-out hover:scale-105 active:scale-90 ">Menu</button></Link>
            <Link href="/howtoplay"><button className = "bg-custom-yellow p-4 text-white font-bold rounded-lg shadow-md transform transition duration-150 ease-in-out hover:scale-105 active:scale-90 ">Help</button></Link>
        </div>
    </div>

    );
}
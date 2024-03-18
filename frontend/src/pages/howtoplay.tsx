import '../app/globals.css';
import Link from 'next/link';

export default function HowToPlay() {
    return (
        <div className="bg-custom-aqua min-h-screen flex flex-col items-center justify-center">
            {/* Title Section */}
                <h1 className="text-4xl font-bold text-center mb-6">How to Play</h1>

            {/* Instructions Section */}
            <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl w-full mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Game Instructions</h2>
            <div className="text-gray-800 mb-8">
                <p>Read the question being presented</p>
                <p>Answer the question before the timer runs out</p>
                <p>Use special items if you need some extra help</p>
                <p>Answer as many questions as possible</p>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Uploading a custom quiz</h2>
            <div className="text-gray-800 mb-8">
                <p>Create a quiz in a csv format</p>
                <p>[provide an example of the format]</p>
                <p>Click the upload button</p>
            </div>
            </div>

            {/* Navigation/Back Button */}
            <Link href="/main"><button className="mt-4 px-4 py-2 bg-custom-brown text-white font-bold rounded transform transition duration-150 ease-in-out hover:scale-105 active:scale-90">
            Back to Menu
            </button></Link>
        </div>
    );
}

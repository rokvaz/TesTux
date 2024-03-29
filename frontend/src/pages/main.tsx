import '../app/globals.css';
import Link from 'next/link';

export default function Main() {
  return (
    <div className="bg-custom-aqua min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-center mb-6">Welcome to TesTux</h1>

          {/* Main page buttons */}  
          <div className="inline-block space-x-10">
            <Link href="/quiz"><button className="mt-4 px-10 py-2 bg-custom-brown text-white font-bold rounded transform transition duration-150 ease-in-out hover:scale-105 active:scale-90">
            Quiz
            </button></Link>
            <Link href="/howtoplay"><button className="mt-4 px-10 py-2 bg-custom-brown text-white font-bold rounded transform transition duration-150 ease-in-out hover:scale-105 active:scale-90">
            Help
            </button></Link>
          </div>
    </div>
      
  );
}
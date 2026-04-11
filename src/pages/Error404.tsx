import { faCloudBolt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_0%,rgb(220,240,255)_100%),url('/src/assets/images/clouds.jpg')] bg-cover bg-center px-4">
      
      <div className="max-w-md w-full bg-white/60 backdrop-blur-md shadow-2xl rounded-3xl p-8 md:p-12 border border-white/50 text-center flex flex-col items-center animate-fade-in-down">
        
        <div className="w-24 h-24 bg-white/40 rounded-full flex items-center justify-center mb-6 shadow-inner border border-white/60">
          <FontAwesomeIcon icon={faCloudBolt} className="text-5xl text-blue-500 drop-shadow-sm" />
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black text-gray-800 tracking-tighter mb-2 drop-shadow-sm">
          404
        </h1>
        
        <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-4">
          Lost in the clouds?
        </h2>
        
        <p className="text-gray-600 mb-8 leading-relaxed text-sm md:text-base">
          We couldn't find the city or page you were looking for.
        </p>
        
        <Link 
          to="/" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 border border-blue-500 hover:shadow-blue-500/30"
        >
          Back to Home
        </Link>

      </div>
      
    </div>
  );
}
 
export default Error404;
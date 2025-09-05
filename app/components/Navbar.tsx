import { Link } from "react-router"

const Navbar = () => {
  return (
    <nav className="navbar">
        <Link to="/" className="group">
            <p className="text-2xl font-bold text-gradient group-hover:scale-105 transition-transform duration-300 ease-out">
              SkillScan AI
            </p>
        </Link>
        <Link 
          to="/upload" 
          className="relative primary-button w-fit overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25"
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Animated shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
          
          {/* Button text */}
          <span className="relative z-10 group-hover:text-white transition-colors duration-300">
            Upload Resume
          </span>
          
          {/* Subtle border glow */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
        </Link>
    </nav>
  )
}

export default Navbar
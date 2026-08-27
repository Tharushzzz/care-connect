import { Link } from "react-router-dom"
import { ArrowLeft, Eye } from "lucide-react"


const LoginInputs = () => {
  return (
    <div className="flex flex-col gap-4 w-1/2">
        {/* Back btn */}
        <div className="flex w-fit h-fit gap-2 items-center hover:underline">
            <ArrowLeft size={16} strokeWidth={2} color="#000000B2"  />
            <Link to="/" className="text-md text-[#000000B2] ">
                Back to Home
            </Link>
        </div>

        <div className="flex flex-col">
            <div className="text-5xl font-bold leading-16">Welcome back</div>
            <div>Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Create a new account</Link></div>
        </div>

        <div className="flex flex-col w-2/3 gap-4">
            {/* email */}
            <div className="flex flex-col gap-1">
                <div className="text-[#000000B2] text-2xl font-medium">Email address</div>
                <input type="email" placeholder="example@gmail.com" className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            {/* password */}
            <div className="flex flex-col gap-1">
                <div className="text-[#000000B2] text-2xl font-medium">Password</div>
                <div className="flex relative items-center justify-center gap-1 ">
                    <input type="password" placeholder="Password" className="w-full h-12  px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <Eye size={20} strokeWidth={2} color="#000000B2" className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" />
                </div>
                
            </div>
        </div>
           
    </div>
  )
}

export default LoginInputs

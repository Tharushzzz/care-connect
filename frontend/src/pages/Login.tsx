import LoginInputs from "../components/Login/LoginInputs"
import loginimage from "../assets/login/login.jpg"

const Login = () => {
  return (
    <div className="flex w-full py-10 items-center justify-end bg-[#FFF]">
      {/* Left side */}
      <LoginInputs />
      {/* Right side */}
      <img src={loginimage} alt="login" className="w-1/2 bg-cover" />
    </div>
  )
}

export default Login

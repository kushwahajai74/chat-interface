import { useState } from "react";
import logo from "../assets/logo.svg";
import { useAuth } from "../Provider/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const { setIsAuthenticated, setToken, setUser } = useAuth();
  const [login, setLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/users/register", {
        name,
        email,
        password,
        confirmPassword,
      });

      setIsAuthenticated(data.success);
      setToken(data.token);
      setUser(data.user);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/users/login", { email, password });
      setIsAuthenticated(data.success);
      setToken(data.token);
      setUser(data.user);
      toast.success(data.message);
    } catch (error) {
      toast.error("something went wrong");
      console.log(error.response.data.message);
    }
  };

  return login ? (
    <div className="bg-dark_bg min-h-screen flex items-center justify-center w-full ">
      <div className="w-full max-w-sm bg-slate-800 text-center p-6   md:rounded-xl lg:rounded-2xl md:m-5">
        <img src={logo} alt="logo" className="w-14 mx-auto rounded-md mb-6" />
        <p className="text-2xl mb-3 font-bold">Welcome Back</p>
        <p className="text-sm mb-5 text-secondary">
          Please enter your account details
        </p>
        <form className="flex flex-col w-full" onSubmit={handleLoginSubmit}>
          <div className="mb-3">
            <label className="text-xs block text-left mb-2" htmlFor="email">
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              id="email"
              placeholder="johndoe@hotmail.com"
              className="w-full  bg-dark_bg px-2 py-1 rounded-md outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="text-xs block text-left mb-2 ">
              Password
            </label>
            <input
              required
              type="password"
              name="password"
              id="password"
              placeholder="●●●●●●●●"
              value={password}
              onInput={(e) => setPassword(e.target.value)}
              className="w-full bg-dark_bg px-2 py-1 rounded-md outline-none"
            />
          </div>

          <p className="text-sm text-left my-5 font-nunitoSans font-bold">
            Forgot password?
          </p>

          <button
            type="submit"
            className="w-full font-bold bg-primary text-black rounded-md p-2 mb-10"
          >
            Sign in
          </button>
          <p className="text-secondary text-xs">
            Dont have an account?
            <span
              className="font-bold text-primary text-sm cursor-pointer underline"
              onClick={() => setLogin((prev) => !prev)}
            >
              &nbsp;Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  ) : (
    <div className="bg-dark_bg min-h-screen flex items-center justify-center w-full ">
      <div className="w-full max-w-sm bg-slate-800 text-center p-6   md:rounded-xl lg:rounded-2xl md:m-5 ">
        <img src={logo} alt="logo" className="w-14 mx-auto rounded-md mb-6" />
        <p className="text-2xl mb-3 font-bold">Welcome!</p>

        <form className="flex flex-col w-full" onSubmit={onRegisterSubmit}>
          <div className="mb-3">
            <label className="text-xs block text-left mb-2" htmlFor="name">
              Name
            </label>
            <input
              required
              type="text"
              name="name"
              id="name"
              placeholder="John doe"
              className="w-full  bg-dark_bg px-2 py-1 rounded-md outline-none"
              value={name}
              onInput={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="text-xs block text-left mb-2" htmlFor="email">
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              id="email"
              placeholder="johndoe@hotmail.com"
              className="w-full  bg-dark_bg px-2 py-1 rounded-md outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="text-xs block text-left mb-2 ">
              Password
            </label>
            <input
              required
              type="password"
              name="password"
              id="password"
              placeholder="●●●●●●●●"
              className="w-full  bg-dark_bg px-2 py-1 rounded-md outline-none"
              value={password}
              onInput={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="text-xs block text-left mb-2 "
            >
              Confirm password
            </label>
            <input
              required
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="●●●●●●●●"
              className="w-full  bg-dark_bg px-2 py-1 rounded-md outline-none"
              value={confirmPassword}
              onInput={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full font-bold bg-primary text-black rounded-md p-2 mb-10"
          >
            Sign up
          </button>
          <p className="text-secondary text-xs">
            Already have an account?
            <span
              className="font-bold text-primary text-sm cursor-pointer underline"
              onClick={() => setLogin((prev) => !prev)}
            >
              &nbsp;Sign in
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

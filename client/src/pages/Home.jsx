import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="bg-dark_bg flex w-full h-screen items-center justify-center">
        <Link
          to="/login"
          className=" px-10 py-6 font-extrabold rounded-lg shadow-md shadow-slate-500 text-2xl hover:bg-dark_bg_sec transition duration-300 ease-in-out"
        >
          <button type="button">Login 🔐</button>
        </Link>
      </div>
    </>
  );
};

export default Home;

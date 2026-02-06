import React from "react";
import background from "../assets/background.png";
import Img1 from "../assets/img1.png";
import cooking from "../assets/cooking.svg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full">

        {/* Image + Logo */}
        <div className="relative">
          <img
            src={Img1}
            alt="Food Artwork"
            className="w-52 sm:w-64 md:w-80 rounded-xl shadow-xl"
          />

          {/* Center Logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="
                backdrop-blur-md bg-white/10 rounded-full
                flex items-center justify-center shadow-lg
                w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32
              "
            >
              <img
                src={cooking}
                alt="Cooking Icon"
                className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20"
              />
            </div>
          </div>
        </div>

        {/* Text */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mt-6">
          Welcome to Chef Kitchen
        </h1>

        <p className="text-gray-200 text-xs sm:text-sm md:text-base mt-3">
          Check out the awesome food experience! It’s super fresh, quick, and
          oh-so tasty.
        </p>

        {/* Button */}
       <button
  onClick={() => navigate("/login")}
  className="
    mt-6 w-full sm:w-auto
    bg-orange-400 text-white font-bold
    px-6 py-3 rounded-xl shadow-lg
    hover:bg-orange-300 transition
  "
>
  Login
</button>

      </div>
    </div>
  );
};

export default Home;
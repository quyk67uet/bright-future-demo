import React from "react";
import { Mail, Facebook, Twitter } from "lucide-react";
import LinkButton from "../button/LinkButton";

const Section3 = () => {
  return (
    <div className="flex flex-col items-center text-center max-w-lg mx-auto p-6">
      <h1 className="text-3xl font-bold text-primary-purple mb-6">
        Ready to get started?
      </h1>

      <p className="mb-8">
        Find a solar provider in your area to get more information and begin
        discussing installation. You can also learn more about the process of
        going solar and how to choose a solar provider with the links below.
      </p>

      <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4">
        SEARCH FOR SOLAR PROVIDERS
      </button>

      <LinkButton text="LEARN MORE ABOUT GOING SOLAR" color="text-blue-500" />

      <div className="mt-[30px] mb-[100px]">
        <LinkButton
          text="HOW TO CHOOSE A SOLAR PROVIDER"
          color="text-blue-500"
        />
      </div>
      <div className="flex items-center">
        <span className="mr-4 text-gray-600">SHARE</span>
        <button className="mx-1 p-2 bg-gray-200 rounded-full">
          <Mail size={20} />
        </button>
        <button className="mx-1 p-2 bg-blue-600 rounded-full">
          <Facebook size={20} color="white" />
        </button>
        <button className="mx-1 p-2 bg-blue-400 rounded-full">
          <Twitter size={20} color="white" />
        </button>
      </div>
    </div>
  );
};

export default Section3;

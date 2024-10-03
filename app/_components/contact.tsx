import React from "react";
import SendForm from "./send-form";

const ContactPage = () => {
  return (
    <div className="w-full h-full relative flex max-lg:mt-12 flex-col px-[25px]">
      <div className="w-fit absolute top-[-30px] left-[25px]">
        <h1 className="text-white text-4xl mb-1">Contact</h1>
        <div
          className={`h-[2px] w-[35%] bg-[#63E2B7] transition-all duration-300`}
        />
      </div>

      <div className="mt-16 mb-5 flex flex-wrap">
        <SendForm />
      </div>
    </div>
  );
};

export default ContactPage;

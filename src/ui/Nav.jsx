import React from 'react'

const Nav = () => {
  return (
    <>
      <nav className="w-full h-auto fixed top-0 z-10000 text-center p-4 bg-[#ffb3c1] text-[#590d22] text-4xl font-bold border-b-2 border-[#590d22] flex justify-center items-center gap-2">
        Expense Tracker
        <span className="text-sm beta-gradient text-[#fff0f3] font-normal py-0.5 px-2 rounded-xl">
          BETA
        </span>
      </nav>
    </>
  );
}

export default Nav
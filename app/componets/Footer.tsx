import React from "react";

function Footer() {
  return (
    <footer className="absolute bottom-0 p-5 bg-white w-full flex justify-center">
      <div className="w-[1200px] max-w-[90%] flex items-center justify-between text-sm font-medium">
        <p>© 2024 Prism Foundation</p>
        <p className="flex items-center">
          Dev .<a href="abaqas.in">Abaqas.in</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;

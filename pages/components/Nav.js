import React from "react";

export default function Nav() {
  return (
    <nav className="flex justify-between items-center py-4">
      <p className="text-2xl font-bold text-gray-800">Dan's Do's</p>
      <div className="flex">
        <a className="rounded bg-green-500 text-white hover:bg-green-600 py-2 px-4">
          Login
        </a>
        <a className="rounded bg-green-500 text-white hover:bg-green-600 py-2 px-4">
          Logout
        </a>
      </div>
    </nav>
  );
}

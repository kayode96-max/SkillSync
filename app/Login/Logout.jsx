import React from "react";
import { doLogout } from "../actions/index.js";
const Logout = () => {
  return (
    <form action={doLogout}>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Logout
      </button>
    </form>
  );
};

export default Logout;

"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Page() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("auth");
    router.push("/");
  };

  return (
    <div>
      <h1>Posts</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
      >
        Logout
      </button>
    </div>
  );
}

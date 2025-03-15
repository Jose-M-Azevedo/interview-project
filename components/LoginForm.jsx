"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../lib";

export default function LoginForm() {
  // Variável state para armazenar a mensagem de erro
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  // Form submission
  async function handleSubmit(event) {
    event.preventDefault();
    // Obeter os dados do form
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    // Chamar a função login de lib.js
    // Passar os dados do form, o state setErrorMessage e o router
    await login(data, setErrorMessage, router);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center"
    >
      <div className="mb-4 w-full">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4 w-full">
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {errorMessage && (
        <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
      )}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Login
      </button>
    </form>
  );
}

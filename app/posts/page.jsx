"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { fetchUser, fetchPosts } from "../../lib";
import { useRouter } from "next/navigation";

export default function Page() {
  // Variáveis de state para armazenar posts, mensagem de erro e detalhes do user
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const router = useRouter();

  // Hook useEffect para dar fetch aos detalhes do user e posts quando o componente é montado
  useEffect(() => {
    const fetchUserAndPosts = async () => {
      // Obter o userId dos cookies
      const userId = Cookies.get("userId");

      // Se o userId não for encontrado, redirecionar para a página de login
      if (!userId) {
        window.location.href = "/";
        return;
      }

      try {
        // Fetch os detalhes do user ao chamar a função fetchUser de lib.js
        const userData = await fetchUser(userId);
        // Guardar os detalhes do user no state
        setUser(userData);

        // Fetch os detalhes do user ao chamar a função fetchPosts de lib.js
        const userPosts = await fetchPosts(userId);
        // Guardar os posts no state
        setPosts(userPosts);
      } catch (error) {
        // Definir a mensagem de erro se o fetch falhar
        setError("Failed to fetch data. Please try again.");
        console.error("Error:", error);
      }
    };

    // Chamar a função fetchUserAndPosts
    fetchUserAndPosts();
  }, []);

  // Função para logout
  const handleLogout = () => {
    // Remover os cookies de autenticação e userId
    Cookies.remove("auth");
    Cookies.remove("userId");

    // Redirecionar para a página de login
    router.push("/");
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-white mb-6">Posts</h1>
        {user && (
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-white">
              Welcome, {user.firstName} {user.lastName}
            </h2>
          </div>
        )}
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        <ul className="w-full">
          {posts.map((post) => (
            <li key={post.id} className="mb-4 bg-gray-900 p-4 rounded-lg">
              <h2 className="text-xl font-bold text-white">{post.title}</h2>
              <p className="text-white">{post.text}</p>
              <p className="text-gray-500 text-sm">
                {new Date(post.postedAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300 mt-4"
        >
          Logout
        </button>
      </div>
    </section>
  );
}

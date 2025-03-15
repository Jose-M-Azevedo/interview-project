import Cookies from "js-cookie";

// Função para tratar do login do user
export async function login(userData, setErrorMessage, router) {
  if (!userData.email || !userData.password) {
    setErrorMessage("Email and password are required");
    return;
  }

  try {
    // Fetch os users do servidor
    const response = await fetch("http://localhost:5000/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const users = await response.json();

    // Encontrar o user com o email e password correspondentes
    const user = users.find(
      (user) =>
        user.email === userData.email && user.password === userData.password
    );

    if (user) {
      console.log("Login successful");
      // Definir os cookies de auth e userId
      Cookies.set("auth", "true", { expires: 1 }); // Auth cookie para 1 dia
      Cookies.set("userId", user.id, { expires: 1 }); // userId cookie para 1 dia
      router.push("/posts"); // redirecionar para a página de posts
    } else {
      setErrorMessage("Invalid email or password"); // Mensagem de erro se o user não for encontrado
      console.log("Invalid email or password");
    }
  } catch (error) {
    setErrorMessage("An error occurred. Please try again."); // Mensagem de erro se houver um erro com o fetch
    console.error("Error:", error);
  }
}

// Função para dar fetch a um user específico
export async function fetchUser(userId) {
  try {
    const response = await fetch(`http://localhost:5000/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user details");
    }

    const userData = await response.json();

    return userData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// // Função para dar fetch aos posts do user específico
export async function fetchPosts(userId) {
  try {
    const response = await fetch("http://localhost:5000/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const allPosts = await response.json();
    // Filtrar os posts pelo userId e ordená-los por data
    const userPosts = allPosts
      .filter((post) => post.userId === userId)
      .sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));

    return userPosts;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

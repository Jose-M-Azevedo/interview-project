import Cookies from "js-cookie";

export async function login(userData, setErrorMessage, router) {
  if (!userData.email || !userData.password) {
    setErrorMessage("Email and password are required");
    return;
  }

  try {
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

    const user = users.find(
      (user) =>
        user.email === userData.email && user.password === userData.password
    );

    if (user) {
      console.log("Login successful");
      Cookies.set("auth", "true", { expires: 1 }); // Set cookie for 1 day
      router.push("/posts");
    } else {
      setErrorMessage("Invalid email or password");
      console.log("Invalid email or password");
    }
  } catch (error) {
    setErrorMessage("An error occurred. Please try again.");
    console.error("Error:", error);
  }
}

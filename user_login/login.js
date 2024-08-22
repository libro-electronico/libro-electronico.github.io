document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const emailInput = document.getElementById("login-email");
  const passwordInput = document.getElementById("login-password");

  // Handle Login
  document
    .getElementById("loginForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const loginDetail = {
        email: email,
        password: password,
      };

      try {
        const response = await fetch(
          "https://librobackend-production.up.railway.app/api/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginDetail),
          }
        );

      if (response.ok) {
        const result = await response.json();
        // Handle successful login (e.g., redirect to dashboard)
        window.location.href = "/dashboard.html";
      } else {
        console.error("Login failed:", response.statusText);
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  // Form submission event
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const credentials = {
      email: emailInput.value,
      password: passwordInput.value,
    };
    login(credentials);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const loginLink = document.getElementById("register-link");
  const togglePassword = document.getElementById("togglePassword");
  const passwordField = document.getElementById("password");
  const message = document.getElementById("message");

  // Toggle Password Visibility
  togglePassword.addEventListener("click", () => {
    const type =
      passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);
    togglePassword.classList.toggle("fa-eye-slash");
  });

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

        if (response.status === 200) {
          message.textContent = "Login berhasil! Tunggu sebentar...";
          setTimeout(() => {
            window.location.href =
              "https://librobackend-production.up.railway.app/";
          }, 2000);
        } else {
          const errorData = await response.json();
          message.textContent = `Password salah. Coba lagi.`;
          if (errorData.error.toLowerCase().includes("password")) {
            message.textContent = "Password salah. Coba lagi.";
          }
        }
      } catch (error) {
        message.textContent = `Wahh password nya salah nihh. Coba lagi.`;
        console.error("Error during login:", error);
      }
    });

  // Redirect to Register Page
  loginLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href =
      "https://librobackend-production.up.railway.app/register.html";
  });
});

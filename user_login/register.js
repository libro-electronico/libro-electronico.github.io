document.addEventListener("DOMContentLoaded", () => {
  const togglePassword = document.getElementById("togglePassword");
  const password = document.getElementById("password");
  const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
  const confirmPassword = document.getElementById("confirm_password");

  togglePassword.addEventListener("click", () => {
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    togglePassword.classList.toggle("fa-eye-slash");
  });

  toggleConfirmPassword.addEventListener("click", () => {
    const type = confirmPassword.getAttribute("type") === "password" ? "text" : "password";
    confirmPassword.setAttribute("type", type);
    toggleConfirmPassword.classList.toggle("fa-eye-slash");
  });

  document.getElementById("registerForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;

    if (password !== confirmPassword) {
      alert("Passwords tidak cocok.");
      return;
    }

    const response = await fetch("https://librobackend-production.up.railway.app/post/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const message = document.getElementById("message");
    if (response.status === 201) {
      message.textContent = "Pendaftaran berhasil! Mengalihkan ke halaman login...";
      setTimeout(() => {
        window.location.href = "https://librobackend-production.up.railway.app/";
      }, 2000);
    } else {
      const errorData = await response.json();
      message.textContent = `Error: ${errorData.error}`;
    }
  });
});

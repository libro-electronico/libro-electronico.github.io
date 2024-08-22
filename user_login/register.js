document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  const emailInput = document.getElementById("register-email");
  const passwordInput = document.getElementById("register-password");
  const confirmPasswordInput = document.getElementById(
    "register-confirm-password"
  );

  // Register function
  const register = async (user) => {
    try {
      const response = await fetch(
        "https://librobackend-production.up.railway.app/post/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        // Handle successful registration (e.g., redirect to login page)
        window.location.href =
          "https://libro-electronico.github.io/user_login/login.html";
      } else {
        console.error("Registration failed:", response.statusText);
        alert("Registration failed. Please check your details.");
      }
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  // Form submission event
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (passwordInput.value !== confirmPasswordInput.value) {
      alert("Passwords do not match.");
      return;
    }
    const user = {
      email: emailInput.value,
      password: passwordInput.value,
    };
    register(user);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Get elements by their IDs
  const registerForm = document.getElementById("register-form");
  const emailInput = document.getElementById("register-email");
  const passwordInput = document.getElementById("register-password");
  const confirmPasswordInput = document.getElementById(
    "register-confirm-password"
  );

  // Ensure all elements are found
  if (!registerForm || !emailInput || !passwordInput || !confirmPasswordInput) {
    console.error("One or more form elements not found!");
    return;
  }

  // Register function to handle user registration
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
        // Handle successful registration
        window.location.href =
          "https://libro-electronico.github.io/user_login/login.html";
      } else {
        console.error("Registration failed:", response.statusText);
        alert("Registration failed. Please check your details.");
      }
    } catch (error) {
      console.error("Error registering:", error);
      alert("An error occurred during registration. Please try again later.");
    }
  };

  // Form submission event handler
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validate that passwords match
    if (passwordInput.value !== confirmPasswordInput.value) {
      alert("Passwords do not match.");
      return;
    }

    // Create a user object from the form data
    const user = {
      email: emailInput.value,
      password: passwordInput.value,
    };

    // Call the register function with the user data
    register(user);
  });
});

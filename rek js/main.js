document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const bookList = document.getElementById("book-list");
  const modal = document.getElementById("modal");
  const bookForm = document.getElementById("book-form");
  const saveBtn = document.getElementById("save-btn");
  const cancelBtn = document.getElementById("cancel-btn");
  const searchInput = document.getElementById("search");
  const addBookBtn = document.getElementById("add-book-btn");
  const modalTitle = document.getElementById("modal-title");

  let books = []; // Array to store book objects
  let editingIndex = -1; // To track the index of the book being edited

  // Function to render books to the DOM
  const renderBooks = (bookArray = books) => {
    bookList.innerHTML = bookArray
      .map(
        (book, index) => `
        <div class="bg-white p-4 rounded-lg shadow-lg overflow-hidden">
          <img src="https://via.placeholder.com/150" alt="Book Image" class="w-full h-48 object-cover mb-2" />
          <h3 class="text-lg font-bold">${book.title}</h3>
          <p class="text-gray-600">${book.author}</p>
          <p class="text-gray-500 text-sm">Tahun Terbit: ${book.year}</p>
          <div class="flex justify-between mt-4">
            <button class="bg-blue-600 text-white px-4 py-2 rounded edit-btn" data-index="${index}">Edit</button>
            <button class="bg-red-600 text-white px-4 py-2 rounded delete-btn" data-index="${index}">Delete</button>
          </div>
        </div>
      `
      )
      .join(""); // Convert array of book HTML to a single string and inject into DOM
  };

  // Function to reset the form and modal state
  const resetForm = () => {
    bookForm.reset(); // Reset the form fields
    editingIndex = -1; // Reset the editing index
    modalTitle.textContent = "Tambah Buku"; // Reset modal title
  };

  // Search functionality
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const filteredBooks = books.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
    );
    renderBooks(filteredBooks); // Render books that match the search query
  });

  // Handle edit and delete actions
  bookList.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    if (e.target.classList.contains("edit-btn")) {
      editingIndex = index;
      const book = books[index];
      document.getElementById("book-title").value = book.title;
      document.getElementById("book-author").value = book.author;
      document.getElementById("book-year").value = book.year;
      modalTitle.textContent = "Edit Buku"; // Change modal title for editing
      modal.classList.remove("hidden"); // Show modal
    } else if (e.target.classList.contains("delete-btn")) {
      books.splice(index, 1); // Remove the selected book from the array
      renderBooks(); // Re-render the list without the deleted book
    }
  });

  // Handle save action
  saveBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent form submission

    // Get form input values
    const title = document.getElementById("book-title").value.trim();
    const author = document.getElementById("book-author").value.trim();
    const year = document.getElementById("book-year").value.trim();

    // Check if all fields are filled
    if (title && author && year) {
      if (editingIndex === -1) {
        books.push({ title, author, year }); // Add a new book
      } else {
        books[editingIndex] = { title, author, year }; // Update the existing book
      }

      resetForm(); // Reset the form for the next use
      renderBooks(); // Re-render the book list
      modal.classList.add("hidden"); // Hide the modal after saving
    } else {
      alert("Please fill out all fields."); // Alert if any field is missing
    }
  });

  // Handle cancel action
  cancelBtn.addEventListener("click", () => {
    resetForm(); // Reset the form
    modal.classList.add("hidden"); // Hide the modal
  });

  // Show modal to add a new book
  addBookBtn.addEventListener("click", () => {
    modal.classList.remove("hidden"); // Show the modal
  });

  // Initial rendering of books (if any)
  renderBooks();
});

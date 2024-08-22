document.addEventListener("DOMContentLoaded", () => {
  const bookList = document.getElementById("book-list");
  const bookModal = document.getElementById("book-modal");
  const addBookBtn = document.getElementById("add-book-btn");
  const closeModal = document.getElementById("close-modal");
  const bookForm = document.getElementById("book-form");
  const modalTitle = document.getElementById("modal-title");
  const bookIdInput = document.getElementById("book-id");
  const bookTitleInput = document.getElementById("book-title");
  const bookAuthorInput = document.getElementById("book-author");
  const bookPublisherInput = document.getElementById("book-publisher");
  const bookPublishedAtInput = document.getElementById("book-published-at");
  const bookIsbnInput = document.getElementById("book-isbn");
  const bookPagesInput = document.getElementById("book-pages");
  const bookLanguageInput = document.getElementById("book-language");
  const bookAvailableInput = document.getElementById("book-available");

  let editingBook = null;

  // Function to open modal
  const openModal = (book = null) => {
    editingBook = book;
    modalTitle.textContent = book ? "Edit Buku" : "Tambah Buku";
    bookIdInput.value = book ? book.id : "";
    bookTitleInput.value = book ? book.title : "";
    bookAuthorInput.value = book ? book.author : "";
    bookPublisherInput.value = book ? book.publisher : "";
    bookPublishedAtInput.value = book ? book.published_at : "";
    bookIsbnInput.value = book ? book.isbn : "";
    bookPagesInput.value = book ? book.pages : "";
    bookLanguageInput.value = book ? book.language : "";
    bookAvailableInput.checked = book ? book.available : false;
    bookModal.classList.remove("hidden");
  };

  // Function to close modal
  const closeModalFunction = () => {
    bookModal.classList.add("hidden");
    editingBook = null;
  };

  // Function to render books
  const renderBooks = (books) => {
    bookList.innerHTML = "";
    books.forEach((book) => {
      const bookElement = document.createElement("div");
      bookElement.className = "bg-white rounded-lg shadow p-4";
      bookElement.innerHTML = `
          <h3 class="text-xl font-bold">${book.title}</h3>
          <p class="text-gray-700">Penulis: ${book.author}</p>
          <p class="text-gray-700">Penerbit: ${book.publisher}</p>
          <p class="text-gray-700">Tahun Terbit: ${book.published_at}</p>
          <p class="text-gray-700">ISBN: ${book.isbn}</p>
          <p class="text-gray-700">Jumlah Halaman: ${book.pages}</p>
          <p class="text-gray-700">Bahasa: ${book.language}</p>
          <p class="text-gray-700">Tersedia: ${
            book.available ? "Ya" : "Tidak"
          }</p>
          <button class="bg-yellow-500 text-white px-2 py-1 rounded mt-2 edit-book-btn">Edit</button>
          <button class="bg-red-500 text-white px-2 py-1 rounded mt-2 delete-book-btn">Hapus</button>
        `;

      // Edit button event
      bookElement
        .querySelector(".edit-book-btn")
        .addEventListener("click", () => openModal(book));

      // Delete button event
      bookElement
        .querySelector(".delete-book-btn")
        .addEventListener("click", () => {
          if (confirm(`Hapus buku ${book.title}?`)) {
            deleteBook(book.id);
          }
        });

      bookList.appendChild(bookElement);
    });
  };

  // Fetch books from server
  const fetchBooks = async () => {
    try {
      const response = await fetch(
        "https://librobackend-production.up.railway.app/api/get/books"
      ); // Adjust API endpoint as needed
      const books = await response.json();
      renderBooks(books);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Add or update book
  const saveBook = async (book) => {
    try {
      const response = await fetch(
        editingBook
          ? `https://librobackend-production.up.railway.app/api/put/books${editingBook.id}`
          : "https://librobackend-production.up.railway.app/api/post/books",
        {
          method: editingBook ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(book),
        }
      );

      if (response.ok) {
        fetchBooks();
        closeModalFunction();
      } else {
        console.error("Error saving book:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  // Delete book
  const deleteBook = async (id) => {
    try {
      const response = await fetch(
        `https://librobackend-production.up.railway.app/api/delete/books/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        fetchBooks();
      } else {
        console.error("Error deleting book:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  // Form submission event
  bookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const book = {
      id: bookIdInput.value,
      title: bookTitleInput.value,
      author: bookAuthorInput.value,
      publisher: bookPublisherInput.value,
      published_at: bookPublishedAtInput.value,
      isbn: bookIsbnInput.value,
      pages: parseInt(bookPagesInput.value),
      language: bookLanguageInput.value,
      available: bookAvailableInput.checked,
    };
    saveBook(book);
  });

  // Event listeners
  addBookBtn.addEventListener("click", () => openModal());
  closeModal.addEventListener("click", closeModalFunction);

  // Initial fetch of books
  fetchBooks();
});

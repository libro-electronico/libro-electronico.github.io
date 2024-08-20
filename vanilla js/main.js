// app.js
document.addEventListener("DOMContentLoaded", () => {
  const bookList = document.getElementById("book-list");
  const modal = document.getElementById("modal");
  const bookForm = document.getElementById("book-form");
  const saveBtn = document.getElementById("save-btn");
  const cancelBtn = document.getElementById("cancel-btn");

  let books = [];
  let editingIndex = -1;

  const renderBooks = () => {
    bookList.innerHTML = "";
    books.forEach((book, index) => {
      const bookItem = document.createElement("div");
      bookItem.className = "bg-white p-4 rounded shadow";
      bookItem.innerHTML = `
                <h3 class="text-lg font-bold">${book.title}</h3>
                <p>${book.author}</p>
                <p>${book.year}</p>
                <button class="bg-blue-500 text-white px-2 py-1 rounded mt-2 edit-btn" data-index="${index}">Edit</button>
                <button class="bg-red-500 text-white px-2 py-1 rounded mt-2 delete-btn" data-index="${index}">Delete</button>
            `;
      bookList.appendChild(bookItem);
    });
  };

  const resetForm = () => {
    bookForm.reset();
    editingIndex = -1;
    document.getElementById("modal-title").textContent = "Tambah Buku";
  };

  document.getElementById("search").addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const filteredBooks = books.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
    );
    bookList.innerHTML = "";
    filteredBooks.forEach((book, index) => {
      const bookItem = document.createElement("div");
      bookItem.className = "bg-white p-4 rounded shadow";
      bookItem.innerHTML = `
                <h3 class="text-lg font-bold">${book.title}</h3>
                <p>${book.author}</p>
                <p>${book.year}</p>
            `;
      bookList.appendChild(bookItem);
    });
  });

  bookList.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-btn")) {
      editingIndex = e.target.dataset.index;
      const book = books[editingIndex];
      document.getElementById("book-title").value = book.title;
      document.getElementById("book-author").value = book.author;
      document.getElementById("book-year").value = book.year;
      document.getElementById("modal-title").textContent = "Edit Buku";
      modal.classList.remove("hidden");
    } else if (e.target.classList.contains("delete-btn")) {
      books.splice(e.target.dataset.index, 1);
      renderBooks();
    }
  });

  saveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const title = document.getElementById("book-title").value;
    const author = document.getElementById("book-author").value;
    const year = document.getElementById("book-year").value;

    if (editingIndex === -1) {
      books.push({ title, author, year });
    } else {
      books[editingIndex] = { title, author, year };
    }

    resetForm();
    renderBooks();
    modal.classList.add("hidden");
  });

  cancelBtn.addEventListener("click", () => {
    resetForm();
    modal.classList.add("hidden");
  });

  document.getElementById("add-book-btn").addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  renderBooks();
});

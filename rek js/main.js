document.addEventListener("DOMContentLoaded", () => {
  const bookList = document.getElementById("book-list");
  const searchInput = document.getElementById("search");

  // Function to render books
  const renderBooks = (books) => {
    bookList.innerHTML = "";
    books.forEach((book) => {
      const bookElement = document.createElement("div");
      bookElement.className = "bg-white rounded-lg shadow-lg overflow-hidden";
      bookElement.innerHTML = `
        <img
          src="https://cf.shopee.co.id/file/41c77417820fa1b85be7985aa5560d2d_tn"
          alt="Book Image"
          class="w-full h-48 object-cover"
        />
        <div class="p-4">
          <h3 class="text-lg font-semibold">${book.title}</h3>
          <p class="text-gray-600">Penulis: ${book.author}</p>
          <p class="text-gray-500 text-sm">Tahun Terbit: ${book.year}</p>
        </div>
        <div class="p-4 border-t border-gray-200 flex justify-between items-center">
          <button class="bg-blue-600 text-white px-4 py-2 rounded detail-book-btn" data-book='${JSON.stringify(
            book
          )}'>
            Detail
          </button>
          <button class="bg-green-600 text-white px-4 py-2 rounded pinjam-book-btn" data-book='${JSON.stringify(
            book
          )}'>
            Pinjam
          </button>
        </div>
      `;

      // Detail button event
      bookElement
        .querySelector(".detail-book-btn")
        .addEventListener("click", (e) => {
          const book = JSON.parse(e.target.getAttribute("data-book"));
          showBookDetail(book);
        });

      // Pinjam button event
      bookElement
        .querySelector(".pinjam-book-btn")
        .addEventListener("click", (e) => {
          const book = JSON.parse(e.target.getAttribute("data-book"));
          showSuccessNotification(book);
        });

      bookList.appendChild(bookElement);
    });
  };

  // Function to show book detail
  const showBookDetail = (book) => {
    const bookDetailHTML = `
      <div class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <h2 class="text-2xl font-bold mb-2">${book.title}</h2>
          <p class="text-gray-700 mb-4">Penulis: ${book.author}</p>
          <p class="text-gray-500 mb-4">Tahun Terbit: ${book.year}</p>
          <button id="close-detail-modal" class="bg-blue-600 text-white px-4 py-2 rounded">Tutup</button>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", bookDetailHTML);
    document
      .getElementById("close-detail-modal")
      .addEventListener("click", () => {
        document.querySelector(".fixed").remove();
      });
  };

  // Function to show success notification
  const showSuccessNotification = (book) => {
    const notificationHTML = `
      <div class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <h2 class="text-xl font-bold mb-2">Berhasil Dipinjamkan</h2>
          <p class="text-gray-700 mb-4">Buku "${book.title}" telah berhasil dipinjamkan.</p>
          <button id="close-success-modal" class="bg-green-600 text-white px-4 py-2 rounded">Tutup</button>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", notificationHTML);
    document
      .getElementById("close-success-modal")
      .addEventListener("click", () => {
        document.querySelector(".fixed").remove();
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

  // Handle search input
  searchInput.addEventListener("input", async (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const books = await fetchBooks(); // Assuming fetchBooks() returns the list of books
    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm)
    );

    // Sort to show searched books at the top
    const sortedBooks = [
      ...filteredBooks,
      ...books.filter((book) => !filteredBooks.includes(book)),
    ];

    renderBooks(sortedBooks);
  });

  // Initial fetch of books
  fetchBooks();
});

document.addEventListener("DOMContentLoaded", () => {
  const bookList = document.getElementById("book-list");
  const searchInput = document.getElementById("search");

  // Function to show detail pop-out
  const showDetail = (book) => {
    const detailContent = `
      <div class="modal-overlay">
        <div class="modal-content">
          <h2 class="text-2xl font-bold mb-2">${book.title}</h2>
          <p class="text-gray-700 mb-2"><strong>Penulis:</strong> ${book.author}</p>
          <p class="text-gray-700 mb-2"><strong>Tahun:</strong> ${book.year}</p>
          <button id="close-detail" class="btn btn-primary">Tutup</button>
        </div>
      </div>
    `;
    const detailModal = document.createElement("div");
    detailModal.innerHTML = detailContent;
    document.body.appendChild(detailModal);

    document.getElementById("close-detail").addEventListener("click", () => {
      document.body.removeChild(detailModal);
    });
  };

  // Function to show success notification
  const showSuccessNotification = () => {
    const notification = document.createElement("div");
    notification.className = "notification success";
    notification.textContent = "Buku berhasil dipinjam!";
    document.body.appendChild(notification);
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  };

  // Function to render books
  const renderBooks = (books) => {
    bookList.innerHTML = "";
    books.forEach((book) => {
      const bookElement = document.createElement("div");
      bookElement.className = "book-item";
      bookElement.innerHTML = `
          <img src="https://cf.shopee.co.id/file/41c77417820fa1b85be7985aa5560d2d_tn" alt="Book Image" class="book-image" />
          <div class="book-details">
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">Penulis: ${book.author}</p>
            <p class="book-year">Tahun Terbit: ${book.year}</p>
          </div>
          <div class="book-actions">
            <button class="detail-button">Detail</button>
            <button class="borrow-button">Pinjam</button>
          </div>
        `;

      // Event listeners
      bookElement
        .querySelector(".detail-button")
        .addEventListener("click", () => showDetail(book));
      bookElement
        .querySelector(".borrow-button")
        .addEventListener("click", () => showSuccessNotification());

      bookList.appendChild(bookElement);
    });
  };

  // Fetch books from server (Placeholder)
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

  // Search box event
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const books = Array.from(bookList.children);

    books.sort((a, b) => {
      const titleA = a.querySelector(".book-title").textContent.toLowerCase();
      const titleB = b.querySelector(".book-title").textContent.toLowerCase();

      if (titleA.includes(query) && !titleB.includes(query)) return -1;
      if (!titleA.includes(query) && titleB.includes(query)) return 1;
      return 0;
    });

    bookList.innerHTML = "";
    books.forEach((book) => bookList.appendChild(book));
  });

  // Initial fetch of books
  fetchBooks();
});

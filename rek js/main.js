document.addEventListener("DOMContentLoaded", () => {
  const bookList = document.getElementById("book-list");
  const searchInput = document.getElementById("search");

  // Function to show detail pop-out
  const showDetail = (book) => {
    const detailContent = `
      <div class="detail-modal">
        <div class="detail-content">
          <h2>${book.title}</h2>
          <p><strong>Penulis:</strong> ${book.author}</p>
          <p><strong>Tahun:</strong> ${book.year}</p>
          <button id="close-detail" class="close-btn">Tutup</button>
        </div>
      </div>
    `;
    const detailModal = document.createElement("div");
    detailModal.className = "modal-background";
    detailModal.innerHTML = detailContent;
    document.body.appendChild(detailModal);

    document.getElementById("close-detail").addEventListener("click", () => {
      document.body.removeChild(detailModal);
    });
  };

  // Function to show success notification
  const showSuccessNotification = () => {
    const notification = document.createElement("div");
    notification.className = "notification";
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
      bookElement.className = "book-card";
      bookElement.innerHTML = `
          <img src="${book.image}" alt="${book.title}" class="book-image" />
          <h3 class="book-title">${book.title}</h3>
          <p class="book-author">Penulis: ${book.author}</p>
          <p class="book-year">Tahun Terbit: ${book.year}</p>
          <div class="book-actions">
            <button class="detail-book-btn">Detail</button>
            <button class="pinjam-book-btn">Pinjam</button>
          </div>
        `;

      // Detail button event
      bookElement
        .querySelector(".detail-book-btn")
        .addEventListener("click", () => showDetail(book));

      // Pinjam button event
      bookElement
        .querySelector(".pinjam-book-btn")
        .addEventListener("click", () => {
          showSuccessNotification();
        });

      bookList.appendChild(bookElement);
    });
  };

  // Fetch books from server (Placeholder)
  const fetchBooks = async () => {
    try {
      const response = await fetch("/api/books"); // Adjust API endpoint as needed
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

    books.forEach((book) => {
      const title = book.querySelector(".book-title").textContent.toLowerCase();
      if (title.includes(query)) {
        book.style.display = "block";
      } else {
        book.style.display = "none";
      }
    });
  });

  // Initial fetch of books
  fetchBooks();
});

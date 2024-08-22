document.addEventListener("DOMContentLoaded", () => {
  const bookList = document.getElementById("book-list");
  const searchInput = document.getElementById("search");

  // Function to show detail pop-out
  const showDetail = (book) => {
    const detailContent = `
      <div class="bg-white p-4 rounded-lg shadow-lg max-w-md mx-auto mt-10">
        <h2 class="text-2xl font-bold mb-2">${book.title}</h2>
        <p class="text-gray-700 mb-2"><strong>Penulis:</strong> ${book.author}</p>
        <p class="text-gray-700 mb-2"><strong>Tahun:</strong> ${book.year}</p>
        <button id="close-detail" class="bg-blue-600 text-white px-4 py-2 rounded">Tutup</button>
      </div>
    `;
    const detailModal = document.createElement("div");
    detailModal.className =
      "fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75";
    detailModal.innerHTML = detailContent;
    document.body.appendChild(detailModal);

    document.getElementById("close-detail").addEventListener("click", () => {
      document.body.removeChild(detailModal);
    });
  };

  // Function to show success notification
  const showSuccessNotification = () => {
    const notification = document.createElement("div");
    notification.className =
      "fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg";
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
      bookElement.className = "bg-white rounded-lg shadow p-4";
      bookElement.innerHTML = `
          <img src="https://cf.shopee.co.id/file/41c77417820fa1b85be7985aa5560d2d_tn" alt="Book Image" class="w-full h-48 object-cover mb-4" />
          <h3 class="text-lg font-semibold">${book.title}</h3>
          <p class="text-gray-600">Penulis: ${book.author}</p>
          <p class="text-gray-500 text-sm">Tahun Terbit: ${book.year}</p>
          <div class="flex justify-between mt-4">
            <button class="bg-blue-600 text-white px-4 py-2 rounded detail-book-btn">Detail</button>
            <button class="bg-green-600 text-white px-4 py-2 rounded pinjam-book-btn">Pinjam</button>
          </div>
        `;

      // Edit button event
      bookElement
        .querySelector(".detail-book-btn")
        .addEventListener("click", () => showDetail(book));

      // Delete button event
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

    books.sort((a, b) => {
      const titleA = a.querySelector("h3").textContent.toLowerCase();
      const titleB = b.querySelector("h3").textContent.toLowerCase();

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

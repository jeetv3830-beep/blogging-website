/* =========================================================
   SIMPLE JAVASCRIPT FOR JEET VYAS BLOG
   All functions are written in basic, easy-to-understand code.
   ========================================================= */

// 1. Initial Sample Notes (Array of Objects)
const defaultPosts = [
  {
    id: 1,
    title: "Learning HTML and CSS Basics",
    date: "2026-09-10",
    tag: "Web Dev",
    content: "Learned how to structure web pages with HTML tags and style them with simple CSS."
  },
  {
    id: 2,
    title: "Java Variables and Loops",
    date: "2026-09-18",
    tag: "DSA",
    content: "Practiced for-loops, while-loops, and basic if-else conditions in Java."
  },
  {
    id: 3,
    title: "My First JavaScript Project",
    date: "2026-09-25",
    tag: "Notes",
    content: "Built this simple blog using LocalStorage to save my notes in the browser."
  }
];

// Variable to store the current selected category filter (default is 'all')
let currentCategory = "all";


// 2. LocalStorage Functions (Get and Save)

// Function to get notes from the browser memory (LocalStorage)
function getPosts() {
  const savedData = localStorage.getItem("my_blog_posts");
  if (savedData) {
    return JSON.parse(savedData); // Convert string back to an array
  } else {
    return defaultPosts; // Return default sample notes if nothing is saved
  }
}

// Function to save notes array into browser memory (LocalStorage)
function savePosts(postsArray) {
  const stringData = JSON.stringify(postsArray); // Convert array into string
  localStorage.setItem("my_blog_posts", stringData);
}


// 3. Function to Display Notes on the Page
function displayPosts() {
  const homeContainer = document.getElementById("home-recent-list");
  const blogContainer = document.getElementById("blog-posts-container");
  const posts = getPosts();

  // A. IF WE ARE ON THE HOME PAGE: Show the 2 latest notes
  if (homeContainer) {
    let homeHtml = "";
    // Loop through the first 2 posts
    for (let i = 0; i < posts.length && i < 2; i++) {
      const post = posts[i];
      homeHtml += `
        <article class="blog-item">
          <div class="blog-meta">
            <span class="badge">${post.tag}</span>
            <span>•</span>
            <time>${post.date}</time>
          </div>
          <h3><a href="pages/blog.html">${post.title}</a></h3>
          <p class="blog-text">${post.content}</p>
          <div class="blog-bottom">
            <span>By Jeet Vyas</span>
            <a href="pages/blog.html">Read note &rarr;</a>
          </div>
        </article>
      `;
    }
    homeContainer.innerHTML = homeHtml;
  }

  // B. IF WE ARE ON THE BLOG PAGE: Show notes with Search & Category filter
  if (blogContainer) {
    const searchInput = document.getElementById("search-posts");
    let searchText = "";
    if (searchInput) {
      searchText = searchInput.value.toLowerCase().trim();
    }

    let blogHtml = "";
    let count = 0;

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const titleLower = post.title.toLowerCase();
      const contentLower = post.content.toLowerCase();

      // Check if post matches search input
      const matchSearch = titleLower.includes(searchText) || contentLower.includes(searchText);

      // Check if post matches category filter
      const matchCategory = (currentCategory === "all") || (post.tag === currentCategory);

      if (matchSearch && matchCategory) {
        count++;
        blogHtml += `
          <article class="blog-item">
            <div class="blog-meta">
              <span class="badge">${post.tag}</span>
              <span>•</span>
              <time>${post.date}</time>
            </div>
            <h3>${post.title}</h3>
            <p class="blog-text">${post.content}</p>
            <div class="blog-bottom">
              <span>By Jeet Vyas</span>
              <button class="btn btn-danger" onclick="deletePost(${post.id})">Delete</button>
            </div>
          </article>
        `;
      }
    }

    // If no notes match, show a friendly message
    if (count === 0) {
      blogContainer.innerHTML = `<div class="empty-state"><p>No notes found.</p></div>`;
    } else {
      blogContainer.innerHTML = blogHtml;
    }
  }
}


// 4. Function to Add a New Note
function handleAddPost(event) {
  event.preventDefault(); // Stop the form from reloading the page

  // Read values entered by the user
  const title = document.getElementById("post-title").value.trim();
  const date = document.getElementById("post-date").value;
  const tag = document.getElementById("post-tag").value;
  const content = document.getElementById("post-content").value.trim();

  // Create a new note object
  const newPost = {
    id: Date.now(), // Uses current timestamp as unique ID
    title: title,
    date: date,
    tag: tag,
    content: content
  };

  // Get existing posts, add new post to the top, and save
  const posts = getPosts();
  posts.unshift(newPost); // Adds to beginning of list
  savePosts(posts);

  // Clear form inputs
  document.getElementById("new-post-form").reset();
  setTodayDate();

  // Show temporary success message
  const notice = document.getElementById("post-success-notice");
  if (notice) {
    notice.style.display = "block";
    setTimeout(function () {
      notice.style.display = "none";
    }, 3000);
  }

  // Refresh the displayed list of posts
  displayPosts();
}


// 5. Function to Delete a Note by its ID
function deletePost(idToDelete) {
  const confirmDelete = confirm("Are you sure you want to delete this note?");
  if (confirmDelete) {
    const posts = getPosts();
    const updatedPosts = [];

    // Copy all posts except the one to be deleted
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].id !== idToDelete) {
        updatedPosts.push(posts[i]);
      }
    }

    savePosts(updatedPosts);
    displayPosts(); // Refresh list on page
  }
}


// 6. Function to set Today's Date in the date picker input
function setTodayDate() {
  const dateInput = document.getElementById("post-date");
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.value = today;
  }
}


// 7. Dark Mode Toggle Function
function setupTheme() {
  const themeBtn = document.getElementById("theme-toggle");
  if (!themeBtn) return;

  // Check if user previously chose dark mode
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeBtn.textContent = "Light";
  } else {
    document.body.classList.remove("dark-mode");
    themeBtn.textContent = "Dark";
  }

  // Click event on the Dark/Light button
  themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      themeBtn.textContent = "Light";
    } else {
      localStorage.setItem("theme", "light");
      themeBtn.textContent = "Dark";
    }
  });
}


// 8. Setup Navigation Menu, Search & Filter Listeners
function setupUI() {
  // Mobile Menu button click
  const menuBtn = document.getElementById("mobile-menu-btn");
  const nav = document.getElementById("main-nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      nav.classList.toggle("show");
    });
  }

  // Active page highlight in navigation bar
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll("nav a");
  for (let i = 0; i < navLinks.length; i++) {
    const href = navLinks[i].getAttribute("href");
    if (href && href.includes(currentPage)) {
      navLinks[i].classList.add("active");
    }
  }

  // Search input typing event
  const searchInput = document.getElementById("search-posts");
  if (searchInput) {
    searchInput.addEventListener("input", displayPosts);
  }

  // Category filter buttons click
  const filterBtns = document.querySelectorAll(".category-filter-btn");
  for (let i = 0; i < filterBtns.length; i++) {
    filterBtns[i].addEventListener("click", function () {
      // Remove active class from all buttons
      for (let j = 0; j < filterBtns.length; j++) {
        filterBtns[j].classList.remove("active");
      }
      // Add active class to clicked button
      this.classList.add("active");
      currentCategory = this.getAttribute("data-category") || "all";
      displayPosts();
    });
  }

  // Add post form submit
  const postForm = document.getElementById("new-post-form");
  if (postForm) {
    postForm.addEventListener("submit", handleAddPost);
  }

  // Contact form submit
  const contactForm = document.getElementById("site-contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const notice = document.getElementById("contact-success-notice");
      if (notice) {
        notice.style.display = "block";
        setTimeout(function () {
          notice.style.display = "none";
        }, 3000);
      }
      contactForm.reset();
    });
  }
}


// 9. When HTML Page Finishes Loading, Run Everything
document.addEventListener("DOMContentLoaded", function () {
  setupTheme();
  setupUI();
  setTodayDate();
  displayPosts();
});

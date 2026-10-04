var themeBtn = document.getElementById("theme-toggle");
var body = document.body;

var savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  body.className = "dark-body";
  themeBtn.innerHTML = "Light Mode";
}

themeBtn.onclick = function () {
  if (body.className === "dark-body") {
    body.className = "";
    localStorage.setItem("theme", "light");
    themeBtn.innerHTML = "Dark Mode";
  } else {
    body.className = "dark-body";
    localStorage.setItem("theme", "dark");
    themeBtn.innerHTML = "Light Mode";
  }
};

var postBtn = document.getElementById("post-btn");
var postTitle = document.getElementById("post-title");
var postContent = document.getElementById("post-content");
var postsList = document.getElementById("posts-list");

var saved = localStorage.getItem("user_posts");
var posts = [];
if (saved !== null) {
  posts = JSON.parse(saved);
}

function showPosts() {
  if (posts.length === 0) {
    postsList.innerHTML = '<p class="empty-msg">No posts yet.</p>';
    return;
  }

  var html = "";
  for (var i = 0; i < posts.length; i++) {
    html = html + '<div class="post-item">';
    html = html + '<h3>' + cleanText(posts[i].title) + '</h3>';
    html = html + '<p>' + cleanText(posts[i].content) + '</p>';
    html = html + '<p class="post-date">' + posts[i].date + '</p>';
    html = html + '<button class="btn-delete" onclick="removePost(' + i + ')">Delete</button>';
    html = html + '</div>';
  }
  postsList.innerHTML = html;
}

postBtn.onclick = function () {
  var title = postTitle.value;
  var content = postContent.value;

  if (title === "" || content === "") {
    alert("Please enter both title and content.");
    return;
  }

  var now = new Date();
  var dateStr = now.toLocaleDateString() + " " + now.toLocaleTimeString();

  var newPost = {};
  newPost.title = title;
  newPost.content = content;
  newPost.date = dateStr;

  posts.unshift(newPost);
  localStorage.setItem("user_posts", JSON.stringify(posts));

  postTitle.value = "";
  postContent.value = "";
  showPosts();
};

function removePost(index) {
  posts.splice(index, 1);
  localStorage.setItem("user_posts", JSON.stringify(posts));
  showPosts();
}

function cleanText(text) {
  var d = document.createElement("div");
  d.textContent = text;
  return d.innerHTML;
}

showPosts();

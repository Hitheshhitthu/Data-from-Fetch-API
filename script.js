document.addEventListener("DOMContentLoaded", () => {
  const reloadBtn = document.getElementById("reloadBtn");
  reloadBtn.addEventListener("click", fetchAndRenderUsers);
  fetchAndRenderUsers();
});

async function fetchAndRenderUsers() {
  const container = document.getElementById("userContainer");
  container.innerHTML = "<p>Loading user data...</p>";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) throw new Error("Failed to fetch user data");

    const users = await response.json();
    displayUsers(users.slice(0, 8)); 
  } catch (error) {
    container.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}
function displayUsers(users) {
  const container = document.getElementById("userContainer");
  container.innerHTML = ""; 

  users.forEach(user => {
    const card = document.createElement("div");
    card.classList.add("user-card");
    card.innerHTML = `
      <h3>${user.name}</h3>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
      <p><strong>Phone:</strong> ${user.phone}</p>
    `;
    container.appendChild(card);
  });
}

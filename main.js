// Function to fetch data from the API and populate the table
async function fetchData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();

  const tableBody = document.getElementById("userTable");

  users.forEach((user) => {
    const row = document.createElement("tr");

    // Create table data for each column
    row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.address.street}, ${user.address.suite}, ${user.address.city}</td>
            <td>${user.phone}</td>
            <td>${user.website}</td>
            <td>${user.company.name}</td>
        `;

    // Append the row to the table body
    tableBody.appendChild(row);
  });
}

// Call the function to fetch data when the page loads
fetchData();

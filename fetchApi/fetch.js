fetch("http://localhost:3000/api/users", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    data.data.forEach((user) => {
        console.log(`ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`);
    });
  })
  .catch((error) => {
    console.error("Gagal membuat user:", error);
  });

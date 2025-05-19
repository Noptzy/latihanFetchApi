fetch("http://localhost:3000/api/users", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    const list = document.getElementById("data");
    
    data.data.forEach((user) => {
        // console.log(`Name: ${user.name}, Email: ${user.email}`);

        const li = document.createElement("li");
        li.textContent = `Name: ${user.name}, Email: ${user.email}`;
        list.appendChild(li);
    });
  })
  .catch((error) => {
    console.error("Gagal membuat user:", error);
  });

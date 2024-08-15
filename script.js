const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('psw');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        email: email.value,
        password: password.value
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://164.92.244.59:3000/admin/login", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            if (result.token) {
                localStorage.setItem("token", `MSP ${result.token}`);
                alert("Login successful!");
                window.location.href = "./Team/index.html";
            } else {
                alert("Wrong Email Or Password...");
                email.style.borderColor = "red";
                password.style.borderColor = "red";
            }
        })
        .catch((error) => console.error('Error:', error));
});

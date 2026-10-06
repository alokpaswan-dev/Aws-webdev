function login() {

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    fetch("users.xml")
        .then(function(response) {

            if (!response.ok) {
                throw new Error("users.xml not found");
            }

            return response.text();
        })

        .then(function(data) {

            var parser = new DOMParser();

            var xml = parser.parseFromString(data, "text/xml");

            var users = xml.getElementsByTagName("user");

            var found = false;

            for (var i = 0; i < users.length; i++) {

                var xmlUsername =
                    users[i].getElementsByTagName("username")[0].textContent;

                var xmlPassword =
                    users[i].getElementsByTagName("password")[0].textContent;

                if (username == xmlUsername && password == xmlPassword) {

                    found = true;
                    break;
                }
            }

            var message = document.getElementById("message");

            if (found == true) {

                message.innerHTML = "Login Successful!";
                message.style.color = "green";

            } else {

                message.innerHTML = "Invalid Username or Password";
                message.style.color = "red";
            }

        })

        .catch(function(error) {

            document.getElementById("message").innerHTML =
                "Error: users.xml not found";

            document.getElementById("message").style.color = "red";

            console.log(error);
        });
}
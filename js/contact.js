function animateContactForm({ email_form }) {
    email_form.addEventListener("submit", async function (event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const topic = document.getElementById("topic").value;
        const message = document.getElementById("message").value;

        if (!validateEmail(email)) {
            alert("That email looks broken");
            return;
        }

        if (topic.trim() < 3) {
            alert("Topic for the email looks empty");
            return;
        }

        if (message.trim() < 5) {
            alert("Message of the email is empty");
            return;
        }

        const response = await fetch("/email", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sender: email,
                topic: topic,
                body: message,
            })
        });

        console.log("Email submission result: ", response);
    });
}

const emailValidationRegex = /^[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+$/i;
function validateEmail(email) {
    return emailValidationRegex.test(String(email).toLowerCase());
}
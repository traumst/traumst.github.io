function animateContactForm({ email_form }) {
    email_form.addEventListener("submit", function (event) {
        const email = document.getElementById("email").value;
        const topic = document.getElementById("topic").value;
        const message = document.getElementById("message").value;

        if (!validateEmail(email)) {
            alert("That email looks broken");
            event.preventDefault();
        }

        if (topic.trim() < 3) {
            alert("Topic for the email looks empty");
            event.preventDefault();
        }

        if (message.trim() < 5) {
            alert("Message of the email is empty");
            event.preventDefault();
        }
    });
}


const emailValidationRegex = /^[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+$/i;
function validateEmail(email) {
    return emailValidationRegex.test(String(email).toLowerCase());
}
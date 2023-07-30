function animateContactForm({ email_form }) {
    email_form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const emailElement = event.target.email;
        const email = emailElement.value;
        const topicElement = event.target.topic;
        const topic = topicElement.value;
        const messageElement = event.target.message;
        const message = messageElement.value;
        //const submitButton = event.target.form_submit;

        emailElement.setCustomValidity("");
        topicElement.setCustomValidity("");
        messageElement.setCustomValidity("");

        if (!validateEmail(email)) {
            emailElement.setCustomValidity("That email looks broken");
            emailElement.reportValidity();
            return;
        }

        if (topic.trim() < 3) {
            topicElement.setCustomValidity("Topic for the email looks empty");
            topicElement.reportValidity();
            return;
        }

        if (message.trim() < 5) {
            messageElement.setCustomValidity("Message of the email is empty");
            messageElement.reportValidity();
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

        if (response.ok) {
            emailElement.value = '';
            topicElement.value = '';
            messageElement.value = '';
            alert("Email submitted!");
        } else {
            alert(`Email submission failed: ${response.status} ${response.statusText}`);
        }
    });
}

const emailValidationRegex = /^[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+$/i;
function validateEmail(email) {
    return emailValidationRegex.test(String(email).toLowerCase());
}
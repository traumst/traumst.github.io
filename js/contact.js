let isFormAnimated = false;
function animateContactForm({email_form}) {
    if (isFormAnimated)
        return;

    const feedbackContent = document.getElementById('feedbackContent');
    const feedbackDialog = document.getElementById('feedbackDialog');
    const closeDialogBtn = document.getElementById('closeDialogBtn');
    closeDialogBtn?.addEventListener('click', () => {
        feedbackDialog.close();
    });

    email_form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const form = event.target;
        const email = form.email;
        const topic = form.topic;
        const message = form.message;

        email.setCustomValidity("");
        topic.setCustomValidity("");
        message.setCustomValidity("");

        if (!validateEmail(email.value)) {
            email.setCustomValidity("That email looks broken");
            email.reportValidity();
            return;
        }

        if (topic.value.trim() < 3) {
            topic.setCustomValidity("Topic for the email looks empty");
            topic.reportValidity();
            return;
        }

        if (message.value.trim() < 5) {
            message.setCustomValidity("Message of the email is empty");
            message.reportValidity();
            return;
        }

        try {
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
                email.value = '';
                topic.value = '';
                message.value = '';
                feedbackContent.textContent = "Email submitted!";
                feedbackContent.classList.remove('failure');
                feedbackContent.classList.add('success');
                feedbackDialog.showModal();
            } else {
                feedbackContent.textContent = `Email submission failed: ${response.status} ${response.statusText}`;
                feedbackContent.classList.remove('success');
                feedbackContent.classList.add('failure');
                feedbackDialog.showModal();
            }
        } catch (ex) {
            feedbackContent.textContent = `Email submission failed: ${ex.message}`;
            feedbackContent.classList.remove('success');
            feedbackContent.classList.add('failure');
            feedbackDialog.showModal();
            console.error(ex);
        }
    });

    isFormAnimated = true;
}

const emailValidationRegex = /^[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+$/i;
function validateEmail(email) {
    return emailValidationRegex.test(String(email).toLowerCase());
}

const email_form = document.querySelector("form");
animateContactForm({email_form});
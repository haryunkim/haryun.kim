// handle form submission for contact form
var form = document.getElementById("contact-form");

async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("form-status");
    var data = new FormData(event.target);

    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            status.innerHTML = "Message Sent!";
            form.reset();
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                } else {
                    status.innerHTML = "Oops! There was a problem submitting your message";
                }
            });
        }
    }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your message";
    });
};
form.addEventListener("submit", handleSubmit);

// handle navbar scroll behavior
const navbar = document.getElementById("navbar");
const SCROLL_THRESHOLD = 40;

function updateNavbar() {
  if (!navbar) return;
  navbar.classList.toggle("scrolled", window.scrollY > SCROLL_THRESHOLD);
}

updateNavbar();
window.addEventListener("scroll", updateNavbar, { passive: true });

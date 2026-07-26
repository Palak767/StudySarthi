// ===============================
// StudySarthi Settings
// ===============================

// Save buttons
const saveButtons = document.querySelectorAll(".save-btn");

saveButtons.forEach(button => {

    button.addEventListener("click", () => {

        showToast();

    });

});
// ==========================
// Toast
// ==========================

function showToast(message = "Settings saved successfully!") {

    const toast = document.getElementById("toast");

    toast.textContent = "✅ " + message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}

// ==========================
// Save Settings
// ==========================

document.querySelectorAll(".save-btn").forEach(button => {

    button.addEventListener("click", saveSettings);

});

function saveSettings() {

    document.querySelectorAll("input, select").forEach(element => {

        if (!element.id) return;

        if (element.type === "checkbox") {

            localStorage.setItem(element.id, element.checked);

        } else {

            localStorage.setItem(element.id, element.value);

        }

    });

    showToast();

}

// ==========================
// Load Settings
// ==========================

window.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll("input, select").forEach(element => {

        if (!element.id) return;

        const savedValue = localStorage.getItem(element.id);

        if (savedValue === null) return;

        if (element.type === "checkbox") {

            element.checked = savedValue === "true";

        } else {

            element.value = savedValue;

        }

    });

});
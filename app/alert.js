export const showAlert = function (message, timeout = 3000) {
    const alertMessage = document.createElement("div");
    alertMessage.classList.add("alert");
    alertMessage.textContent = message;
    document.body.append(alertMessage);

    setTimeout(hideAlert, timeout);
}
export const hideAlert = function() {
    const div = document.querySelector(".alert");
    div.remove();
}
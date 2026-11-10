"use strict";

const COOKIE_NAME = "a10_cookie_value";
const COOKIE_DAYS = 30;

function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = name + "=" + encodeURIComponent(value) +
    "; expires=" + expires + "; path=/; SameSite=Lax" +
    (location.protocol === "https:" ? "; Secure" : "");
}

function getCookie(name) {
  const prefix = name + "=";
  const cookie = document.cookie.split("; ").find(item => item.startsWith(prefix));
  return cookie ? decodeURIComponent(cookie.substring(prefix.length)) : "";
}

const savedView = document.getElementById("saved-view");
const entryView = document.getElementById("entry-view");
const cookieValue = document.getElementById("cookie-value");
const cookieForm = document.getElementById("cookie-form");
const cookieInput = document.getElementById("cookie-input");
const status = document.getElementById("status");
const changeButton = document.getElementById("change-button");

function showSavedValue(value) {
  cookieValue.textContent = value;
  savedView.hidden = false;
  entryView.hidden = true;
  status.textContent = "Your cookie was found in this browser.";
}

function showEntryForm() {
  savedView.hidden = true;
  entryView.hidden = false;
  status.textContent = "";
  cookieInput.focus();
}

function displayCookie() {
  const value = getCookie(COOKIE_NAME);
  if (value) {
    showSavedValue(value);
  } else {
    showEntryForm();
  }
}

cookieForm.addEventListener("submit", event => {
  event.preventDefault();
  const value = cookieInput.value.trim();
  if (!value) {
    status.textContent = "Please enter a value before saving.";
    cookieInput.focus();
    return;
  }
  setCookie(COOKIE_NAME, value, COOKIE_DAYS);
  showSavedValue(value);
  cookieInput.value = "";
});

changeButton.addEventListener("click", showEntryForm);

// Read the cookie on every page load. A saved value is shown without the form.
displayCookie();

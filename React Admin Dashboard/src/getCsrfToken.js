export default function getCsrfToken() {
    const csrfTokenElement = document.querySelector('meta[name="csrf-token"]');
    return csrfTokenElement ? csrfTokenElement.getAttribute('content') : '';
}

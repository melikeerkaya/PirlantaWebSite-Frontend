// Bilgisayarında çalışırken yerel backend, yayında Vercel'deki backend kullanılır.
window.API_BASE = ["localhost", "127.0.0.1", ""].includes(window.location.hostname)
  ? "http://localhost:5000/api"
  : "https://pirlanta-web-site-backend.vercel.app/api";

// Bilgisayarında çalışırken yerel backend, yayında Vercel'deki backend kullanılır.
// Backend yayınlandıktan sonra aşağıdaki BACKEND-ADRESI kısmını gerçek adresle değiştir.
window.API_BASE = ["localhost", "127.0.0.1", ""].includes(window.location.hostname)
  ? "http://localhost:5000/api"
  : "https://BACKEND-ADRESI.vercel.app/api";

// ============================================================
//  Formatage
// ============================================================
function formatCFA(montant) {
    return Number(montant || 0)
        .toFixed(0)
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " FCFA";
}

function formatDate(dateStr) {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("fr-FR");
}

// ============================================================
//  Génération de codes
// ============================================================
function genererCodeClient(total) {
    return "CLI-" + (total + 1).toString().padStart(3, "0");
}

function genererCodeProforma(total) {
    const year = new Date().getFullYear();
    return "PF-" + year + "-" + (total + 1).toString().padStart(4, "0");
}

function genererCodeRavitaillement(total) {
    const year = new Date().getFullYear();
    return "RAV-" + year + "-" + (total + 1).toString().padStart(3, "0");
}

// ============================================================
//  Lien proforma
// ============================================================
function genererLienProforma(code) {
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}?proforma=${code}`;
}

// ============================================================
//  Notification
// ============================================================
function showNotification(message, type = "success") {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.style.background = type === "error" ? "#ef4444" : "#009639";
    notification.classList.add("show");
    setTimeout(() => notification.classList.remove("show"), 4000);
}

// ============================================================
//  Navigation
// ============================================================
function showPage(pageName) {
    document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
    document.querySelectorAll(".nav-item").forEach((n) => n.classList.remove("active"));
    document.getElementById(`page-${pageName}`).classList.add("active");
    event.target.closest(".nav-item").classList.add("active");

    if (pageName === "ravitaillements") loadRavitaillements();
    if (pageName === "clients") loadClients();
    if (pageName === "proformas") loadProformas();
}

function closeOffcanvas() {
    document.getElementById("offcanvas").classList.remove("active");
}

function retourAccueil() {
    document.querySelector(".app").style.display = "grid";
    document.getElementById("proforma-view-page").style.display = "none";
    document.title = "Gestion Proforma";
    const url = new URL(window.location);
    url.searchParams.delete("proforma");
    window.history.replaceState({}, "", url);
}
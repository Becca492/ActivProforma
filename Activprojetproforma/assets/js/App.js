// ============================================================
//  Initialisation
// ============================================================
async function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const proformaCode = urlParams.get("proforma");

    if (proformaCode) {
        await showProformaView(proformaCode);
    } else {
        await loadAllData();
    }
}

async function loadAllData() {
    await Promise.all([loadClients(), loadProformas(), loadRavitaillements()]);
    await updateStats();
}

async function updateStats() {
    try {
        const [clients, proformas, ravitaillements] = await Promise.all([
            getClients(),
            getProformas(),
            getRavitaillements(),
        ]);

        const proformasPayees = proformas.filter((p) => p.statut === "Payé").length;

        document.getElementById("stats-clients").textContent = clients.length;
        document.getElementById("stats-proformas").textContent = proformas.length;
        document.getElementById("stats-ravitaillements").textContent = ravitaillements.length;
        document.getElementById("stats-proformas-payees").textContent = proformasPayees;
    } catch (err) {
        console.error("Erreur updateStats:", err);
    }
}

// ============================================================
//  Offcanvas
// ============================================================
async function openOffcanvas(type, clientId = null) {
    currentOffcanvasType = type;
    const title = document.getElementById("offcanvas-title");
    const content = document.getElementById("offcanvas-content");

    content.innerHTML = '<p style="text-align:center;padding:40px;color:#64748b;"><i class="fas fa-spinner fa-spin"></i> Chargement...</p>';
    document.getElementById("offcanvas").classList.add("active");

    if (type === "client") {
        title.textContent = "Nouveau client";
        content.innerHTML = getClientForm();
    } else if (type === "commande") {
        title.textContent = "Nouvelle commande";
        content.innerHTML = await getCommandeForm(clientId);
        // Si un client est déjà sélectionné, charger ses ravitaillements
        if (clientId) await chargerRavitaillementsClient(clientId);
    } else if (type === "ravitaillement") {
        title.textContent = "Nouvelle ligne de ravitaillement";
        content.innerHTML = await getRavitaillementForm(clientId);
    }
}

// ============================================================
//  Démarrage
// ============================================================
window.onload = init;
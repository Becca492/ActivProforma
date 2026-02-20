//const defaultData = {
//    clients: [
//        {
//            id: 1,
//            code: "CLI-001",
//            nom: "Abidjan Trading",
//            email: "contact@abidjantrading.ci",
//            telephone: "27 20 30 40 50",
//            societe: "Abidjan Trading SARL",
//            adresse: "Zone 4, Marcory, Abidjan",
//            dateCreation: "2024-01-15",
//            ville: "Abidjan",
//        },
//        {
//            id: 2,
//            code: "CLI-002",
//            nom: "Sodemi Industrie",
//            email: "info@sodemi.ci",
//            telephone: "27 21 30 45 60",
//            societe: "Sodemi SA",
//            adresse: "Boulevard de Marseille, Treichville",
//            dateCreation: "2024-01-20",
//            ville: "Abidjan",
//        },
//        {
//            id: 3,
//            code: "CLI-003",
//            nom: "Bouaké Distribution",
//            email: "contact@bouakedist.ci",
//            telephone: "27 31 50 70 80",
//            societe: "Bouaké Distribution",
//            adresse: "Centre-ville, Bouaké",
//            dateCreation: "2024-02-01",
//            ville: "Bouaké",
//        },
//    ],
//    articles: [
//        {
//            id: 1,
//            code: "ART-001",
//            designation: "Ordinateur portable HP ProBook",
//            prix: 450000,
//            tva: 18,
//        },
//        {
//            id: 2,
//            code: "ART-002",
//            designation: "Écran 24 pouces Dell",
//            prix: 175000,
//            tva: 18,
//        },
//        {
//            id: 3,
//            code: "ART-003",
//            designation: "Souris sans fil Logitech",
//            prix: 15000,
//            tva: 18,
//        },
//        {
//            id: 4,
//            code: "ART-004",
//            designation: "Clavier mécanique",
//            prix: 35000,
//            tva: 18,
//        },
//        {
//            id: 5,
//            code: "ART-005",
//            designation: "Disque SSD 1To",
//            prix: 85000,
//            tva: 18,
//        },
//        {
//            id: 6,
//            code: "ART-006",
//            designation: "Licence Windows 11 Pro",
//            prix: 150000,
//            tva: 18,
//        },
//        {
//            id: 7,
//            code: "ART-007",
//            designation: "Imprimante laser HP",
//            prix: 250000,
//            tva: 18,
//        },
//        {
//            id: 8,
//            code: "ART-008",
//            designation: "Onduleur APC 1000VA",
//            prix: 125000,
//            tva: 18,
//        },
//        {
//            id: 9,
//            code: "ART-009",
//            designation: "Switch 8 ports Gigabit",
//            prix: 65000,
//            tva: 18,
//        },
//        {
//            id: 10,
//            code: "ART-010",
//            designation: "RAM 16Go DDR4",
//            prix: 75000,
//            tva: 18,
//        },
//    ],
//    proformas: [
//        {
//            id: 1,
//            code: "PF-2025-0001",
//            clientId: 1,
//            date: "2025-02-16",
//            articles: [
//                {
//                    id: 1,
//                    code: "ART-001",
//                    designation: "Ordinateur portable HP ProBook",
//                    prix: 450000,
//                    quantite: 2,
//                },
//                {
//                    id: 3,
//                    code: "ART-003",
//                    designation: "Souris sans fil Logitech",
//                    prix: 15000,
//                    quantite: 5,
//                },
//            ],
//            montantHT: 975000,
//            montantTVA: 175500,
//            montantTTC: 1150500,
//            statut: "En attente",
//            dateCreation: "2025-02-16T10:30:00",
//        },
//    ],
//    ravitaillements: [
//        {
//            id: 1,
//            code: "RAV-2025-001",
//            clientId: 1,
//            dateCreation: "2025-02-16",
//            articles: [
//                { id: 1, nom: "Ordinateur HP ProBook", quantite: 5 },
//                { id: 3, nom: "Souris Logitech", quantite: 20 },
//                { id: 4, nom: "Clavier mécanique", quantite: 10 },
//            ],
//        },
//        {
//            id: 2,
//            code: "RAV-2025-002",
//            clientId: 1,
//            dateCreation: "2025-02-20",
//            articles: [
//                { id: 2, nom: "Écran 24 pouces Dell", quantite: 3 },
//                { id: 7, nom: "Imprimante laser HP", quantite: 2 },
//            ],
//        },
//        {
//            id: 3,
//            code: "RAV-2025-003",
//            clientId: 2,
//            dateCreation: "2025-02-16",
//            articles: [
//                { id: 2, nom: "Écran 24 pouces Dell", quantite: 8 },
//                { id: 5, nom: "Disque SSD 1To", quantite: 15 },
//            ],
//        },
//        {
//            id: 4,
//            code: "RAV-2025-004",
//            clientId: 2,
//            dateCreation: "2025-02-22",
//            articles: [
//                { id: 8, nom: "Onduleur APC", quantite: 4 },
//                { id: 10, nom: "RAM 16Go DDR4", quantite: 10 },
//            ],
//        },
//    ],
//};

//// Variables globales
//let selectedArticles = [];
//let selectedRavitaillements = [];
//let currentOffcanvasType = "";
//const TVA_CI = 18;

//// Initialisation
//function init() {
//    if (!localStorage.getItem("pf_clients")) {
//        localStorage.setItem("pf_clients", JSON.stringify(defaultData.clients));
//    }
//    if (!localStorage.getItem("pf_articles")) {
//        localStorage.setItem("pf_articles", JSON.stringify(defaultData.articles));
//    }
//    if (!localStorage.getItem("pf_proformas")) {
//        localStorage.setItem("pf_proformas", JSON.stringify(defaultData.proformas));
//    }
//    if (!localStorage.getItem("pf_ravitaillements")) {
//        localStorage.setItem(
//            "pf_ravitaillements",
//            JSON.stringify(defaultData.ravitaillements),
//        );
//    }

//    // Vérifier si on est sur une page de visualisation
//    const urlParams = new URLSearchParams(window.location.search);
//    const proformaCode = urlParams.get("proforma");

//    if (proformaCode) {
//        showProformaView(proformaCode);
//    } else {
//        loadAllData();
//    }
//}

//// Getters
//function getClients() {
//    return JSON.parse(localStorage.getItem("pf_clients")) || [];
//}

//function getArticles() {
//    return JSON.parse(localStorage.getItem("pf_articles")) || [];
//}

//function getProformas() {
//    return JSON.parse(localStorage.getItem("pf_proformas")) || [];
//}

//function getRavitaillements() {
//    return JSON.parse(localStorage.getItem("pf_ravitaillements")) || [];
//}

//// Sauvegardes
//function saveClients(clients) {
//    localStorage.setItem("pf_clients", JSON.stringify(clients));
//}

//function saveProformas(proformas) {
//    localStorage.setItem("pf_proformas", JSON.stringify(proformas));
//}

//function saveRavitaillements(ravitaillements) {
//    localStorage.setItem("pf_ravitaillements", JSON.stringify(ravitaillements));
//}

//// Formater en Franc CFA
//function formatCFA(montant) {
//    return montant.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " FCFA";
//}

//// Générer codes
//function genererCodeClient() {
//    const clients = getClients();
//    return "CLI-" + (clients.length + 1).toString().padStart(3, "0");
//}

//function genererCodeProforma() {
//    const proformas = getProformas();
//    const year = new Date().getFullYear();
//    return (
//        "PF-" + year + "-" + (proformas.length + 1).toString().padStart(4, "0")
//    );
//}

//function genererCodeRavitaillement() {
//    const ravitaillements = getRavitaillements();
//    const year = new Date().getFullYear();
//    return (
//        "RAV-" +
//        year +
//        "-" +
//        (ravitaillements.length + 1).toString().padStart(3, "0")
//    );
//}

//// Générer lien unique pour proforma
//function genererLienProforma(code) {
//    const baseUrl = window.location.origin + window.location.pathname;
//    return `${baseUrl}?proforma=${code}`;
//}

//function loadAllData() {
//    loadClients();
//    loadProformas();
//    loadRavitaillements();
//    updateStats();
//}

//function loadClients() {
//    const clients = getClients();
//    const ravitaillements = getRavitaillements();

//    // Dashboard
//    const dashboardClients = document.getElementById("dashboard-clients");
//    dashboardClients.innerHTML =
//        clients
//            .slice(-5)
//            .reverse()
//            .map((client) => {
//                const clientRavitaillements = ravitaillements.filter(
//                    (r) => r.clientId === client.id,
//                );
//                return `
//                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; border-bottom: 1px solid #e2e8f0;">
//                        <div>
//                            <div style="font-weight: 600;">${client.nom}</div>
//                            <div style="font-size: 12px; color: #009639;">${client.code}</div>
//                            <div style="font-size: 11px; color: #f59e0b; margin-top: 4px;">
//                                <i class="fas fa-truck"></i> ${clientRavitaillements.length} ligne(s) de ravitaillement
//                            </div>
//                        </div>
//                        <span style="background: #e6f2e6; padding: 6px 14px; border-radius: 30px; font-size: 12px; color: #009639;">${client.societe}</span>
//                    </div>
//                `;
//            })
//            .join("") ||
//        '<p style="text-align: center; padding: 20px;">Aucun client</p>';

//    // Grid clients avec TOUTES leurs lignes de ravitaillement
//    const clientsGrid = document.getElementById("clients-grid");
//    clientsGrid.innerHTML = clients
//        .map((client) => {
//            const clientRavitaillements = ravitaillements.filter(
//                (r) => r.clientId === client.id,
//            );
//            const proformas = getProformas().filter((p) => p.clientId === client.id);

//            let ravitaillementsHtml = "";
//            if (clientRavitaillements.length > 0) {
//                ravitaillementsHtml = clientRavitaillements
//                    .map(
//                        (rav) => `
//                        <div class="ravitaillement-card" style="background: #f8fafc; border-radius: 16px; padding: 16px; margin-bottom: 12px; border-left: 4px solid #f59e0b;">
//                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
//                                <span style="font-weight: 600; color: #f59e0b;"><i class="fas fa-truck"></i> ${rav.code}</span>
//                                <span style="font-size: 12px; color: #64748b;">${rav.dateCreation}</span>
//                            </div>
//                            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin: 12px 0;">
//                                ${rav.articles
//                                .map(
//                                    (a) => `
//                                    <div style="display: flex; align-items: center; gap: 6px; font-size: 13px;">
//                                        <i class="fas fa-box" style="color: #009639;"></i>
//                                        <span>${a.nom}</span>
//                                        <span style="background: #f59e0b; color: white; padding: 2px 6px; border-radius: 20px; font-size: 10px;">x${a.quantite}</span>
//                                    </div>
//                                `,
//                                )
//                                .join("")}
//                            </div>
//                            <div style="display: flex; gap: 8px; margin-top: 8px;">
//                                <button class="btn-secondary" style="flex: 1; padding: 6px; font-size: 12px;" onclick="utiliserRavitaillement(${rav.id})">
//                                    <i class="fas fa-shopping-cart"></i> Utiliser
//                                </button>
//                                <button class="btn-secondary" style="flex: 1; padding: 6px; font-size: 12px;" onclick="supprimerRavitaillement(${rav.id})">
//                                    <i class="fas fa-trash"></i> Supprimer
//                                </button>
//                            </div>
//                        </div>
//                    `,
//                    )
//                    .join("");
//            }

//            return `
//                    <div class="client-card">
//                        <div class="client-header">
//                            <div class="client-name">
//                                <h3>${client.nom}</h3>
//                                <span class="client-code">${client.code}</span>
//                            </div>
//                        </div>
//                        <div style="margin-bottom: 20px;">
//                            <p style="margin-bottom: 8px;"><i class="fas fa-building" style="color: #64748b; width: 20px;"></i> ${client.societe}</p>
//                            <p style="margin-bottom: 8px;"><i class="fas fa-envelope" style="color: #64748b; width: 20px;"></i> ${client.email}</p>
//                            <p style="margin-bottom: 8px;"><i class="fas fa-phone" style="color: #64748b; width: 20px;"></i> ${client.telephone || "Non renseigné"}</p>
                            
//                            ${clientRavitaillements.length > 0
//                    ? `
//                                <div style="margin: 16px 0;">
//                                    <p style="font-weight: 600; margin-bottom: 12px; color: #f59e0b;">
//                                        <i class="fas fa-truck"></i> Lignes de ravitaillement (${clientRavitaillements.length})
//                                    </p>
//                                    ${ravitaillementsHtml}
//                                </div>
//                            `
//                    : ""
//                }
                            
//                            <p style="margin-bottom: 8px;"><i class="fas fa-map-marker-alt" style="color: #64748b; width: 20px;"></i> ${client.adresse || ""} ${client.ville ? `- ${client.ville}` : ""}</p>
//                        </div>
//                        <div style="display: flex; gap: 12px;">
//                            <button class="btn-secondary" style="flex: 1;" onclick="openOffcanvas('commande', ${client.id})">
//                                <i class="fas fa-cart-plus"></i> Commande
//                            </button>
//                            <button class="btn-primary" style="flex: 1; background: #f59e0b;" onclick="openOffcanvas('ravitaillement', ${client.id})">
//                                <i class="fas fa-plus-circle"></i> Ravitaillement
//                            </button>
//                        </div>
//                    </div>
//                `;
//        })
//        .join("");
//}

//function loadRavitaillements() {
//    const ravitaillements = getRavitaillements();
//    const clients = getClients();
//    const grid = document.getElementById("ravitaillements-grid");

//    grid.innerHTML =
//        ravitaillements
//            .map((rav) => {
//                const client = clients.find((c) => c.id === rav.clientId);
//                return `
//                    <div class="client-card">
//                        <div style="background: #f8fafc; border-radius: 16px; padding: 16px;">
//                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
//                                <div>
//                                    <span style="font-weight: 700; color: #f59e0b; font-size: 18px;"><i class="fas fa-truck"></i> ${rav.code}</span>
//                                    <div style="font-size: 14px; color: #64748b; margin-top: 4px;">${client?.nom || "Client inconnu"}</div>
//                                </div>
//                                <span style="background: #e6f2e6; padding: 6px 14px; border-radius: 30px; font-size: 12px;">${rav.dateCreation}</span>
//                            </div>
                            
//                            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 20px;">
//                                ${rav.articles
//                        .map(
//                            (a) => `
//                                    <div style="display: flex; align-items: center; gap: 8px; background: white; padding: 8px 12px; border-radius: 12px;">
//                                        <i class="fas fa-box" style="color: #009639;"></i>
//                                        <span style="font-size: 13px;">${a.nom}</span>
//                                        <span style="background: #f59e0b; color: white; padding: 2px 8px; border-radius: 20px; font-size: 11px; margin-left: auto;">x${a.quantite}</span>
//                                    </div>
//                                `,
//                        )
//                        .join("")}
//                            </div>
                            
//                            <div style="display: flex; gap: 12px;">
//                                <button class="btn-primary" style="flex: 1;" onclick="utiliserRavitaillement(${rav.id})">
//                                    <i class="fas fa-shopping-cart"></i> Créer commande
//                                </button>
//                                <button class="btn-secondary" style="flex: 1;" onclick="supprimerRavitaillement(${rav.id})">
//                                    <i class="fas fa-trash"></i> Supprimer
//                                </button>
//                            </div>
//                        </div>
//                    </div>
//                `;
//            })
//            .join("") ||
//        '<p style="text-align: center; padding: 40px;">Aucune ligne de ravitaillement</p>';
//}

//function loadProformas() {
//    const proformas = getProformas();
//    const clients = getClients();

//    // Dashboard
//    const dashboardProformas = document.getElementById("dashboard-proformas");
//    dashboardProformas.innerHTML =
//        proformas
//            .slice(-5)
//            .reverse()
//            .map((proforma) => {
//                const client = clients.find((c) => c.id === proforma.clientId);
//                return `
//                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; border-bottom: 1px solid #e2e8f0;">
//                        <div>
//                            <div style="font-weight: 600; color: #009639;">${proforma.code}</div>
//                            <div style="font-size: 12px; color: #64748b;">${client?.nom || "Client inconnu"}</div>
//                        </div>
//                        <span style="font-weight: 700; color: #009639;">${formatCFA(proforma.montantTTC || 0)}</span>
//                    </div>
//                `;
//            })
//            .join("") ||
//        '<p style="text-align: center; padding: 20px;">Aucune proforma</p>';

//    // Grid proformas avec liens de partage
//    const proformasGrid = document.getElementById("proformas-grid");
//    proformasGrid.innerHTML = proformas
//        .map((proforma) => {
//            const client = clients.find((c) => c.id === proforma.clientId);
//            const lien = genererLienProforma(proforma.code);

//            return `
//                    <div class="proforma-card">
//                        <div class="proforma-header">
//                            <span class="proforma-number">${proforma.code}</span>
//                            <span class="proforma-status status-${proforma.statut === "Payé" ? "paye" : "en-attente"}">
//                                ${proforma.statut || "En attente"}
//                            </span>
//                        </div>
//                        <div style="margin-bottom: 20px;">
//                            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
//                                <span style="color: #64748b;">Client:</span>
//                                <span style="font-weight: 600;">${client?.nom || "Client inconnu"}</span>
//                            </div>
//                            <div style="display: flex; justify-content: space-between;">
//                                <span style="color: #64748b;">Date:</span>
//                                <span>${proforma.date}</span>
//                            </div>
//                        </div>
//                        <div style="background: #f8fafc; padding: 16px; border-radius: 16px; margin-bottom: 20px; border-left: 4px solid #009639;">
//                            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
//                                <span>Total HT</span>
//                                <span>${formatCFA(proforma.montantHT || 0)}</span>
//                            </div>
//                            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
//                                <span>TVA (18%) <span class="tva-badge">Côte d'Ivoire</span></span>
//                                <span>${formatCFA(proforma.montantTVA || 0)}</span>
//                            </div>
//                            <div style="display: flex; justify-content: space-between; font-weight: 700; color: #009639; margin-top: 8px; padding-top: 8px; border-top: 2px solid #e2e8f0;">
//                                <span>Total TTC</span>
//                                <span>${formatCFA(proforma.montantTTC || 0)}</span>
//                            </div>
//                        </div>

//                        <!-- Lien de partage unique -->
//                        <div class="share-link-container">
//                            <i class="fas fa-link" style="color: #009639;"></i>
//                            <input type="text" class="share-link" id="link-${proforma.id}" value="${lien}" readonly>
//                            <button class="btn-copy" onclick="copierLien('${proforma.id}')" title="Copier le lien">
//                                <i class="fas fa-copy"></i>
//                            </button>
//                        </div>

//                        <div class="share-buttons">
//                            <button class="btn-share btn-whatsapp" onclick="partagerWhatsApp('${proforma.code}')">
//                                <i class="fab fa-whatsapp"></i> WhatsApp
//                            </button>
//                            <button class="btn-share btn-email" onclick="partagerEmail('${proforma.code}')">
//                                <i class="fas fa-envelope"></i> Email
//                            </button>
//                            <button class="btn-share btn-secondary" onclick="ouvrirLien('${proforma.code}')">
//                                <i class="fas fa-external-link-alt"></i> Voir
//                            </button>
//                        </div>

//                        <div style="display: flex; gap: 12px; margin-top: 16px;">
//                            <button class="btn-primary" style="flex: 1;" onclick="changerStatut(${proforma.id})">
//                                <i class="fas fa-check-circle"></i> ${proforma.statut === "Payé" ? "Impayé" : "Payé"}
//                            </button>
//                        </div>
//                    </div>
//                `;
//        })
//        .join("");
//}

//function updateStats() {
//    const clients = getClients();
//    const proformas = getProformas();
//    const ravitaillements = getRavitaillements();
//    const proformasPayees = proformas.filter((p) => p.statut === "Payé").length;

//    document.getElementById("stats-clients").textContent = clients.length;
//    document.getElementById("stats-proformas").textContent = proformas.length;
//    document.getElementById("stats-ravitaillements").textContent =
//        ravitaillements.length;
//    document.getElementById("stats-proformas-payees").textContent =
//        proformasPayees;
//}

//function openOffcanvas(type, clientId = null) {
//    currentOffcanvasType = type;
//    const offcanvas = document.getElementById("offcanvas");
//    const title = document.getElementById("offcanvas-title");
//    const content = document.getElementById("offcanvas-content");

//    if (type === "client") {
//        title.textContent = "Nouveau client";
//        content.innerHTML = getClientForm();
//    } else if (type === "commande") {
//        title.textContent = "Nouvelle commande";
//        content.innerHTML = getCommandeForm(clientId);
//    } else if (type === "ravitaillement") {
//        title.textContent = "Nouvelle ligne de ravitaillement";
//        content.innerHTML = getRavitaillementForm(clientId);
//    }

//    offcanvas.classList.add("active");
//}

//function getClientForm() {
//    return `
//                <form id="clientForm" onsubmit="enregistrerClient(event)">
//                    <div class="form-group">
//                        <label>Nom complet *</label>
//                        <input type="text" id="client-nom" required>
//                    </div>
//                    <div class="form-group">
//                        <label>Société *</label>
//                        <input type="text" id="client-societe" required>
//                    </div>
//                    <div class="form-group">
//                        <label>Email *</label>
//                        <input type="email" id="client-email" required>
//                    </div>
//                    <div class="form-group">
//                        <label>Téléphone</label>
//                        <input type="text" id="client-telephone">
//                    </div>
//                    <div class="form-group">
//                        <label>Ville</label>
//                        <select id="client-ville">
//                            <option value="">Sélectionner</option>
//                            <option value="Abidjan">Abidjan</option>
//                            <option value="Bouaké">Bouaké</option>
//                            <option value="Daloa">Daloa</option>
//                        </select>
//                    </div>
//                    <div class="form-group">
//                        <label>Adresse</label>
//                        <textarea id="client-adresse" rows="3"></textarea>
//                    </div>
//                    <button type="submit" class="btn-generate">Enregistrer</button>
//                </form>
//            `;
//}

//function getRavitaillementForm(clientId = null) {
//    const clients = getClients();
//    const articles = getArticles();

//    return `
//                <form id="ravitaillementForm" onsubmit="enregistrerRavitaillement(event)">
//                    <div class="form-group">
//                        <label>Client *</label>
//                        <select id="ravitaillement-client" required>
//                            <option value="">Sélectionner un client</option>
//                            ${clients.map((c) => `<option value="${c.id}" ${clientId == c.id ? "selected" : ""}>${c.nom}</option>`).join("")}
//                        </select>
//                    </div>
//                    <div style="margin-top: 24px;">
//                        <label style="font-weight: 600; margin-bottom: 16px; display: block;">Articles de ravitaillement</label>
//                        <div class="articles-list">
//                            ${articles
//            .map(
//                (article) => `
//                                <div class="article-item">
//                                    <input type="checkbox" class="rav-article-checkbox" value="${article.id}">
//                                    <div class="article-details">
//                                        <h4>${article.designation}</h4>
//                                    </div>
//                                    <input type="number" class="rav-article-quantite" value="1" min="1" style="width: 70px; padding: 8px; border: 1px solid #e2e8f0; border-radius: 8px;">
//                                </div>
//                            `,
//            )
//            .join("")}
//                        </div>
//                    </div>
//                    <button type="submit" class="btn-generate">Créer la ligne de ravitaillement</button>
//                </form>
//            `;
//}

//function getCommandeForm(clientId = null) {
//    const clients = getClients();
//    const articles = getArticles();
//    selectedArticles = [];
//    selectedRavitaillements = [];

//    return `
//                <form id="commandeForm" onsubmit="enregistrerCommande(event)">
//                    <div class="form-group">
//                        <label>Client *</label>
//                        <select id="commande-client" required onchange="chargerRavitaillementsClient(this.value)">
//                            <option value="">Sélectionner un client</option>
//                            ${clients.map((c) => `<option value="${c.id}" ${clientId == c.id ? "selected" : ""}>${c.nom}</option>`).join("")}
//                        </select>
//                    </div>
                    
//                    <!-- Section de sélection des ravitaillements -->
//                    <div id="ravitaillements-selection-section" style="display: none; margin-bottom: 24px; background: #fef3c7; padding: 20px; border-radius: 16px; border-left: 4px solid #f59e0b;">
//                        <h4 style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px; color: #92400e;">
//                            <i class="fas fa-truck"></i> Lignes de ravitaillement disponibles
//                        </h4>
//                        <div id="ravitaillements-checkbox-list"></div>
//                        <button type="button" class="btn-secondary" style="margin-top: 16px; width: 100%; background: #f59e0b; color: white; border: none;" onclick="appliquerRavitaillementsSelectionnes()">
//                            <i class="fas fa-check-circle"></i> Appliquer les ravitaillements sélectionnés
//                        </button>
//                    </div>

//                    <div class="form-group">
//                        <label>Date</label>
//                        <input type="date" id="commande-date" value="${new Date().toISOString().split("T")[0]}">
//                    </div>
                    
//                    <div style="margin-top: 24px;">
//                        <label style="font-weight: 600; margin-bottom: 16px; display: block;">Articles</label>
//                        <div class="articles-list">
//                            ${articles
//            .map(
//                (article) => `
//                                <div class="article-item" id="article-item-${article.id}">
//                                    <input type="checkbox" class="article-checkbox" value="${article.id}" onchange="toggleArticle(${article.id}, this.checked)">
//                                    <div class="article-details">
//                                        <h4>${article.designation}</h4>
//                                        <p style="color: #64748b; font-size: 13px;">${formatCFA(article.prix)}</p>
//                                    </div>
//                                    <input type="number" class="article-quantity" id="qte-${article.id}" value="1" min="1" style="display: none; width: 70px;" onchange="calculerTotaux()">
//                                </div>
//                            `,
//            )
//            .join("")}
//                        </div>
//                    </div>
                    
//                    <div class="calcul-tva">
//                        <div class="calcul-row">
//                            <span>Total HT</span>
//                            <span id="total-ht">0 FCFA</span>
//                        </div>
//                        <div class="calcul-row">
//                            <span>TVA (18%)</span>
//                            <span id="total-tva">0 FCFA</span>
//                        </div>
//                        <div class="calcul-row total-ttc">
//                            <span>Total TTC</span>
//                            <span id="total-ttc">0 FCFA</span>
//                        </div>
//                    </div>
//                    <button type="submit" class="btn-generate">Générer la proforma</button>
//                </form>
//            `;
//}

//// Nouvelle fonction pour charger et afficher les ravitaillements du client
//function chargerRavitaillementsClient(clientId) {
//    if (!clientId) {
//        document.getElementById("ravitaillements-selection-section").style.display =
//            "none";
//        return;
//    }

//    const ravitaillements = getRavitaillements();
//    const clientRavitaillements = ravitaillements.filter(
//        (r) => r.clientId == clientId,
//    );

//    const selectionSection = document.getElementById(
//        "ravitaillements-selection-section",
//    );
//    const checkboxList = document.getElementById("ravitaillements-checkbox-list");

//    if (clientRavitaillements.length > 0) {
//        // Afficher la section
//        selectionSection.style.display = "block";

//        // Créer les checkboxes pour chaque ravitaillement
//        checkboxList.innerHTML = clientRavitaillements
//            .map(
//                (rav) => `
//                    <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: white; border-radius: 12px; margin-bottom: 8px; border: 1px solid #e2e8f0;">
//                        <input type="checkbox" class="rav-selection-checkbox" value="${rav.id}" id="rav-${rav.id}" style="width: 20px; height: 20px; accent-color: #f59e0b;">
//                        <label for="rav-${rav.id}" style="flex: 1; cursor: pointer;">
//                            <div style="display: flex; justify-content: space-between;">
//                                <span style="font-weight: 600; color: #f59e0b;">${rav.code}</span>
//                                <span style="font-size: 12px; color: #64748b;">${rav.dateCreation}</span>
//                            </div>
//                            <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px;">
//                                ${rav.articles
//                        .map(
//                            (a) => `
//                                    <span style="background: #f1f5f9; padding: 2px 8px; border-radius: 20px; font-size: 11px;">
//                                        ${a.nom} <strong style="color: #f59e0b;">x${a.quantite}</strong>
//                                    </span>
//                                `,
//                        )
//                        .join("")}
//                            </div>
//                        </label>
//                    </div>
//                `,
//            )
//            .join("");
//    } else {
//        selectionSection.style.display = "none";
//    }
//}

//// Fonction pour appliquer les ravitaillements sélectionnés
//function appliquerRavitaillementsSelectionnes() {
//    // Récupérer tous les ravitaillements sélectionnés
//    const checkboxes = document.querySelectorAll(
//        ".rav-selection-checkbox:checked",
//    );

//    if (checkboxes.length === 0) {
//        alert("Sélectionnez au moins une ligne de ravitaillement");
//        return;
//    }

//    // Récupérer les IDs sélectionnés
//    const selectedIds = Array.from(checkboxes).map((cb) => parseInt(cb.value));
//    const tousRavitaillements = getRavitaillements();
//    const ravitaillementsSelectionnes = tousRavitaillements.filter((r) =>
//        selectedIds.includes(r.id),
//    );

//    // Stocker les ravitaillements sélectionnés
//    selectedRavitaillements = ravitaillementsSelectionnes;

//    // Décocher tous les articles d'abord
//    document.querySelectorAll(".article-checkbox").forEach((cb) => {
//        if (cb.checked) {
//            cb.checked = false;
//            const articleId = parseInt(cb.value);
//            document.getElementById(`qte-${articleId}`).style.display = "none";
//            document
//                .getElementById(`article-item-${articleId}`)
//                .classList.remove("selected");
//        }
//    });
//    selectedArticles = [];

//    // Pour chaque ravitaillement sélectionné, ajouter ses articles
//    ravitaillementsSelectionnes.forEach((rav) => {
//        rav.articles.forEach((articleRav) => {
//            const checkbox = document.querySelector(
//                `.article-checkbox[value="${articleRav.id}"]`,
//            );
//            if (checkbox) {
//                // Vérifier si l'article est déjà sélectionné
//                const existingArticle = selectedArticles.find(
//                    (a) => a.id === articleRav.id,
//                );

//                if (existingArticle) {
//                    // Si déjà sélectionné, additionner les quantités
//                    const qteInput = document.getElementById(`qte-${articleRav.id}`);
//                    const nouvelleQuantite =
//                        existingArticle.quantite + articleRav.quantite;
//                    qteInput.value = nouvelleQuantite;
//                    existingArticle.quantite = nouvelleQuantite;
//                } else {
//                    // Nouvel article
//                    checkbox.checked = true;
//                    const qteInput = document.getElementById(`qte-${articleRav.id}`);
//                    qteInput.style.display = "block";
//                    qteInput.value = articleRav.quantite;
//                    document
//                        .getElementById(`article-item-${articleRav.id}`)
//                        .classList.add("selected");

//                    const article = getArticles().find((a) => a.id === articleRav.id);
//                    selectedArticles.push({
//                        id: article.id,
//                        code: article.code,
//                        designation: article.designation,
//                        prix: article.prix,
//                        tva: article.tva,
//                        quantite: articleRav.quantite,
//                    });
//                }
//            }
//        });
//    });

//    // Recalculer les totaux
//    calculerTotaux();

//    // Afficher une notification
//    const nomsRav = ravitaillementsSelectionnes.map((r) => r.code).join(", ");
//    showNotification(
//        `${ravitaillementsSelectionnes.length} ligne(s) de ravitaillement appliquée(s) : ${nomsRav}`,
//    );
//}

//function toggleArticle(articleId, checked) {
//    const qteInput = document.getElementById(`qte-${articleId}`);
//    const articleItem = document.getElementById(`article-item-${articleId}`);

//    if (checked) {
//        qteInput.style.display = "block";
//        articleItem.classList.add("selected");

//        const article = getArticles().find((a) => a.id === articleId);
//        const quantity = parseInt(qteInput.value) || 1;

//        const existingIndex = selectedArticles.findIndex(
//            (a) => a.id === article.id,
//        );
//        if (existingIndex === -1) {
//            selectedArticles.push({
//                id: article.id,
//                code: article.code,
//                designation: article.designation,
//                prix: article.prix,
//                tva: article.tva,
//                quantite: quantity,
//            });
//        }
//    } else {
//        qteInput.style.display = "none";
//        articleItem.classList.remove("selected");
//        selectedArticles = selectedArticles.filter((a) => a.id !== articleId);
//    }

//    calculerTotaux();
//}

//function calculerTotaux() {
//    selectedArticles.forEach((article) => {
//        const qteInput = document.getElementById(`qte-${article.id}`);
//        if (qteInput) {
//            article.quantite = parseInt(qteInput.value) || 1;
//        }
//    });

//    const totalHT = selectedArticles.reduce(
//        (sum, a) => sum + a.prix * a.quantite,
//        0,
//    );
//    const totalTVA = totalHT * (TVA_CI / 100);
//    const totalTTC = totalHT + totalTVA;

//    document.getElementById("total-ht").textContent = formatCFA(totalHT);
//    document.getElementById("total-tva").textContent = formatCFA(totalTVA);
//    document.getElementById("total-ttc").textContent = formatCFA(totalTTC);
//}

//function enregistrerClient(event) {
//    event.preventDefault();

//    const clients = getClients();
//    const newClient = {
//        id: clients.length > 0 ? Math.max(...clients.map((c) => c.id)) + 1 : 1,
//        code: genererCodeClient(),
//        nom: document.getElementById("client-nom").value,
//        societe: document.getElementById("client-societe").value,
//        email: document.getElementById("client-email").value,
//        telephone: document.getElementById("client-telephone").value,
//        ville: document.getElementById("client-ville").value,
//        adresse: document.getElementById("client-adresse").value,
//        dateCreation: new Date().toISOString().split("T")[0],
//    };

//    clients.push(newClient);
//    saveClients(clients);
//    loadAllData();
//    closeOffcanvas();
//    showNotification("Client créé avec succès");
//}

//function enregistrerRavitaillement(event) {
//    event.preventDefault();

//    const clientId = parseInt(
//        document.getElementById("ravitaillement-client").value,
//    );
//    if (!clientId) {
//        alert("Sélectionnez un client");
//        return;
//    }

//    const articles = [];
//    document
//        .querySelectorAll(".rav-article-checkbox")
//        .forEach((checkbox, index) => {
//            if (checkbox.checked) {
//                const articleId = parseInt(checkbox.value);
//                const qteInput = document.querySelectorAll(".rav-article-quantite")[
//                    index
//                ];
//                const quantite = parseInt(qteInput.value) || 1;

//                const article = getArticles().find((a) => a.id === articleId);
//                articles.push({
//                    id: articleId,
//                    nom: article.designation,
//                    quantite: quantite,
//                });
//            }
//        });

//    if (articles.length === 0) {
//        alert("Sélectionnez au moins un article");
//        return;
//    }

//    const ravitaillements = getRavitaillements();
//    const newRavitaillement = {
//        id:
//            ravitaillements.length > 0
//                ? Math.max(...ravitaillements.map((r) => r.id)) + 1
//                : 1,
//        code: genererCodeRavitaillement(),
//        clientId: clientId,
//        dateCreation: new Date().toISOString().split("T")[0],
//        articles: articles,
//    };

//    ravitaillements.push(newRavitaillement);
//    saveRavitaillements(ravitaillements);
//    loadAllData();
//    closeOffcanvas();
//    showNotification(`Ligne de ravitaillement ${newRavitaillement.code} créée`);
//}

//function enregistrerCommande(event) {
//    event.preventDefault();

//    if (selectedArticles.length === 0) {
//        alert("Sélectionnez au moins un article");
//        return;
//    }

//    const clientId = parseInt(document.getElementById("commande-client").value);
//    if (!clientId) {
//        alert("Sélectionnez un client");
//        return;
//    }

//    const proformas = getProformas();
//    const totalHT = selectedArticles.reduce(
//        (sum, a) => sum + a.prix * a.quantite,
//        0,
//    );
//    const totalTVA = totalHT * (TVA_CI / 100);
//    const totalTTC = totalHT + totalTVA;

//    const newProforma = {
//        id: proformas.length > 0 ? Math.max(...proformas.map((p) => p.id)) + 1 : 1,
//        code: genererCodeProforma(),
//        clientId: clientId,
//        date: document.getElementById("commande-date").value,
//        articles: [...selectedArticles],
//        montantHT: totalHT,
//        montantTVA: totalTVA,
//        montantTTC: totalTTC,
//        statut: "En attente",
//        dateCreation: new Date().toISOString(),
//    };

//    proformas.push(newProforma);
//    saveProformas(proformas);
//    selectedArticles = [];
//    selectedRavitaillements = [];
//    loadAllData();
//    closeOffcanvas();

//    const lien = genererLienProforma(newProforma.code);
//    showNotification(
//        `Proforma ${newProforma.code} créée ! Lien de partage disponible`,
//    );
//}

//function utiliserRavitaillement(ravitaillementId) {
//    const ravitaillement = getRavitaillements().find(
//        (r) => r.id === ravitaillementId,
//    );
//    if (ravitaillement) {
//        openOffcanvas("commande", ravitaillement.clientId);
//        setTimeout(() => {
//            // Sélectionner automatiquement ce ravitaillement
//            const checkbox = document.getElementById(`rav-${ravitaillementId}`);
//            if (checkbox) {
//                checkbox.checked = true;
//                appliquerRavitaillementsSelectionnes();
//            }
//        }, 500);
//    }
//}

//function supprimerRavitaillement(id) {
//    if (confirm("Supprimer cette ligne de ravitaillement ?")) {
//        const ravitaillements = getRavitaillements().filter((r) => r.id !== id);
//        saveRavitaillements(ravitaillements);
//        loadAllData();
//        showNotification("Ligne de ravitaillement supprimée");
//    }
//}

//function changerStatut(id) {
//    const proformas = getProformas();
//    const proforma = proformas.find((p) => p.id === id);
//    if (proforma) {
//        proforma.statut = proforma.statut === "Payé" ? "En attente" : "Payé";
//        saveProformas(proformas);
//        loadProformas();
//        showNotification(`Statut mis à jour : ${proforma.statut}`);
//    }
//}

//// Fonctions de partage
//function copierLien(proformaId) {
//    const input = document.getElementById(`link-${proformaId}`);
//    navigator.clipboard.writeText(input.value);
//    showNotification("Lien copié dans le presse-papiers !");
//}

//function ouvrirLien(code) {
//    const lien = genererLienProforma(code);
//    window.open(lien, "_blank");
//}

//function partagerWhatsApp(code) {
//    const lien = genererLienProforma(code);
//    const proforma = getProformas().find((p) => p.code === code);
//    const client = getClients().find((c) => c.id === proforma?.clientId);

//    const texte = `Bonjour ${client?.nom || ""}, voici votre proforma ${code} d'un montant de ${formatCFA(proforma.montantTTC)} : ${lien}`;
//    const url = `https://wa.me/?text=${encodeURIComponent(texte)}`;
//    window.open(url, "_blank");
//}

//function partagerEmail(code) {
//    const lien = genererLienProforma(code);
//    const proforma = getProformas().find((p) => p.code === code);
//    const client = getClients().find((c) => c.id === proforma?.clientId);

//    const subject = encodeURIComponent(`Votre proforma ${code}`);
//    const body = encodeURIComponent(
//        `Bonjour,\n\nVeuillez trouver ci-joint le lien pour consulter votre proforma :\n${lien}\n\nMontant TTC: ${formatCFA(proforma.montantTTC)}\nTVA 18% incluse\n\nCordialement.`,
//    );

//    if (client?.email) {
//        window.location.href = `mailto:${client.email}?subject=${subject}&body=${body}`;
//    } else {
//        window.location.href = `mailto:?subject=${subject}&body=${body}`;
//    }
//}

//function retourAccueil() {
//    document.querySelector(".app").style.display = "grid";
//    document.getElementById("proforma-view-page").style.display = "none";
//    document.title = "Gestion Proforma";

//    const url = new URL(window.location);
//    url.searchParams.delete("proforma");
//    window.history.replaceState({}, "", url);
//}

//function showProformaView(code) {
//    document.querySelector(".app").style.display = "none";
//    const viewPage = document.getElementById("proforma-view-page");
//    viewPage.style.display = "block";

//    const proformas = getProformas();
//    const proforma = proformas.find((p) => p.code === code);

//    if (!proforma) {
//        document.getElementById("proforma-view-content").innerHTML = `
//                    <div style="text-align: center; padding: 60px;">
//                        <i class="fas fa-exclamation-triangle" style="font-size: 64px; color: #ef4444; margin-bottom: 24px;"></i>
//                        <h2>Proforma introuvable</h2>
//                        <p style="color: #64748b; margin-top: 16px;">Le code ${code} ne correspond à aucune proforma.</p>
//                        <button class="btn-primary" style="margin-top: 24px;" onclick="retourAccueil()">
//                            <i class="fas fa-home"></i> Retour à l'accueil
//                        </button>
//                    </div>
//                `;
//        return;
//    }

//    const client = getClients().find((c) => c.id === proforma.clientId);

//    let articlesHtml = "";
//    proforma.articles.forEach((article) => {
//        articlesHtml += `
//                    <tr>
//                        <td>${article.code}</td>
//                        <td>${article.designation}</td>
//                        <td>${article.quantite}</td>
//                        <td>${formatCFA(article.prix)}</td>
//                        <td>${formatCFA(article.prix * article.quantite)}</td>
//                    </tr>
//                `;
//    });

//    const viewContent = `
//                <div class="proforma-view-header">
//                    <h1 class="proforma-view-title">PROFORMA</h1>
//                    <span class="proforma-view-code">${proforma.code}</span>
//                </div>

//                <div class="proforma-view-info">
//                    <div class="info-block">
//                        <h4>Client</h4>
//                        <p>${client?.nom || "Client inconnu"}</p>
//                        <p style="font-size: 14px; font-weight: normal; margin-top: 8px;">${client?.societe || ""}</p>
//                        <p style="font-size: 14px; font-weight: normal;">${client?.email || ""}</p>
//                        <p style="font-size: 14px; font-weight: normal;">${client?.telephone || ""}</p>
//                    </div>
//                    <div class="info-block">
//                        <h4>Détails</h4>
//                        <p>Date: ${proforma.date}</p>
//                        <p style="font-size: 14px; font-weight: normal; margin-top: 8px;">Statut: 
//                            <span class="proforma-status status-${proforma.statut === "Payé" ? "paye" : "en-attente"}">
//                                ${proforma.statut || "En attente"}
//                            </span>
//                        </p>
//                        <p style="font-size: 14px; font-weight: normal; margin-top: 8px;">TVA: 18%</p>
//                    </div>
//                </div>

//                <h3 style="margin-bottom: 20px;">Articles commandés</h3>
//                <table class="proforma-view-table">
//                    <thead>
//                        <tr>
//                            <th>Code</th>
//                            <th>Désignation</th>
//                            <th>Qté</th>
//                            <th>Prix unitaire</th>
//                            <th>Total HT</th>
//                        </tr>
//                    </thead>
//                    <tbody>
//                        ${articlesHtml}
//                    </tbody>
//                </table>

//                <div class="proforma-view-total">
//                    <div style="display: flex; justify-content: flex-end; gap: 40px;">
//                        <div>
//                            <p style="color: #64748b; margin-bottom: 8px;">Total HT</p>
//                            <p style="font-size: 20px; font-weight: 600;">${formatCFA(proforma.montantHT || 0)}</p>
//                        </div>
//                        <div>
//                            <p style="color: #64748b; margin-bottom: 8px;">TVA (18%)</p>
//                            <p style="font-size: 20px; font-weight: 600;">${formatCFA(proforma.montantTVA || 0)}</p>
//                        </div>
//                        <div>
//                            <p style="color: #009639; margin-bottom: 8px;">Total TTC</p>
//                            <p class="total-line">${formatCFA(proforma.montantTTC || 0)}</p>
//                        </div>
//                    </div>
//                </div>

//                <div style="text-align: center; margin-top: 40px;">
//                    <button class="btn-secondary" onclick="window.print()">
//                        <i class="fas fa-print"></i> Imprimer
//                    </button>
//                    <button class="btn-primary" style="margin-left: 16px;" onclick="retourAccueil()">
//                        <i class="fas fa-home"></i> Retour à l'accueil
//                    </button>
//                </div>
//            `;

//    document.getElementById("proforma-view-content").innerHTML = viewContent;
//    document.title = `Proforma ${proforma.code}`;
//}

//function closeOffcanvas() {
//    document.getElementById("offcanvas").classList.remove("active");
//}

//function showPage(pageName) {
//    document
//        .querySelectorAll(".page")
//        .forEach((p) => p.classList.remove("active"));
//    document
//        .querySelectorAll(".nav-item")
//        .forEach((n) => n.classList.remove("active"));
//    document.getElementById(`page-${pageName}`).classList.add("active");
//    event.target.closest(".nav-item").classList.add("active");

//    if (pageName === "ravitaillements") {
//        loadRavitaillements();
//    }
//}

//function showNotification(message) {
//    const notification = document.getElementById("notification");
//    notification.textContent = message;
//    notification.classList.add("show");
//    setTimeout(() => notification.classList.remove("show"), 4000);
//}

//window.onload = init;
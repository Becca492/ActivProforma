// ============================================================
//  Chargement et affichage des clients
// ============================================================
async function loadClients() {
    try {
        const [clients, ravitaillements] = await Promise.all([
            getClients(),
            getRavitaillements(),
        ]);

        renderDashboardClients(clients, ravitaillements);
        renderClientsGrid(clients, ravitaillements);
    } catch (err) {
        console.error("Erreur loadClients:", err);
        showNotification("Erreur lors du chargement des clients", "error");
    }
}

function renderDashboardClients(clients, ravitaillements) {
    const el = document.getElementById("dashboard-clients");
    el.innerHTML =
        clients
            .slice(-5)
            .reverse()
            .map((client) => {
                const ravs = ravitaillements.filter((r) => r.idClient === client.idClient);
                return `
                <div style="display:flex;justify-content:space-between;align-items:center;padding:16px;border-bottom:1px solid #e2e8f0;">
                    <div>
                        <div style="font-weight:600;">${client.nom} ${client.prenom || ""}</div>
                        <div style="font-size:11px;color:#f59e0b;margin-top:4px;">
                            <i class="fas fa-truck"></i> ${ravs.length} ligne(s) de ravitaillement
                        </div>
                    </div>
                    <span style="background:#e6f2e6;padding:6px 14px;border-radius:30px;font-size:12px;color:#009639;">
                        ${client.adresse || ""}
                    </span>
                </div>`;
            })
            .join("") ||
        '<p style="text-align:center;padding:20px;">Aucun client</p>';
}

function renderClientsGrid(clients, ravitaillements) {
    const grid = document.getElementById("clients-grid");
    grid.innerHTML = clients
        .map((client) => {
            const clientRavs = ravitaillements.filter((r) => r.idClient === client.idClient);
            const ravHtml = clientRavs
                .map(
                    (rav) => `
                <div style="background:#f8fafc;border-radius:16px;padding:16px;margin-bottom:12px;border-left:4px solid #f59e0b;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                        <span style="font-weight:600;color:#f59e0b;"><i class="fas fa-truck"></i> ${rav.code}</span>
                    </div>
                    <div style="display:flex;gap:8px;margin-top:8px;">
                        <button class="btn-secondary" style="flex:1;padding:6px;font-size:12px;" onclick="utiliserRavitaillement(${rav.idRavi})">
                            <i class="fas fa-shopping-cart"></i> Utiliser
                        </button>
                        <button class="btn-secondary" style="flex:1;padding:6px;font-size:12px;" onclick="supprimerRavitaillement(${rav.idRavi})">
                            <i class="fas fa-trash"></i> Supprimer
                        </button>
                    </div>
                </div>`,
                )
                .join("");

            return `
            <div class="client-card">
                <div class="client-header">
                    <div class="client-name">
                        <h3>${client.nom} ${client.prenom || ""}</h3>
                    </div>
                </div>
                <div style="margin-bottom:20px;">
                    <p style="margin-bottom:8px;"><i class="fas fa-map-marker-alt" style="color:#64748b;width:20px;"></i> ${client.adresse || "Non renseignée"}</p>
                    ${clientRavs.length > 0
                    ? `<div style="margin:16px 0;">
                            <p style="font-weight:600;margin-bottom:12px;color:#f59e0b;">
                                <i class="fas fa-truck"></i> Lignes de ravitaillement (${clientRavs.length})
                            </p>
                            ${ravHtml}
                           </div>`
                    : ""}
                </div>
                <div style="display:flex;gap:12px;">
                    <button class="btn-secondary" style="flex:1;" onclick="openOffcanvas('commande', ${client.idClient})">
                        <i class="fas fa-cart-plus"></i> Commande
                    </button>
                    <button class="btn-primary" style="flex:1;background:#f59e0b;" onclick="openOffcanvas('ravitaillement', ${client.idClient})">
                        <i class="fas fa-plus-circle"></i> Ravitaillement
                    </button>
                </div>
            </div>`;
        })
        .join("");
}

// ============================================================
//  Formulaire client
// ============================================================
function getClientForm() {
    return `
        <form id="clientForm" onsubmit="enregistrerClient(event)">
            <div class="form-group">
                <label>Nom complet *</label>
                <input type="text" id="client-nom" required>
            </div>
            <div class="form-group">
                <label>Société *</label>
                <input type="text" id="client-societe" required>
            </div>
            <div class="form-group">
                <label>Email *</label>
                <input type="email" id="client-email" required>
            </div>
            <div class="form-group">
                <label>Téléphone</label>
                <input type="text" id="client-telephone">
            </div>
            <div class="form-group">
                <label>Ville</label>
                <select id="client-ville">
                    <option value="">Sélectionner</option>
                    <option value="Abidjan">Abidjan</option>
                    <option value="Bouaké">Bouaké</option>
                    <option value="Daloa">Daloa</option>
                    <option value="San-Pédro">San-Pédro</option>
                    <option value="Yamoussoukro">Yamoussoukro</option>
                </select>
            </div>
            <div class="form-group">
                <label>Adresse</label>
                <textarea id="client-adresse" rows="3"></textarea>
            </div>
            <button type="submit" class="btn-generate">Enregistrer</button>
        </form>`;
}

async function enregistrerClient(event) {
    event.preventDefault();
    try {
        await createClient({
            nom: document.getElementById("client-nom").value,
            societe: document.getElementById("client-societe").value,
            email: document.getElementById("client-email").value,
            telephone: document.getElementById("client-telephone").value,
            ville: document.getElementById("client-ville").value,
            adresse: document.getElementById("client-adresse").value,
        });
        await loadAllData();
        closeOffcanvas();
        showNotification("Client créé avec succès ✓");
    } catch (err) {
        console.error(err);
        showNotification("Erreur lors de la création du client", "error");
    }
}
// ============================================================
//  Chargement et affichage des proformas
// ============================================================
async function loadProformas() {
    try {
        const [proformas, clients] = await Promise.all([
            getProformas(),
            getClients(),
        ]);
        renderDashboardProformas(proformas, clients);
        renderProformasGrid(proformas, clients);
    } catch (err) {
        console.error("Erreur loadProformas:", err);
        showNotification("Erreur lors du chargement des proformas", "error");
    }
}

function renderDashboardProformas(proformas, clients) {
    const el = document.getElementById("dashboard-proformas");
    el.innerHTML =
        proformas
            .slice(-5)
            .reverse()
            .map((p) => {
                const client = clients.find((c) => c.idClient === p.idClient);
                return `
                <div style="display:flex;justify-content:space-between;align-items:center;padding:16px;border-bottom:1px solid #e2e8f0;">
                    <div>
                        <div style="font-weight:600;color:#009639;">${p.libelle}</div>
                        <div style="font-size:12px;color:#64748b;">${client ? `${client.nom} ${client.prenom || ""}` : "Client inconnu"}</div>
                    </div>
                    <span style="font-weight:700;color:#009639;">${formatCFA(p.montant)}</span>
                </div>`;
            })
            .join("") ||
        '<p style="text-align:center;padding:20px;">Aucune proforma</p>';
}

function renderProformasGrid(proformas, clients) {
    const grid = document.getElementById("proformas-grid");
    grid.innerHTML = proformas
        .map((p) => {
            const client = clients.find((c) => c.idClient === p.idClient);
            const lien = genererLienProforma(p.libelle);
            const statut = p.statut || "En attente";

            return `
            <div class="proforma-card">
                <div class="proforma-header">
                    <span class="proforma-number">${p.libelle}</span>
                    <span class="proforma-status status-${statut === "Payé" ? "paye" : "en-attente"}">${statut}</span>
                </div>
                <div style="margin-bottom:20px;">
                    <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                        <span style="color:#64748b;">Client:</span>
                        <span style="font-weight:600;">${client ? `${client.nom} ${client.prenom || ""}` : "Client inconnu"}</span>
                    </div>
                    <div style="display:flex;justify-content:space-between;">
                        <span style="color:#64748b;">Date:</span>
                        <span>${formatDate(p.dateCommande)}</span>
                    </div>
                </div>
                <div style="background:#f8fafc;padding:16px;border-radius:16px;margin-bottom:20px;border-left:4px solid #009639;">
                    <div style="display:flex;justify-content:space-between;font-weight:700;color:#009639;">
                        <span>Total TTC</span>
                        <span>${formatCFA(p.montant)}</span>
                    </div>
                </div>
                <div class="share-link-container">
                    <i class="fas fa-link" style="color:#009639;"></i>
                    <input type="text" class="share-link" id="link-${p.idCommande}" value="${lien}" readonly>
                    <button class="btn-copy" onclick="copierLien('${p.idCommande}')" title="Copier le lien">
                        <i class="fas fa-copy"></i>
                    </button>
                </div>
                <div class="share-buttons">
                    <button class="btn-share btn-whatsapp" onclick="partagerWhatsApp('${p.libelle}', ${p.idCommande})">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </button>
                    <button class="btn-share btn-email" onclick="partagerEmail('${p.libelle}', ${p.idCommande})">
                        <i class="fas fa-envelope"></i> Email
                    </button>
                    <button class="btn-share btn-secondary" onclick="ouvrirLien('${p.libelle}')">
                        <i class="fas fa-external-link-alt"></i> Voir
                    </button>
                </div>
                <div style="display:flex;gap:12px;margin-top:16px;">
                    <button class="btn-primary" style="flex:1;" onclick="changerStatut(${p.idCommande}, '${statut}')">
                        <i class="fas fa-check-circle"></i> ${statut === "Payé" ? "Marquer impayé" : "Marquer payé"}
                    </button>
                </div>
            </div>`;
        })
        .join("");
}

// ============================================================
//  Formulaire commande
// ============================================================
async function getCommandeForm(clientId = null) {
    const [clients, articles, ravitaillements] = await Promise.all([
        getClients(),
        getArticles(),
        getRavitaillements(),
    ]);

    selectedArticles = [];
    selectedRavitaillements = [];

    // Pré-filtrer les ravitaillements du client si déjà sélectionné
    const clientRavs = clientId
        ? ravitaillements.filter((r) => r.idClient == clientId)
        : [];

    return `
        <form id="commandeForm" onsubmit="enregistrerCommande(event)">
            <div class="form-group">
                <label>Client *</label>
                <select id="commande-client" required onchange="chargerRavitaillementsClient(this.value)">
                    <option value="">Sélectionner un client</option>
                    ${clients.map((c) => `<option value="${c.idClient}" ${clientId == c.idClient ? "selected" : ""}>${c.nom} ${c.prenom || ""}</option>`).join("")}
                </select>
            </div>

            <!-- Section ravitaillements -->
            <div id="ravitaillements-selection-section" style="display:${clientRavs.length > 0 ? "block" : "none"};margin-bottom:24px;background:#fef3c7;padding:20px;border-radius:16px;border-left:4px solid #f59e0b;">
                <h4 style="display:flex;align-items:center;gap:8px;margin-bottom:16px;color:#92400e;">
                    <i class="fas fa-truck"></i> Lignes de ravitaillement disponibles
                </h4>
                <div id="ravitaillements-checkbox-list">
                    ${renderRavCheckboxes(clientRavs)}
                </div>
                <button type="button" class="btn-secondary" style="margin-top:16px;width:100%;background:#f59e0b;color:white;border:none;" onclick="appliquerRavitaillementsSelectionnes()">
                    <i class="fas fa-check-circle"></i> Appliquer les ravitaillements sélectionnés
                </button>
            </div>

            <div class="form-group">
                <label>Date</label>
                <input type="date" id="commande-date" value="${new Date().toISOString().split("T")[0]}">
            </div>

            <div style="margin-top:24px;">
                <label style="font-weight:600;margin-bottom:16px;display:block;">Articles</label>
                <div class="articles-list">
                    ${articles.map((article) => `
                        <div class="article-item" id="article-item-${article.idArticle}">
                            <input type="checkbox" class="article-checkbox" value="${article.idArticle}"
                                data-prix="${article.prix || 0}"
                                data-nom="${article.nomArticle}"
                                onchange="toggleArticle(${article.idArticle}, this.checked, ${article.prix || 0}, '${article.nomArticle}')">
                            <div class="article-details">
                                <h4>${article.nomArticle}</h4>
                                <p style="color:#64748b;font-size:13px;">${formatCFA(article.prix || 0)}</p>
                            </div>
                            <input type="number" class="article-quantity" id="qte-${article.idArticle}"
                                value="1" min="1" style="display:none;width:70px;" onchange="calculerTotaux()">
                        </div>`).join("")}
                </div>
            </div>

            <div class="calcul-tva">
                <div class="calcul-row">
                    <span>Total HT</span><span id="total-ht">0 FCFA</span>
                </div>
                <div class="calcul-row">
                    <span>TVA (18%) <span class="tva-badge">Côte d'Ivoire</span></span>
                    <span id="total-tva">0 FCFA</span>
                </div>
                <div class="calcul-row total-ttc">
                    <span>Total TTC</span><span id="total-ttc">0 FCFA</span>
                </div>
            </div>
            <button type="submit" class="btn-generate">Générer la proforma</button>
        </form>`;
}

function renderRavCheckboxes(ravs) {
    return ravs.map((rav) => `
        <div style="display:flex;align-items:center;gap:12px;padding:12px;background:white;border-radius:12px;margin-bottom:8px;border:1px solid #e2e8f0;">
            <input type="checkbox" class="rav-selection-checkbox" value="${rav.idRavi}" id="rav-${rav.idRavi}"
                style="width:20px;height:20px;accent-color:#f59e0b;">
            <label for="rav-${rav.idRavi}" style="flex:1;cursor:pointer;">
                <span style="font-weight:600;color:#f59e0b;">${rav.code}</span>
            </label>
        </div>`).join("");
}

async function chargerRavitaillementsClient(clientId) {
    const section = document.getElementById("ravitaillements-selection-section");
    const list = document.getElementById("ravitaillements-checkbox-list");
    if (!clientId) { section.style.display = "none"; return; }

    try {
        const ravitaillements = await getRavitaillements();
        const clientRavs = ravitaillements.filter((r) => r.idClient == clientId);

        if (clientRavs.length > 0) {
            list.innerHTML = renderRavCheckboxes(clientRavs);
            section.style.display = "block";
        } else {
            section.style.display = "none";
        }
    } catch (err) {
        console.error(err);
    }
}

async function appliquerRavitaillementsSelectionnes() {
    const checked = document.querySelectorAll(".rav-selection-checkbox:checked");
    if (checked.length === 0) { alert("Sélectionnez au moins une ligne de ravitaillement"); return; }

    const ids = Array.from(checked).map((cb) => parseInt(cb.value));

    try {
        // Charger les articles pour chaque ravitaillement sélectionné
        for (const id of ids) {
            const ravArticles = await getRavitaillementArticles(id);
            const articles = await getArticles();

            ravArticles.forEach((ra) => {
                const article = articles.find((a) => a.idArticle === ra.idArticle);
                if (!article) return;

                const existing = selectedArticles.find((a) => a.id === ra.idArticle);
                if (existing) {
                    existing.quantite += ra.quantite;
                    const qteInput = document.getElementById(`qte-${ra.idArticle}`);
                    if (qteInput) qteInput.value = existing.quantite;
                } else {
                    const cb = document.querySelector(`.article-checkbox[value="${ra.idArticle}"]`);
                    const qteInput = document.getElementById(`qte-${ra.idArticle}`);
                    const item = document.getElementById(`article-item-${ra.idArticle}`);
                    if (cb) cb.checked = true;
                    if (qteInput) { qteInput.style.display = "block"; qteInput.value = ra.quantite; }
                    if (item) item.classList.add("selected");
                    selectedArticles.push({ id: ra.idArticle, prix: article.prix || 0, nom: article.nomArticle, quantite: ra.quantite });
                }
            });
        }
        calculerTotaux();
        showNotification(`${ids.length} ligne(s) de ravitaillement appliquée(s) ✓`);
    } catch (err) {
        console.error(err);
        showNotification("Erreur lors de l'application du ravitaillement", "error");
    }
}

function toggleArticle(articleId, checked, prix, nom) {
    const qteInput = document.getElementById(`qte-${articleId}`);
    const item = document.getElementById(`article-item-${articleId}`);
    if (checked) {
        qteInput.style.display = "block";
        item.classList.add("selected");
        if (!selectedArticles.find((a) => a.id === articleId)) {
            selectedArticles.push({ id: articleId, prix, nom, quantite: parseInt(qteInput.value) || 1 });
        }
    } else {
        qteInput.style.display = "none";
        item.classList.remove("selected");
        selectedArticles = selectedArticles.filter((a) => a.id !== articleId);
    }
    calculerTotaux();
}

function calculerTotaux() {
    selectedArticles.forEach((a) => {
        const qte = document.getElementById(`qte-${a.id}`);
        if (qte) a.quantite = parseInt(qte.value) || 1;
    });
    const totalHT = selectedArticles.reduce((s, a) => s + a.prix * a.quantite, 0);
    const totalTVA = totalHT * (TVA_CI / 100);
    document.getElementById("total-ht").textContent = formatCFA(totalHT);
    document.getElementById("total-tva").textContent = formatCFA(totalTVA);
    document.getElementById("total-ttc").textContent = formatCFA(totalHT + totalTVA);
}

async function enregistrerCommande(event) {
    event.preventDefault();
    if (selectedArticles.length === 0) { alert("Sélectionnez au moins un article"); return; }

    const clientId = parseInt(document.getElementById("commande-client").value);
    if (!clientId) { alert("Sélectionnez un client"); return; }

    const totalHT = selectedArticles.reduce((s, a) => s + a.prix * a.quantite, 0);
    const totalTVA = totalHT * (TVA_CI / 100);
    const totalTTC = totalHT + totalTVA;

    try {
        const proformas = await getProformas();
        const code = genererCodeProforma(proformas.length);

        await createProforma(
            { date: document.getElementById("commande-date").value, code, montantTTC: totalTTC, clientId },
            selectedArticles
        );

        selectedArticles = [];
        selectedRavitaillements = [];
        await loadAllData();
        closeOffcanvas();
        showNotification(`Proforma ${code} créée ✓`);
    } catch (err) {
        console.error(err);
        showNotification("Erreur lors de la création de la proforma", "error");
    }
}

// ============================================================
//  Actions proforma
// ============================================================
async function changerStatut(idCommande, statutActuel) {
    try {
        const proformas = await getProformas();
        const p = proformas.find((x) => x.idCommande === idCommande);
        if (!p) return;
        p.statut = statutActuel === "Payé" ? "En attente" : "Payé";
        await updateStatutProforma(p);
        await loadProformas();
        showNotification(`Statut mis à jour : ${p.statut}`);
    } catch (err) {
        console.error(err);
        showNotification("Erreur lors de la mise à jour du statut", "error");
    }
}

function copierLien(proformaId) {
    const input = document.getElementById(`link-${proformaId}`);
    navigator.clipboard.writeText(input.value);
    showNotification("Lien copié dans le presse-papiers !");
}

function ouvrirLien(code) {
    window.open(genererLienProforma(code), "_blank");
}

async function partagerWhatsApp(code, idCommande) {
    const [proformas, clients] = await Promise.all([getProformas(), getClients()]);
    const p = proformas.find((x) => x.idCommande === idCommande);
    const client = clients.find((c) => c.idClient === p?.idClient);
    const lien = genererLienProforma(code);
    const texte = `Bonjour ${client?.nom || ""}, voici votre proforma ${code} d'un montant de ${formatCFA(p?.montant || 0)} : ${lien}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(texte)}`, "_blank");
}

async function partagerEmail(code, idCommande) {
    const [proformas, clients] = await Promise.all([getProformas(), getClients()]);
    const p = proformas.find((x) => x.idCommande === idCommande);
    const client = clients.find((c) => c.idClient === p?.idClient);
    const lien = genererLienProforma(code);
    const subject = encodeURIComponent(`Votre proforma ${code}`);
    const body = encodeURIComponent(`Bonjour,\n\nVoici le lien pour consulter votre proforma :\n${lien}\n\nMontant TTC: ${formatCFA(p?.montant || 0)}\nTVA 18% incluse\n\nCordialement.`);
    window.location.href = `mailto:${client?.email || ""}?subject=${subject}&body=${body}`;
}

// ============================================================
//  Vue détaillée d'une proforma (lien partagé)
// ============================================================
async function showProformaView(code) {
    document.querySelector(".app").style.display = "none";
    document.getElementById("proforma-view-page").style.display = "block";

    try {
        const [proformas, clients] = await Promise.all([getProformas(), getClients()]);
        const p = proformas.find((x) => x.libelle === code);

        if (!p) {
            document.getElementById("proforma-view-content").innerHTML = `
                <div style="text-align:center;padding:60px;">
                    <i class="fas fa-exclamation-triangle" style="font-size:64px;color:#ef4444;margin-bottom:24px;"></i>
                    <h2>Proforma introuvable</h2>
                    <p style="color:#64748b;margin-top:16px;">Le code ${code} ne correspond à aucune proforma.</p>
                    <button class="btn-primary" style="margin-top:24px;" onclick="retourAccueil()">
                        <i class="fas fa-home"></i> Retour à l'accueil
                    </button>
                </div>`;
            return;
        }

        const client = clients.find((c) => c.idClient === p.idClient);
        const details = await apiGet(`Details/commande/${p.idCommande}`);

        const articlesHtml = details.map((d) => `
            <tr>
                <td>${d.quantiteArticle}</td>
                <td>${formatCFA(d.prix)}</td>
                <td>${formatCFA(d.prix * d.quantiteArticle)}</td>
            </tr>`).join("");

        document.getElementById("proforma-view-content").innerHTML = `
            <div class="proforma-view-header">
                <h1 class="proforma-view-title">PROFORMA</h1>
                <span class="proforma-view-code">${p.libelle}</span>
            </div>
            <div class="proforma-view-info">
                <div class="info-block">
                    <h4>Client</h4>
                    <p>${client ? `${client.nom} ${client.prenom || ""}` : "Client inconnu"}</p>
                    <p style="font-size:14px;font-weight:normal;margin-top:8px;">${client?.adresse || ""}</p>
                </div>
                <div class="info-block">
                    <h4>Détails</h4>
                    <p>Date: ${formatDate(p.dateCommande)}</p>
                    <p style="font-size:14px;font-weight:normal;margin-top:8px;">
                        Statut: <span class="proforma-status status-${p.statut === "Payé" ? "paye" : "en-attente"}">${p.statut || "En attente"}</span>
                    </p>
                    <p style="font-size:14px;font-weight:normal;margin-top:8px;">TVA: 18%</p>
                </div>
            </div>
            <h3 style="margin-bottom:20px;">Articles commandés</h3>
            <table class="proforma-view-table">
                <thead>
                    <tr><th>Qté</th><th>Prix unitaire</th><th>Total HT</th></tr>
                </thead>
                <tbody>${articlesHtml}</tbody>
            </table>
            <div class="proforma-view-total">
                <div style="display:flex;justify-content:flex-end;gap:40px;">
                    <div>
                        <p style="color:#009639;margin-bottom:8px;">Total TTC</p>
                        <p class="total-line">${formatCFA(p.montant)}</p>
                    </div>
                </div>
            </div>
            <div style="text-align:center;margin-top:40px;">
                <button class="btn-secondary" onclick="window.print()"><i class="fas fa-print"></i> Imprimer</button>
                <button class="btn-primary" style="margin-left:16px;" onclick="retourAccueil()"><i class="fas fa-home"></i> Retour</button>
            </div>`;

        document.title = `Proforma ${p.libelle}`;
    } catch (err) {
        console.error(err);
        showNotification("Erreur lors du chargement de la proforma", "error");
    }
}
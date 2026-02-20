// ============================================================
//  Chargement et affichage des ravitaillements
// ============================================================
async function loadRavitaillements() {
    try {
        const [ravitaillements, clients, articles] = await Promise.all([
            getRavitaillements(),
            getClients(),
            getArticles(),
        ]);

        // Enrichir chaque ravitaillement avec ses articles
        const ravsEnrichis = await Promise.all(
            ravitaillements.map(async (rav) => {
                try {
                    const ravArticles = await getRavitaillementArticles(rav.idRavi);
                    return { ...rav, articlesDetail: ravArticles };
                } catch {
                    return { ...rav, articlesDetail: [] };
                }
            })
        );

        renderRavitaillementsGrid(ravsEnrichis, clients, articles);
    } catch (err) {
        console.error("Erreur loadRavitaillements:", err);
        showNotification("Erreur lors du chargement des ravitaillements", "error");
    }
}

function renderRavitaillementsGrid(ravitaillements, clients, articles) {
    const grid = document.getElementById("ravitaillements-grid");
    grid.innerHTML =
        ravitaillements
            .map((rav) => {
                const client = clients.find((c) => c.idClient === rav.idClient);
                const articlesHtml = (rav.articlesDetail || [])
                    .map((a) => {
                        const article = articles.find((art) => art.idArticle === a.idArticle);
                        return `
                        <div style="display:flex;align-items:center;gap:8px;background:white;padding:8px 12px;border-radius:12px;">
                            <i class="fas fa-box" style="color:#009639;"></i>
                            <span style="font-size:13px;">${article?.nomArticle || "Article"}</span>
                            <span style="background:#f59e0b;color:white;padding:2px 8px;border-radius:20px;font-size:11px;margin-left:auto;">x${a.quantite}</span>
                        </div>`;
                    })
                    .join("");

                return `
                <div class="client-card">
                    <div style="background:#f8fafc;border-radius:16px;padding:16px;">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
                            <div>
                                <span style="font-weight:700;color:#f59e0b;font-size:18px;"><i class="fas fa-truck"></i> ${rav.code}</span>
                                <div style="font-size:14px;color:#64748b;margin-top:4px;">${client ? `${client.nom} ${client.prenom || ""}` : "Client inconnu"}</div>
                            </div>
                        </div>
                        ${articlesHtml ? `<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:20px;">${articlesHtml}</div>` : ""}
                        <div style="display:flex;gap:12px;">
                            <button class="btn-primary" style="flex:1;" onclick="utiliserRavitaillement(${rav.idRavi})">
                                <i class="fas fa-shopping-cart"></i> Créer commande
                            </button>
                            <button class="btn-secondary" style="flex:1;" onclick="supprimerRavitaillement(${rav.idRavi})">
                                <i class="fas fa-trash"></i> Supprimer
                            </button>
                        </div>
                    </div>
                </div>`;
            })
            .join("") ||
        '<p style="text-align:center;padding:40px;">Aucune ligne de ravitaillement</p>';
}

// ============================================================
//  Formulaire ravitaillement
// ============================================================
async function getRavitaillementForm(clientId = null) {
    const [clients, articles] = await Promise.all([getClients(), getArticles()]);

    return `
        <form id="ravitaillementForm" onsubmit="enregistrerRavitaillement(event)">
            <div class="form-group">
                <label>Client *</label>
                <select id="ravitaillement-client" required>
                    <option value="">Sélectionner un client</option>
                    ${clients.map((c) => `<option value="${c.idClient}" ${clientId == c.idClient ? "selected" : ""}>${c.nom} ${c.prenom || ""}</option>`).join("")}
                </select>
            </div>
            <div style="margin-top:24px;">
                <label style="font-weight:600;margin-bottom:16px;display:block;">Articles de ravitaillement</label>
                <div class="articles-list">
                    ${articles.map((article) => `
                        <div class="article-item">
                            <input type="checkbox" class="rav-article-checkbox" value="${article.idArticle}" data-prix="${article.prix || 0}">
                            <div class="article-details">
                                <h4>${article.nomArticle}</h4>
                            </div>
                            <input type="number" class="rav-article-quantite" value="1" min="1"
                                style="width:70px;padding:8px;border:1px solid #e2e8f0;border-radius:8px;">
                        </div>`).join("")}
                </div>
            </div>
            <button type="submit" class="btn-generate">Créer la ligne de ravitaillement</button>
        </form>`;
}

async function enregistrerRavitaillement(event) {
    event.preventDefault();

    const clientId = parseInt(document.getElementById("ravitaillement-client").value);
    if (!clientId) { alert("Sélectionnez un client"); return; }

    const articles = [];
    document.querySelectorAll(".rav-article-checkbox").forEach((cb, index) => {
        if (cb.checked) {
            const qte = document.querySelectorAll(".rav-article-quantite")[index];
            articles.push({
                id: parseInt(cb.value),
                prix: parseFloat(cb.dataset.prix) || 0,
                quantite: parseInt(qte.value) || 1,
            });
        }
    });

    if (articles.length === 0) { alert("Sélectionnez au moins un article"); return; }

    try {
        const ravitaillements = await getRavitaillements();
        const code = genererCodeRavitaillement(ravitaillements.length);
        await createRavitaillement({ code, clientId }, articles);
        await loadAllData();
        closeOffcanvas();
        showNotification(`Ligne de ravitaillement ${code} créée ✓`);
    } catch (err) {
        console.error(err);
        showNotification("Erreur lors de la création du ravitaillement", "error");
    }
}

// ============================================================
//  Actions
// ============================================================
async function utiliserRavitaillement(ravitaillementId) {
    try {
        const ravitaillements = await getRavitaillements();
        const rav = ravitaillements.find((r) => r.idRavi === ravitaillementId);
        if (rav) {
            await openOffcanvas("commande", rav.idClient);
            // Pré-cocher ce ravitaillement après rendu du formulaire
            setTimeout(() => {
                const cb = document.getElementById(`rav-${ravitaillementId}`);
                if (cb) {
                    cb.checked = true;
                    appliquerRavitaillementsSelectionnes();
                }
            }, 400);
        }
    } catch (err) {
        console.error(err);
    }
}

async function supprimerRavitaillement(id) {
    if (!confirm("Supprimer cette ligne de ravitaillement ?")) return;
    try {
        await deleteRavitaillementApi(id);
        await loadAllData();
        showNotification("Ligne de ravitaillement supprimée");
    } catch (err) {
        console.error(err);
        showNotification("Erreur lors de la suppression", "error");
    }
}
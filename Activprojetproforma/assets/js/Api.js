// ============================================================
//  Fonctions HTTP de base
// ============================================================
async function apiGet(endpoint) {
    const res = await fetch(`${API_BASE_URL}/${endpoint}`);
    if (!res.ok) throw new Error(`GET ${endpoint} → ${res.status}`);
    return res.json();
}

async function apiPost(endpoint, data) {
    const res = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`POST ${endpoint} → ${res.status}`);
    return res.json();
}

async function apiPut(endpoint, data) {
    const res = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`PUT ${endpoint} → ${res.status}`);
}

async function apiDelete(endpoint) {
    const res = await fetch(`${API_BASE_URL}/${endpoint}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`DELETE ${endpoint} → ${res.status}`);
}

// ============================================================
//  Clients
// ============================================================
async function getClients() {
    return apiGet("Clients");
}

async function createClient(data) {
    return apiPost("Clients", {
        nom: data.nom,
        email: data.email,
        telephone: data.telephone,
        societe: data.societe,
        ville: data.ville,
        adresse: data.adresse || "",
    });
}

async function deleteClientApi(id) {
    return apiDelete(`Clients/${id}`);
}


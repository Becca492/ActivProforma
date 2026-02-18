<%@ Page Title="About" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="About.aspx.cs" Inherits="Activprojetproforma.About" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <main aria-labelledby="title">
        

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestion Proforma - Côte d'Ivoire</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="~/Content/site.css">
</head>
<body>
    <div class="app">
        <!-- Sidebar -->
        <div class="sidebar">
            <div class="logo">
                <h1>Gestion Proforma</h1>
            </div>
            <div class="nav-menu">
                <div class="nav-item active" onclick="showPage('dashboard')">
                    <i class="fas fa-chart-pie"></i> Tableau de bord
                </div>
                <div class="nav-item" onclick="showPage('clients')">
                    <i class="fas fa-users"></i> Clients
                </div>
                <div class="nav-item" onclick="showPage('proformas')">
                    <i class="fas fa-file-invoice"></i> Proformas
                </div>
                <div class="nav-item" onclick="showPage('ravitaillements')">
                    <i class="fas fa-truck"></i> Lignes de ravitaillement
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="main-content">
            <div id="page-dashboard" class="page active">
                <div class="page-header">
                    <h2>Tableau de bord</h2>
                    <div style="display: flex; gap: 16px">
                        <button class="btn-primary" onclick="openOffcanvas('client')">
                            <i class="fas fa-user-plus"></i> Nouveau client
                        </button>
                        <button class="btn-primary" onclick="openOffcanvas('commande')">
                            <i class="fas fa-cart-plus"></i> Nouvelle commande
                        </button>
                    </div>
                </div>

                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-info">
                            <h4>Clients</h4>
                            <div class="stat-number" id="stats-clients">0</div>
                        </div>
                        <div class="stat-icon"><i class="fas fa-users"></i></div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-info">
                            <h4>Proformas</h4>
                            <div class="stat-number" id="stats-proformas">0</div>
                        </div>
                        <div class="stat-icon"><i class="fas fa-file-invoice"></i></div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-info">
                            <h4>Lignes ravitaillement</h4>
                            <div class="stat-number" id="stats-ravitaillements">0</div>
                        </div>
                        <div class="stat-icon"><i class="fas fa-truck"></i></div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-info">
                            <h4>Montant TTC</h4>
                            <div class="stat-number" id="stats-ttc">0 FCFA</div>
                        </div>
                        <div class="stat-icon"><i class="fas fa-euro-sign"></i></div>
                    </div>
                </div>

                <div class="dashboard-grid">
                    <div class="dashboard-card">
                        <h3>Derniers clients</h3>
                        <div id="dashboard-clients"></div>
                    </div>
                    <div class="dashboard-card">
                        <h3>Dernières proformas</h3>
                        <div id="dashboard-proformas"></div>
                    </div>
                </div>
            </div>

            <div id="page-clients" class="page">
                <div class="page-header">
                    <h2>Gestion des clients</h2>
                    <button class="btn-primary" onclick="openOffcanvas('client')">
                        <i class="fas fa-user-plus"></i> Nouveau client
                    </button>
                </div>
                <div class="clients-grid" id="clients-grid"></div>
            </div>

            <div id="page-proformas" class="page">
                <div class="page-header">
                    <h2>Gestion des proformas</h2>
                    <button class="btn-primary" onclick="openOffcanvas('commande')">
                        <i class="fas fa-cart-plus"></i> Nouvelle commande
                    </button>
                </div>
                <div class="proformas-grid" id="proformas-grid"></div>
            </div>

            <div id="page-ravitaillements" class="page">
                <div class="page-header">
                    <h2>Lignes de ravitaillement</h2>
                    <button class="btn-primary" onclick="openOffcanvas('ravitaillement')">
                        <i class="fas fa-plus-circle"></i> Nouvelle ligne de ravitaillement
                    </button>
                </div>
                <div class="clients-grid" id="ravitaillements-grid"></div>
            </div>
        </div>
    </div>

    <!-- Offcanvas -->
    <div id="offcanvas" class="offcanvas">
        <div class="offcanvas-header">
            <h3 id="offcanvas-title">Nouveau client</h3>
            <button class="close-btn" onclick="closeOffcanvas()">&times;</button>
        </div>
        <div id="offcanvas-content"></div>
    </div>

    <!-- Proforma View Page -->
    <div id="proforma-view-page" style="display: none">
        <div class="main-content" style="max-width: 1000px; margin: 40px auto; grid-template-columns: 1fr">
            <div class="proforma-view-page" id="proforma-view-content"></div>
        </div>
    </div>

    <!-- Notification -->
    <div id="notification" class="notification"></div>

    <script src="~/js/data.js"></script>
    <script src="~/js/app.js"></script>
</body>
</html>
    </main>
</asp:Content>

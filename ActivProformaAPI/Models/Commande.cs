namespace ActivProformaAPI.Models
{
    public class Commande
    {
        public int IdCommande { get; set; }
        public DateTime DateCommande { get; set; }
        public string Libelle { get; set; } = string.Empty;
        public decimal Montant { get; set; }
        public int IdClient { get; set; }

        // Navigation
        public Client Client { get; set; } = null!;
        public ICollection<Detail> Details { get; set; } = new List<Detail>();
        public ICollection<LigneravitaillementCommande> LigneravitaillementCommandes { get; set; } = new List<LigneravitaillementCommande>();
    }
}

namespace ActivProformaAPI.Models
{
    public class LigneravitaillementCommande
    {
        public int IdDetail { get; set; }
        public int IdCommande { get; set; }
        public int IdRavi { get; set; }
        public DateTime DateCreation { get; set; }
        public decimal Montant { get; set; }

        // Navigation
        public Commande Commande { get; set; } = null!;
        public Ligneravitaillement Ligneravitaillement { get; set; } = null!;
    }
}

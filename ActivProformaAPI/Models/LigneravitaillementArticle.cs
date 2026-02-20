namespace ActivProformaAPI.Models
{
    public class LigneravitaillementArticle
    {
        public int IdRaviArticle { get; set; }
        public decimal PrixUnitaire { get; set; }
        public int IdArticle { get; set; }
        public int Quantite { get; set; }
        public int IdRavi { get; set; }

        // Navigation
        public Article Article { get; set; } = null!;
        public Ligneravitaillement Ligneravitaillement { get; set; } = null!;
    }
}

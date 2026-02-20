namespace ActivProformaAPI.Models
{
    public class Ligneravitaillement
    {
        public int IdRavi { get; set; }
        public string Code { get; set; } = string.Empty;
        public int IdClient { get; set; }

        // Navigation
        public Client Client { get; set; } = null!;
        public ICollection<LigneravitaillementArticle> LigneravitaillementArticles { get; set; } = new List<LigneravitaillementArticle>();
        public ICollection<LigneravitaillementCommande> LigneravitaillementCommandes { get; set; } = new List<LigneravitaillementCommande>();
    }
}

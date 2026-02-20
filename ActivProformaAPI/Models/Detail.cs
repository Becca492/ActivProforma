namespace ActivProformaAPI.Models
{
    public class Detail
    {
        public int IdDetail { get; set; }
        public int QuantiteArticle { get; set; }
        public decimal Prix { get; set; }
        public int IdCommande { get; set; }

        // Navigation
        public Commande Commande { get; set; } = null!;
    }
}

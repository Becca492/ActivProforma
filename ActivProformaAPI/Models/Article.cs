    namespace ActivProformaAPI.Models
{
    public class Article
    {
        public int IdArticle { get; set; }
        public string NomArticle { get; set; } = string.Empty;

        // Navigation
        public ICollection<LigneravitaillementArticle> LigneravitaillementArticles { get; set; } = new List<LigneravitaillementArticle>();
    }
}

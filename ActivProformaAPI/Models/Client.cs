namespace ActivProformaAPI.Models
{
    public class Client
    {
        public int IdClient { get; set; }
        public string Nom { get; set; } = string.Empty;
        public string Adresse { get; set; } = string.Empty;
        public string Email {  get; set; } = string.Empty;
        public string Telephone { get; set; } = string.Empty;
        public string Societe { get; set; } = string.Empty;
        public string Ville { get; set; } = string.Empty;

        // Navigation
        public ICollection<Commande> Commandes { get; set; } = new List<Commande>();
        public ICollection<Ligneravitaillement> Ligneravitaillements { get; set; } = new List<Ligneravitaillement>();
    }
}

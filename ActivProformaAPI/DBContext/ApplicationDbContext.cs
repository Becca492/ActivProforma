using ActivProformaAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ActivProformaAPI.DBContext
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<Client> Clients { get; set; }
        public DbSet<Commande> Commandes { get; set; }
        public DbSet<Detail> Details { get; set; }
        public DbSet<Article> Articles { get; set; }
        public DbSet<Ligneravitaillement> Ligneravitaillements { get; set; }
        public DbSet<LigneravitaillementArticle> LigneravitaillementArticles { get; set; }
        public DbSet<LigneravitaillementCommande> LigneravitaillementCommandes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Client>(entity =>
            {
                entity.HasKey(e => e.IdClient);

                entity.Property(e => e.Nom).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Societe).HasMaxLength(100);

                entity.Property(e => e.Adresse).HasMaxLength(255);
                entity.Property(e => e.Ville).HasMaxLength(50);

                entity.Property(e => e.Email).HasMaxLength(255); 
                entity.Property(e => e.Telephone).HasMaxLength(20); 
            });


            // ── Commande ─────────────────────────────────────────────────────
            modelBuilder.Entity<Commande>(entity =>
            {
                entity.HasKey(e => e.IdCommande);
                entity.Property(e => e.Libelle).HasMaxLength(200);
                entity.Property(e => e.Montant).HasColumnType("decimal(18,2)");

                entity.HasOne(e => e.Client)
                      .WithMany(c => c.Commandes)
                      .HasForeignKey(e => e.IdClient)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            // ── Detail ───────────────────────────────────────────────────────
            modelBuilder.Entity<Detail>(entity =>
            {
                entity.HasKey(e => e.IdDetail);
                entity.Property(e => e.Prix).HasColumnType("decimal(18,2)");

                entity.HasOne(e => e.Commande)
                      .WithMany(c => c.Details)
                      .HasForeignKey(e => e.IdCommande)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // ── Article ──────────────────────────────────────────────────────
            modelBuilder.Entity<Article>(entity =>
            {
                entity.HasKey(e => e.IdArticle);
                entity.Property(e => e.NomArticle).IsRequired().HasMaxLength(150);
            });

            // ── Ligneravitaillement ───────────────────────────────────────────
            modelBuilder.Entity<Ligneravitaillement>(entity =>
            {
                entity.HasKey(e => e.IdRavi);
                entity.Property(e => e.Code).IsRequired().HasMaxLength(50);

                entity.HasOne(e => e.Client)
                      .WithMany(c => c.Ligneravitaillements)
                      .HasForeignKey(e => e.IdClient)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            // ── LigneravitaillementArticle ────────────────────────────────────
            modelBuilder.Entity<LigneravitaillementArticle>(entity =>
            {
                entity.HasKey(e => e.IdRaviArticle);
                entity.Property(e => e.PrixUnitaire).HasColumnType("decimal(18,2)");

                entity.HasOne(e => e.Article)
                      .WithMany(a => a.LigneravitaillementArticles)
                      .HasForeignKey(e => e.IdArticle)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(e => e.Ligneravitaillement)
                      .WithMany(l => l.LigneravitaillementArticles)
                      .HasForeignKey(e => e.IdRavi)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // ── LigneravitaillementCommande ───────────────────────────────────
            modelBuilder.Entity<LigneravitaillementCommande>(entity =>
            {
                entity.HasKey(e => e.IdDetail);
                entity.Property(e => e.Montant).HasColumnType("decimal(18,2)");

                entity.HasOne(e => e.Commande)
                      .WithMany(c => c.LigneravitaillementCommandes)
                      .HasForeignKey(e => e.IdCommande)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(e => e.Ligneravitaillement)
                      .WithMany(l => l.LigneravitaillementCommandes)
                      .HasForeignKey(e => e.IdRavi)
                      .OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
}

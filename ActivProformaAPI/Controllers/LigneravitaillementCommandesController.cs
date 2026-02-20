using ActivProformaAPI.DBContext;
using ActivProformaAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace ActivProformaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LigneravitaillementCommandesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LigneravitaillementCommandesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/LigneravitaillementCommandes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LigneravitaillementCommande>>> GetLigneravitaillementCommandes()
        {
            return await _context.LigneravitaillementCommandes
                .Include(lc => lc.Commande)
                .Include(lc => lc.Ligneravitaillement)
                .ToListAsync();
        }

        // GET: api/LigneravitaillementCommandes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LigneravitaillementCommande>> GetLigneravitaillementCommande(int id)
        {
            var ligneCommande = await _context.LigneravitaillementCommandes
                .Include(lc => lc.Commande)
                .Include(lc => lc.Ligneravitaillement)
                .FirstOrDefaultAsync(lc => lc.IdDetail == id);

            if (ligneCommande == null)
                return NotFound();

            return ligneCommande;
        }

        // GET: api/LigneravitaillementCommandes/ravitaillement/5
        [HttpGet("ravitaillement/{idRavi}")]
        public async Task<ActionResult<IEnumerable<LigneravitaillementCommande>>> GetByRavitaillement(int idRavi)
        {
            return await _context.LigneravitaillementCommandes
                .Where(lc => lc.IdRavi == idRavi)
                .Include(lc => lc.Commande)
                .ToListAsync();
        }

        // GET: api/LigneravitaillementCommandes/commande/5
        [HttpGet("commande/{idCommande}")]
        public async Task<ActionResult<IEnumerable<LigneravitaillementCommande>>> GetByCommande(int idCommande)
        {
            return await _context.LigneravitaillementCommandes
                .Where(lc => lc.IdCommande == idCommande)
                .Include(lc => lc.Ligneravitaillement)
                .ToListAsync();
        }

        // POST: api/LigneravitaillementCommandes
        [HttpPost]
        public async Task<ActionResult<LigneravitaillementCommande>> PostLigneravitaillementCommande(LigneravitaillementCommande ligneCommande)
        {
            _context.LigneravitaillementCommandes.Add(ligneCommande);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLigneravitaillementCommande), new { id = ligneCommande.IdDetail }, ligneCommande);
        }

        // PUT: api/LigneravitaillementCommandes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLigneravitaillementCommande(int id, LigneravitaillementCommande ligneCommande)
        {
            if (id != ligneCommande.IdDetail)
                return BadRequest();

            _context.Entry(ligneCommande).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.LigneravitaillementCommandes.Any(e => e.IdDetail == id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        // DELETE: api/LigneravitaillementCommandes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLigneravitaillementCommande(int id)
        {
            var ligneCommande = await _context.LigneravitaillementCommandes.FindAsync(id);
            if (ligneCommande == null)
                return NotFound();

            _context.LigneravitaillementCommandes.Remove(ligneCommande);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

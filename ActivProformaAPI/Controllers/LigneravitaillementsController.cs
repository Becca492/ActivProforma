using ActivProformaAPI.DBContext;
using ActivProformaAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace ActivProformaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LigneravitaillementsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LigneravitaillementsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Ligneravitaillements
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ligneravitaillement>>> GetLigneravitaillements()
        {
            return await _context.Ligneravitaillements
                .Include(l => l.Client)
                .ToListAsync();
        }

        // GET: api/Ligneravitaillements/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ligneravitaillement>> GetLigneravitaillement(int id)
        {
            var ligne = await _context.Ligneravitaillements
                .Include(l => l.Client)
                .Include(l => l.LigneravitaillementArticles)
                    .ThenInclude(la => la.Article)
                .Include(l => l.LigneravitaillementCommandes)
                    .ThenInclude(lc => lc.Commande)
                .FirstOrDefaultAsync(l => l.IdRavi == id);

            if (ligne == null)
                return NotFound();

            return ligne;
        }

        // GET: api/Ligneravitaillements/client/5
        [HttpGet("client/{idClient}")]
        public async Task<ActionResult<IEnumerable<Ligneravitaillement>>> GetByClient(int idClient)
        {
            return await _context.Ligneravitaillements
                .Where(l => l.IdClient == idClient)
                .Include(l => l.LigneravitaillementArticles)
                .ToListAsync();
        }

        // POST: api/Ligneravitaillements
        [HttpPost]
        public async Task<ActionResult<Ligneravitaillement>> PostLigneravitaillement(Ligneravitaillement ligne)
        {
            _context.Ligneravitaillements.Add(ligne);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLigneravitaillement), new { id = ligne.IdRavi }, ligne);
        }

        // PUT: api/Ligneravitaillements/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLigneravitaillement(int id, Ligneravitaillement ligne)
        {
            if (id != ligne.IdRavi)
                return BadRequest();

            _context.Entry(ligne).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Ligneravitaillements.Any(e => e.IdRavi == id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        // DELETE: api/Ligneravitaillements/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLigneravitaillement(int id)
        {
            var ligne = await _context.Ligneravitaillements.FindAsync(id);
            if (ligne == null)
                return NotFound();

            _context.Ligneravitaillements.Remove(ligne);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

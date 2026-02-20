using ActivProformaAPI.DBContext;
using ActivProformaAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace ActivProformaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LigneravitaillementArticlesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LigneravitaillementArticlesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/LigneravitaillementArticles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LigneravitaillementArticle>>> GetLigneravitaillementArticles()
        {
            return await _context.LigneravitaillementArticles
                .Include(la => la.Article)
                .Include(la => la.Ligneravitaillement)
                .ToListAsync();
        }

        // GET: api/LigneravitaillementArticles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LigneravitaillementArticle>> GetLigneravitaillementArticle(int id)
        {
            var ligneArticle = await _context.LigneravitaillementArticles
                .Include(la => la.Article)
                .Include(la => la.Ligneravitaillement)
                .FirstOrDefaultAsync(la => la.IdRaviArticle == id);

            if (ligneArticle == null)
                return NotFound();

            return ligneArticle;
        }

        // GET: api/LigneravitaillementArticles/ravitaillement/5
        [HttpGet("ravitaillement/{idRavi}")]
        public async Task<ActionResult<IEnumerable<LigneravitaillementArticle>>> GetByRavitaillement(int idRavi)
        {
            return await _context.LigneravitaillementArticles
                .Where(la => la.IdRavi == idRavi)
                .Include(la => la.Article)
                .ToListAsync();
        }

        // POST: api/LigneravitaillementArticles
        [HttpPost]
        public async Task<ActionResult<LigneravitaillementArticle>> PostLigneravitaillementArticle(LigneravitaillementArticle ligneArticle)
        {
            _context.LigneravitaillementArticles.Add(ligneArticle);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLigneravitaillementArticle), new { id = ligneArticle.IdRaviArticle }, ligneArticle);
        }

        // PUT: api/LigneravitaillementArticles/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLigneravitaillementArticle(int id, LigneravitaillementArticle ligneArticle)
        {
            if (id != ligneArticle.IdRaviArticle)
                return BadRequest();

            _context.Entry(ligneArticle).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.LigneravitaillementArticles.Any(e => e.IdRaviArticle == id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        // DELETE: api/LigneravitaillementArticles/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLigneravitaillementArticle(int id)
        {
            var ligneArticle = await _context.LigneravitaillementArticles.FindAsync(id);
            if (ligneArticle == null)
                return NotFound();

            _context.LigneravitaillementArticles.Remove(ligneArticle);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

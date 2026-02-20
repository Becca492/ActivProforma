using ActivProformaAPI.DBContext;
using ActivProformaAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace ActivProformaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DetailsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DetailsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Details
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Detail>>> GetDetails()
        {
            return await _context.Details
                .Include(d => d.Commande)
                .ToListAsync();
        }

        // GET: api/Details/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Detail>> GetDetail(int id)
        {
            var detail = await _context.Details
                .Include(d => d.Commande)
                .FirstOrDefaultAsync(d => d.IdDetail == id);

            if (detail == null)
                return NotFound();

            return detail;
        }

        // GET: api/Details/commande/5
        [HttpGet("commande/{idCommande}")]
        public async Task<ActionResult<IEnumerable<Detail>>> GetDetailsByCommande(int idCommande)
        {
            return await _context.Details
                .Where(d => d.IdCommande == idCommande)
                .ToListAsync();
        }

        // POST: api/Details
        [HttpPost]
        public async Task<ActionResult<Detail>> PostDetail(Detail detail)
        {
            _context.Details.Add(detail);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetDetail), new { id = detail.IdDetail }, detail);
        }

        // PUT: api/Details/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDetail(int id, Detail detail)
        {
            if (id != detail.IdDetail)
                return BadRequest();

            _context.Entry(detail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Details.Any(e => e.IdDetail == id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        // DELETE: api/Details/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDetail(int id)
        {
            var detail = await _context.Details.FindAsync(id);
            if (detail == null)
                return NotFound();

            _context.Details.Remove(detail);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

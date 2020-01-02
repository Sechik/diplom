using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Diplom.Models;

namespace Diplom.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WagehousesController : ControllerBase
    {
        private readonly Context _context;

        public WagehousesController(Context context)
        {
            _context = context;
        }

        // GET: api/Wagehouses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Wagehouse>>> GetWagehouses()
        {
            return await _context.Wagehouses.ToListAsync();
        }

        // GET: api/Wagehouses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Wagehouse>> GetWagehouse(string id)
        {
            var wagehouse = await _context.Wagehouses.FindAsync(id);

            if (wagehouse == null)
            {
                return NotFound();
            }

            return wagehouse;
        }

        // PUT: api/Wagehouses/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWagehouse(string id, Wagehouse wagehouse)
        {
            if (id != wagehouse.Id)
            {
                return BadRequest();
            }

            _context.Entry(wagehouse).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WagehouseExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Wagehouses
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Wagehouse>> PostWagehouse(Wagehouse wagehouse)
        {
            _context.Wagehouses.Add(wagehouse);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (WagehouseExists(wagehouse.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetWagehouse", new { id = wagehouse.Id }, wagehouse);
        }

        // DELETE: api/Wagehouses/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Wagehouse>> DeleteWagehouse(string id)
        {
            var wagehouse = await _context.Wagehouses.FindAsync(id);
            if (wagehouse == null)
            {
                return NotFound();
            }

            _context.Wagehouses.Remove(wagehouse);
            await _context.SaveChangesAsync();

            return wagehouse;
        }

        private bool WagehouseExists(string id)
        {
            return _context.Wagehouses.Any(e => e.Id == id);
        }
    }
}

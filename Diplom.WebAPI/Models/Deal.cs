using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Diplom.Models
{
    public class Deal
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public Organization Organization { get; set; }
        public Product Product { get; set; }
        public DateTime Date { get; set; }
        public double Count { get; set; }
    }
}

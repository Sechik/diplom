using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Diplom.Models
{
    public class Wagehouse
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public Product Product { get; set; }
        public double Count { get; set; }
        public ProductStatus Status { get; set; }
    }
}

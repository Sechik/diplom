﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Diplom.Models
{
    public class Deal
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public Organization Organization { get; set; }
        public string OrganizationId { get; set; }
        public Product Product { get; set; }
        public string ProductId { get; set; }
        public DateTime Date { get; set; }
        public double Count { get; set; }
        public double Sum { get; set; }
    }
}

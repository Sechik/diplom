using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Diplom.Models
{
    public class Organization
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public bool isJuridical { get; set; }
        public string Contract { get; set; }
        public string BankName { get; set; }
        public string BankCode { get; set; }
        public string BankAddress { get; set; }
        public string UNP { get; set; }
        public string PaymentAccount { get; set; }
    }
}

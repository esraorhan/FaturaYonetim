using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Dtos
{
    public  class InvoiceLineDto :IDto
    {
        public int? InvoiceLineId { get; set; } // Güncelleme için
        public string ItemName { get; set; }
        public int Quentity { get; set; }
        public int UserId { get; set; }
        public decimal Price { get; set; }
    }
}

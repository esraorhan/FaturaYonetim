using Core.Entities;

namespace Entities.Concrete
{
    public class InvoiceLine : IEntity
    {
        public int InvoiceLineId { get; set; }
        public int InvoiceId { get; set; }
        public string ItemName { get; set; }
        public int Quentity { get; set; }
        public decimal Price { get; set; }
        public int? UserId { get; set; }
        public DateTime RecordDate { get; set; }
    }
}


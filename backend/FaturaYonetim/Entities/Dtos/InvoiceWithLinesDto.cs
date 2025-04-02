using Core.Entities;

namespace Entities.Dtos
{
    public class InvoiceWithLinesDto : IDto
    {
        public int InvoiceId { get; set; }
        public string InvoiceNumber { get; set; }
        public DateTime InvoiceDate { get; set; }
        public decimal TotalAmount { get; set; }
        public int CustomerId { get; set; }

        public List<InvoiceLineDto> InvoiceLines { get; set; }
    }
}

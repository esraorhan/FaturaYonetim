using Core.Entities;

namespace Entities.Concrete
{
    public class Customer : IEntity
    {
        public int CustomerId { get; set; }
        public string TaxNumber { get; set; }
        public string Title { get; set; }
        public string Address { get; set; }
        public string EMail { get; set; }
        public int? UserId { get; set; }
        public DateTime RecordDate { get; set; }
    }
}

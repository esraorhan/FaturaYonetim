﻿using Core.Entities;

namespace Entities.Dtos
{
    public class InvoiceWithLinesAddDto :IDto
    {
        public int CustomerId { get; set; }
        public string InvoiceNumber { get; set; }
        public DateTime InvoiceDate { get; set; }
        public decimal TotalAmount { get; set; }
        public int UserId { get; set; }
        public List<InvoiceLineDto> InvoiceLines { get; set; }
    }
}

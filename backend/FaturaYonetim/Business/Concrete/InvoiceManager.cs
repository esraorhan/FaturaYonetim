using Business.Abstract;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class InvoiceManager : IInvoiceService
    {
        private readonly IInvoiceDal _invoiceDal;
        private readonly IInvoiceLineDal _invoiceLineDal;
        public InvoiceManager(IInvoiceDal invoiceDal, IInvoiceLineDal invoiceLineDal)
        {
            _invoiceDal = invoiceDal;
            _invoiceLineDal = invoiceLineDal;
        }
        // 1️⃣ Fatura ve detaylarını birlikte ekle
        public IResult AddInvoiceWithLines(InvoiceWithLinesAddDto dto)
        {
            var invoice = new Invoice
            {
                CustomerId = dto.CustomerId,
                InvoiceNumber = dto.InvoiceNumber,
                InvoiceDate = dto.InvoiceDate,
                TotalAmount = dto.TotalAmount,
                RecordDate = DateTime.Now,
                UserId = dto.UserId,
            };

            _invoiceDal.ADD(invoice);

            foreach (var line in dto.InvoiceLines)
            {
                _invoiceLineDal.ADD(new InvoiceLine
                {
                    InvoiceId = invoice.InvoiceId,
                    ItemName = line.ItemName,
                    Quentity = line.Quentity,
                    Price = line.Price,
                    UserId = dto.UserId,
                    RecordDate = DateTime.Now
                });
            }

            return new SuccessResult("Fatura ve satırları başarıyla eklendi.");
        }

        public IResult UpdateInvoiceWithLines(InvoiceWithLinesUpdateDto dto)
        {
            var invoice = _invoiceDal.GET(i => i.InvoiceId == dto.InvoiceId);
            if (invoice == null)
                return new ErrorResult("Fatura bulunamadı.");

            // 1️⃣ Fatura üst bilgisini güncelle
            invoice.CustomerId = dto.CustomerId;
            invoice.InvoiceNumber = dto.InvoiceNumber;
            invoice.InvoiceDate = dto.InvoiceDate;
            invoice.TotalAmount = dto.TotalAmount;
            invoice.UserId = dto.UserId;
            _invoiceDal.UPDATE(invoice);

            // 2️⃣ Mevcut satırları al
            var existingLines = _invoiceLineDal.GETLIST(l => l.InvoiceId == dto.InvoiceId);

            // 3️⃣ DTO’daki satır ID’lerini al
            var dtoIds = dto.InvoiceLines
                .Where(l => l.InvoiceLineId.HasValue)
                .Select(l => l.InvoiceLineId.Value)
                .ToList();

            // 4️⃣ DB’de olup DTO’da olmayanları sil
            foreach (var existing in existingLines)
            {
                if (!dtoIds.Contains(existing.InvoiceLineId))
                {
                    _invoiceLineDal.DELETE(existing);
                }
            }

            // 5️⃣ DTO’daki her satırı işle
            foreach (var lineDto in dto.InvoiceLines)
            {
                if (lineDto.InvoiceLineId.HasValue)
                {
                    // 🔁 Güncelle
                    var existing = existingLines.FirstOrDefault(l => l.InvoiceLineId == lineDto.InvoiceLineId);
                    if (existing != null)
                    {
                        existing.ItemName = lineDto.ItemName;
                        existing.Quentity = lineDto.Quentity;
                        existing.Price = lineDto.Price;
                        existing.UserId = lineDto.UserId;
                        _invoiceLineDal.UPDATE(existing);
                    }
                }
                else
                {
                    // ➕ Yeni satır
                    _invoiceLineDal.ADD(new InvoiceLine
                    {
                        InvoiceId = dto.InvoiceId,
                        ItemName = lineDto.ItemName,
                        Quentity = lineDto.Quentity,
                        Price = lineDto.Price,
                        RecordDate = DateTime.Now
                    });
                }
            }

            return new SuccessResult("Fatura ve satırları başarıyla güncellendi.");
        }


        // 3️⃣ Fatura ve satırlarını sil
        public IResult DeleteInvoiceWithLines(int invoiceId)
        {
            var invoice = _invoiceDal.GET(i => i.InvoiceId == invoiceId);
            if (invoice == null)
                return new ErrorResult("Fatura bulunamadı.");

            var lines = _invoiceLineDal.GETLIST(l => l.InvoiceId == invoiceId);
            foreach (var line in lines)
                _invoiceLineDal.DELETE(line);

            _invoiceDal.DELETE(invoice);
            return new SuccessResult("Fatura ve satırları silindi.");
        }

        // 4️⃣ Tarih aralığına göre faturaları ve satırlarını listele
        public IDataResult<List<InvoiceWithLinesDto>> GetInvoicesByDateRange(DateTime start, DateTime end)
        {
            var invoices = _invoiceDal.GETLIST(i => i.InvoiceDate >= start && i.InvoiceDate <= end);

            var result = invoices.Select(i => new InvoiceWithLinesDto
            {
                InvoiceId = i.InvoiceId,
                InvoiceNumber = i.InvoiceNumber,
                InvoiceDate = i.InvoiceDate,
                TotalAmount = i.TotalAmount,
                CustomerId = i.CustomerId,
                InvoiceLines = _invoiceLineDal.GETLIST(l => l.InvoiceId == i.InvoiceId)
                    .Select(l => new InvoiceLineDto
                    {
                        ItemName = l.ItemName,
                        Quentity = l.Quentity,
                        Price = l.Price,
                        InvoiceLineId=l.InvoiceLineId,
                    }).ToList()
            }).ToList();

            return new SuccessDataResult<List<InvoiceWithLinesDto>>(result);
        }

        // 5️⃣ Tek fatura getirme
        public IDataResult<InvoiceWithLinesDto> GetInvoiceById(int invoiceId)
        {
            var invoice = _invoiceDal.GET(i => i.InvoiceId == invoiceId);
            if (invoice == null)
                return new ErrorDataResult<InvoiceWithLinesDto>("Fatura bulunamadı.");

            var dto = new InvoiceWithLinesDto
            {
                InvoiceId = invoice.InvoiceId,
                InvoiceNumber = invoice.InvoiceNumber,
                InvoiceDate = invoice.InvoiceDate,
                TotalAmount = invoice.TotalAmount,
                CustomerId = invoice.CustomerId,
                InvoiceLines = _invoiceLineDal.GETLIST(l => l.InvoiceId == invoice.InvoiceId)
                    .Select(l => new InvoiceLineDto
                    {
                        ItemName = l.ItemName,
                        Quentity = l.Quentity,
                        Price = l.Price
                    }).ToList()
            };

            return new SuccessDataResult<InvoiceWithLinesDto>(dto);
        }
    }
    //public InvoiceManager(IInvoiceDal invoiceDal)
    //{
    //    _invoiceDal = invoiceDal;
    //}
    //public IResult Add(Invoice invoice)
    //{
    //    _invoiceDal.ADD(invoice);
    //    return new SuccessResult("Fatura başarıyla eklendi.");
    //}

    //public IResult Update(Invoice invoice)
    //{
    //    _invoiceDal.UPDATE(invoice);
    //    return new SuccessResult("Fatura başarıyla güncellendi.");
    //}

    //public IResult Delete(Invoice invoice)
    //{
    //    _invoiceDal.DELETE(invoice);
    //    return new SuccessResult("Fatura başarıyla silindi.");
    //}

    //public IDataResult<List<Invoice>> GetInvoicesByDateRange(DateTime start, DateTime end)
    //{
    //    var invoices = _invoiceDal.GETLIST(i => i.InvoiceDate >= start && i.InvoiceDate <= end);
    //    return new SuccessDataResult<List<Invoice>>(invoices);
    //}
}


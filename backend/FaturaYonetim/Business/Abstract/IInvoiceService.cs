using Core.Utilities.Results;
using Entities.Concrete;
using Entities.Dtos;

namespace Business.Abstract
{
    public interface IInvoiceService
    {
        //IResult Add(Invoice invoice);
        //IResult Update(Invoice invoice);
        //IResult Delete(Invoice invoice);
        //IDataResult<List<Invoice>> GetInvoicesByDateRange(DateTime start, DateTime end);

        // Fatura + satırları ekleme
        IResult AddInvoiceWithLines(InvoiceWithLinesAddDto dto);

        // Fatura + satırları güncelleme
        IResult UpdateInvoiceWithLines(InvoiceWithLinesUpdateDto dto);

        // Fatura + satırları silme
        IResult DeleteInvoiceWithLines(int invoiceId);

        // Tarih aralığına göre listeleme (detaylarıyla)
        IDataResult<List<InvoiceWithLinesDto>> GetInvoicesByDateRange(DateTime start, DateTime end);

        // ID ile tek fatura + satırlarını getirme
        IDataResult<InvoiceWithLinesDto> GetInvoiceById(int invoiceId);
    }

}

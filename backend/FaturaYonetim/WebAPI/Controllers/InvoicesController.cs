using Business.Abstract;
using Entities.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoicesController : ControllerBase
    {
        private readonly IInvoiceService _invoiceService;

        public InvoicesController(IInvoiceService invoiceService)
        {
            _invoiceService = invoiceService;
        }

        [HttpPost("add")]
        public IActionResult AddInvoice([FromBody] InvoiceWithLinesAddDto dto)
        {
            var result = _invoiceService.AddInvoiceWithLines(dto);
            if (result.Success)
                return Ok(result);
            return BadRequest(result);
        }

        [HttpPut("update")]
        public IActionResult UpdateInvoice([FromBody] InvoiceWithLinesUpdateDto dto)
        {
            var result = _invoiceService.UpdateInvoiceWithLines(dto);
            if (result.Success)
                return Ok(result);
            return BadRequest(result);
        }
        [HttpDelete("delete/{invoiceId}")]
        public IActionResult DeleteInvoice(int invoiceId)
        {
            var result = _invoiceService.DeleteInvoiceWithLines(invoiceId);
            if (result.Success)
                return Ok(result);
            return BadRequest(result);
        }
        [HttpGet("list")]
        public IActionResult GetInvoicesByDateRange(DateTime start, DateTime end)
        {
            var result = _invoiceService.GetInvoicesByDateRange(start, end);
            if (result.Success)
                return Ok(result);
            return BadRequest(result);
        }
        [HttpGet("{invoiceId}")]
        public IActionResult GetInvoiceById(int invoiceId)
        {
            var result = _invoiceService.GetInvoiceById(invoiceId);
            if (result.Success)
                return Ok(result);
            return BadRequest(result);
        }
    }

}


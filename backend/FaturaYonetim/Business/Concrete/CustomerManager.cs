using Business.Abstract;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public  class CustomerManager :ICustomerService
    {
        private readonly ICustomerDal _customerDal;

        public CustomerManager(ICustomerDal customerDal)
        {
            _customerDal = customerDal;
        }

        public IResult Add(Customer customer)
        {
            _customerDal.ADD(customer);
            return new SuccessResult("Müşteri eklendi.");
        }

        public IResult Update(Customer customer)
        {
            _customerDal.UPDATE(customer);
            return new SuccessResult("Müşteri güncellendi.");
        }

        public IResult Delete(Customer customer)
        {
            _customerDal.DELETE(customer);
            return new SuccessResult("Müşteri silindi.");
        }

        public IDataResult<Customer> GetById(int id)
        {
            var customer = _customerDal.GET(c => c.CustomerId == id);
            return new SuccessDataResult<Customer>(customer);
        }

        public IDataResult<List<Customer>> GetAll()
        {
            var customers = _customerDal.GETLIST();
            return new SuccessDataResult<List<Customer>>(customers);
        }
    }
}

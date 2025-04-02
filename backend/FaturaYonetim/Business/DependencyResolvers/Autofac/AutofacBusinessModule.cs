using Autofac;
using Business.Abstract;
using Business.Concrete;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.DependencyResolvers.Autofac
{
    public class AutofacBusinessModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            //user
            builder.RegisterType<UserManager>().As<IUserService>();
            builder.RegisterType<EfUserDal>().As<IUserDal>();

            //customer
            builder.RegisterType<CustomerManager>().As<ICustomerService>();
            builder.RegisterType<EfCustomerDal>().As<ICustomerDal>();

            //invoice
            builder.RegisterType<InvoiceManager>().As<IInvoiceService>();
            builder.RegisterType<EfInvoiceDal>().As<IInvoiceDal>();

            //invoiceLine
            builder.RegisterType<EfInvoiceLineDal>().As<IInvoiceLineDal>();
        }
    }
}

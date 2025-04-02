using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Core.DataAccess
{
    public interface IEntityRepository<T> where T :class,IEntity,new()
    {
        T GET(Expression<Func<T, bool>> filter); //şarta göre bir nesne getirecek.
        List<T> GETLIST(Expression<Func<T, bool>> filter = null); //C# Delege Kullanımı 
        void ADD(T entity);
        void UPDATE(T entity);
        void DELETE(T entity);
    }
}

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
    public class UserManager : IUserService
    {
        private IUserDal _userDal;

        public UserManager(IUserDal userDal)
        {
            _userDal=userDal;
        }

        public IDataResult<User> Login(string userName,string password)
        {
            var existingUser = _userDal.GET(u =>
                 u.UserName ==userName &&
                 u.Password == password);

            if (existingUser != null)
            {
                return new SuccessDataResult<User>(existingUser);
            }
            else
            {
                return new ErrorDataResult<User>("Kullanıcı adı veya şifre hatalı.");
            }

          
        }
    }
}

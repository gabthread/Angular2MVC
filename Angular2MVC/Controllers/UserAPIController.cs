using System.Data.Entity;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using Angular2MVC.DBContext;

namespace Angular2MVC.Controllers
{
    public class UserAPIController : BaseAPIController
    {
        /// <summary>
        /// Load all users from database and return the HTTP Response Message containing Users entity converted to JSON string
        /// </summary>
        public HttpResponseMessage Get()
        {
            var users = UserDB.TblUsers.AsEnumerable().ToList();
            return ToJson(users);
        }

        /// <summary>
        /// Take the User information from front end and save it to database. Return 1 for successfully saved
        /// </summary>
        public HttpResponseMessage Post([FromBody]TblUser value)
        {
            UserDB.TblUsers.Add(value);
            return ToJson(UserDB.SaveChanges());
        }

        /// <summary>
        /// Take the existing user id and updated information and update it to database. Return 1 for successfully updated
        /// </summary>
        public HttpResponseMessage Put(int id, [FromBody]TblUser value)
        {
            UserDB.Entry(value).State = EntityState.Modified;
            return ToJson(UserDB.SaveChanges());
        }

        /// <summary>
        /// ake existing user id, load the user by id and delete it. Return 1 for successfully deleted.
        /// </summary>
        public HttpResponseMessage Delete(int id)
        {
            UserDB.TblUsers.Remove(UserDB.TblUsers.FirstOrDefault(x => x.Id == id));
            return ToJson(UserDB.SaveChanges());
        }
    }
}

using System.Collections.Generic;
using System.Threading.Tasks;
using miza.api.Helpers;
using miza.api.Models;
using miza.api.Helper;
using miza.api.Dtos;

namespace miza.api.Data
{
    public interface IDatingRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<PagedList<User>> GetUsers(UserParams userParams);
        Task<User> GetUser(int id, bool isCurrentUser);
        Task<Photo> GetPhoto(int id);
        Task<Photo> GetMainPhotoForUser(int userId);
    }
}
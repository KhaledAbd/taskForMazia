
using System.Collections.Generic;
using System.Threading.Tasks;

namespace miza.api.Data {

    public interface IProductRepository {
        Task Add(Product entity);
        void Delete(Product entity);
        Task<bool> SaveAll();
        Task<Product> GetProduct(int id);
        Task<IEnumerable<Product>>  GetProducts();  

        Task<Product> GetLastProduct();      
    }
}
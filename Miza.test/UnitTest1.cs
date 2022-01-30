using System;
using Xunit;
using miza.api.Models;
using miza.api.Data;
using miza.api.Controllers;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using miza.api.Dtos;
namespace Miza.test
{
    public class UnitTest1
    {
        public readonly IProductRepository repo;
        public readonly IMapper mapper;
        public UnitTest1(){
             var options =  new DbContextOptionsBuilder<DataContext>()  ///Create Virtual  Database In Memory For Testing. 
            .UseInMemoryDatabase(databaseName: "DatingApp.db")
            .Options;
            repo = new ProductRepository(new DataContext(options));  ///Define Product Repository For Testing Unit
            var configuration = new MapperConfiguration(cfg =>
                cfg.CreateMap<Product, ProductReturnDto>());
            IMapper mapper = new Mapper(configuration);
        }
        [Fact]
        public async Task AddingTest()
        {
            #region  Arrange           
            Product product =  new Product() {  ///Create Product
            Category ="Glasses", 
            Price = 20,
            Quentity = 20,
            Name = "Glass1",
            UserId = 1
            };            
            Product Product_existing = null;
            ProductReturnDto Product_notExisting = null;
            #endregion

            #region Act 
                var controller = new ProductController(repo, mapper);
                Product_existing = (await controller.AddProduct(product)).Value;
                Product_notExisting = (await controller.GetProduct(int.MaxValue)).Value;
            #endregion 

            #region Assert
            Assert.True(
            Product_existing != null
            && Product_notExisting == null
            );
            #endregion
        }

        [Fact]
        public async Task RemoveTest()
        {
            #region  Arrange            
            Product product = await  repo.GetLastProduct();
            #endregion

            #region Act 
                var controller = new ProductController(repo,mapper);
                await controller.RemoveProduct(product.Id);
            #endregion 

            #region Assert
            Assert.True(
                await repo.GetProduct(product.Id) == null
            );
            #endregion
        }
    }
}

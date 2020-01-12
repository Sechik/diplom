using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Diplom.Models;
using Diplom.WebAPI.Models.Identity;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Diplom.WebAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddSwaggerDocument(opt =>
            {
                opt.Title = "Diplom";
                opt.Version = "1.0";
                opt.Description = "API for diplom";
                opt.DocumentName = "Diplom";
            });

            services.AddDbContext<Context>(opt =>
            {
                opt.UseSqlite("Data Source=diplom.db");
            });

            //Identity
            services.AddDbContext<ApplicationDbContext>(options => options.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));
            services.AddDefaultIdentity<ApplicationUser>()
                .AddEntityFrameworkStores<ApplicationDbContext>();

            services.AddIdentityServer()
                .AddApiAuthorization<ApplicationUser, ApplicationDbContext>();
            services.AddAuthentication()
                .AddIdentityServerJwt();

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();   
            }

            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetRequiredService<Context>();
                context.Database.EnsureCreated();
            }

            app.UseCors(builder =>
            {
                builder.AllowAnyHeader()
                .AllowAnyMethod()
                .WithOrigins("http://localhost:4200")
                .AllowCredentials();
            });

            app.UseHttpsRedirection();
            app.UseRouting();

            //add the Swagger generator and the Swagger UI middlewares
            app.UseOpenApi();
            app.UseSwaggerUi3();

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseIdentityServer();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}

namespace Siemens.NET
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllersWithViews();

            //--------------------------------------------------------------------
            // Configuração para manter a conexão com o PLC Ativa
            //builder.Services.AddSignalR();
            //--------------------------------------------------------------------

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
            }
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=ConexaoPLC}/{action=Index}/{id?}");

            app.Run();
        }
    }
}
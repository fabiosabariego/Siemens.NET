using Microsoft.AspNetCore.Mvc;

namespace Siemens.NET.Controllers
{
    public class ReadWriteController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using Siemens.NET.Models;

namespace Siemens.NET.Controllers
{
    public class ReadWriteController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult WritePLC(ReadWriteModel dados)
        {

            return Json(new { success = true, message = "Dados recebidos com sucesso!" });
        }

        [HttpGet]
        public ActionResult ReadPLC(ReadWriteModel dados)
        {

            return Json(new { success = true, message = "Dados recebidos com sucesso!" });
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using S7.Net;
using Siemens.NET.Models;

namespace Siemens.NET.Controllers
{
    public class ConexaoPLCController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Conectar()
        {
            var conexaoModel = new ConexaoPLCModel();
            return View(conexaoModel);
        }

        [HttpPost]
        public IActionResult Conectar(ConexaoPLCModel conexaoModel)
        {
            Plc plc = new Plc(conexaoModel.TipoCPU, conexaoModel.Ip, conexaoModel.Rack, conexaoModel.Slot);
            plc.Open();
            return View(conexaoModel);
        }


        // ---------------------------------------------------------------
        // Métodos Auxiliares
        // ---------------------------------------------------------------

    }
}

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

            try
            {
                plc.Open();
                if (plc.IsConnected)
                {
                    ViewBag.StatusConexao = "Conectado";
                }
            }
            catch (PlcException ex)
            {
                if (ex != null)
                {
                    ViewBag.StatusConexao = $"Dados Incorretos ou PLC fora da rede!";
                }

            }

            return View("Index");
        }

        [HttpPost]
        public IActionResult Desconectar(ConexaoPLCModel conexaoModel)
        {
            Plc plc = new Plc(conexaoModel.TipoCPU, conexaoModel.Ip, conexaoModel.Rack, conexaoModel.Slot);

            plc.Close();

            if (!plc.IsConnected)
            {
                ViewBag.StatusConexao = "Desconectado";
            }

            return View("Index");
        }


        // ---------------------------------------------------------------
        // Métodos Auxiliares
        // ---------------------------------------------------------------
        

    }
}

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
                    //plc.Write("DB10.DBW0", "32.47");
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

            var res1 = plc.Read("DB1.DBW0");
            ushort res2 = (ushort)plc.Read("DB1.DBW2");
            float valRes2 = res2 / 100f;

            plc.Write("DB1.DBW0", (UInt16)52);
            plc.Write("DB1.DBD6", (float)19.33f);

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

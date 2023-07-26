using Microsoft.AspNetCore.Mvc;
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
        public IActionResult Conectar(ConexaoPLCModel conexaoPlc)
        {

            Plc plc = new Plc(conexaoPlc.TipoCPU, conexaoPlc.Ip, conexaoPlc.Rack, conexaoPlc.Slot);

            try
            {
                plc.Open();

                if (plc.IsConnected)
                {
                    ViewBag.StatusConexao = "Conectado com Sucesso!";
                }
            }
            catch (PlcException ex)
            {
                ViewBag.StatusConexao = "Falha na Conexão";
            }


            return View("Index");

            /*
            var res1 = plc.Read("DB1.DBW0");
            ushort res2 = (ushort)plc.Read("DB1.DBW2");
            float valRes2 = res2 / 100f;

            plc.Write("DB1.DBW0", (UInt16)52);
            plc.Write("DB1.DBD6", (float)19.33f);

            */
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

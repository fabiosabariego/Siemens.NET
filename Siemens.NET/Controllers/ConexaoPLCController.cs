using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;
using S7.Net;
using Siemens.NET.Interfaces;
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
            string valConexao = JsonConvert.SerializeObject(conexaoPlc);
            HttpContext.Session.SetString("sessaoConexaoPlc", valConexao);

            string stsConexao = DadosConexaoPlc(conexaoPlc, "conectar");

            ViewBag.StatusConexao = stsConexao;

            return View("Index");

        }

        [HttpPost]
        public IActionResult Desconectar(ConexaoPLCModel conexaoPlc)
        {

            Plc plc = new Plc(conexaoPlc.TipoCPU, conexaoPlc.Ip, conexaoPlc.Rack, conexaoPlc.Slot);

            plc.Close();

            if (!plc.IsConnected)
            {
                ViewBag.StatusConexao = "Desconectado";
            }

            return View("Index");
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

        // ---------------------------------------------------------------
        // Métodos Auxiliares
        // ---------------------------------------------------------------
        public string DadosConexaoPlc(ConexaoPLCModel conexaoModel, string acao)
        {
            string stsConexao = "";
            Plc plc = new Plc(conexaoModel.TipoCPU, conexaoModel.Ip, conexaoModel.Rack, conexaoModel.Slot);

            if (acao == "conectar")
            {
                try
                {
                    plc.Open();

                    if (plc.IsConnected)
                    {
                        stsConexao = "Conectado com Sucesso!";
                    }
                }
                catch (PlcException ex)
                {
                    stsConexao = "Falha na Conexão";
                }
            }
            else if (acao == "desconectar")
            {
                plc.Close();

                if (!plc.IsConnected)
                {
                    stsConexao = "Desconectado";
                }
                else
                {
                    stsConexao = "Falha ao Desconectar";
                }
 
            }

            return stsConexao;

        }

    }
}

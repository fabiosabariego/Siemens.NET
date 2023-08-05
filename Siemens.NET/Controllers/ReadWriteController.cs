using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using S7.Net;
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
            string valConexao = HttpContext.Session.GetString("sessaoConexaoPlc");
            ConexaoPLCModel conexaoPlc = JsonConvert.DeserializeObject<ConexaoPLCModel>(valConexao);

            Plc plc = new Plc(conexaoPlc.TipoCPU, conexaoPlc.Ip, conexaoPlc.Rack, conexaoPlc.Slot);
            plc.Open();

            // Verifica qual tipo de dado foi selecionado para Escrever no PLC
            if (dados.TipoDados == "real")
            {
                if (dados.ValorPlc.Contains(","))
                {
                    dados.ValorPlc = dados.ValorPlc.Replace(",", ".");
                }

                //plc.Write(dados.Endereco, (float)Convert.ToInt32((dados.ValorPlc) + "f"));
                plc.Write(dados.Endereco, float.Parse(dados.ValorPlc));
            }
            else if (dados.TipoDados == "int")
            {
                plc.Write(dados.Endereco, (UInt16)Convert.ToInt16(dados.ValorPlc));
            }
            else if (dados.TipoDados == "bool")
            {
                plc.Write(dados.Endereco, dados.ValorPlc);
            }

            return Json(new { success = true, message = "Dados enviados com sucesso!" });
        }

        [HttpGet]
        public ActionResult ReadPLC(ReadWriteModel dados)
        {

            string valConexao = HttpContext.Session.GetString("sessaoConexaoPlc");
            ConexaoPLCModel conexaoPlc = JsonConvert.DeserializeObject<ConexaoPLCModel>(valConexao);

            Plc plc = new Plc(conexaoPlc.TipoCPU, conexaoPlc.Ip, conexaoPlc.Rack, conexaoPlc.Slot);
            plc.Open();

            // Verifica qual tipo de dado foi selecionado para Ler no PLC
            if (dados.TipoDados == "real")
            {
                dados.ValorPlc = Convert.ToString((ushort)plc.Read(dados.Endereco)/100f);
            }

            return new JsonResult(Ok(dados.ValorPlc));
        
        }
    }
}

/*
    var res1 = plc.Read("DB1.DBW0");
    ushort res2 = (ushort)plc.Read("DB1.DBW2");
    float valRes2 = res2 / 100f;

    plc.Write("DB1.DBW0", (UInt16)52);
    plc.Write("DB1.DBD6", (float)19.33f);

*/
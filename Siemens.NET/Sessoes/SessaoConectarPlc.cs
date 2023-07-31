using Newtonsoft.Json;
using Siemens.NET.Interfaces;
using Siemens.NET.Models;
using System.Text.Json.Serialization;

namespace Siemens.NET.Sessoes
{
    public class SessaoConectarPlc : IConexaoPlc
    {

        private readonly IHttpContextAccessor _httpContext;

        public SessaoConectarPlc(IHttpContextAccessor httpContext)
        {
            this._httpContext = httpContext;
        }

        void IConexaoPlc.SessaoConectarPlc(ConexaoPLCModel conexaoPlc)
        {
            string valConexao = JsonConvert.SerializeObject(conexaoPlc);

            _httpContext.HttpContext.Session.SetString("sessaoConexaoPlc", valConexao);
        }
    }
}

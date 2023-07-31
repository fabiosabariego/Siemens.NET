using Siemens.NET.Models;

namespace Siemens.NET.Interfaces
{
    public interface IConexaoPlc
    {
        void SessaoConectarPlc(ConexaoPLCModel conexaoPlc);

    }
}

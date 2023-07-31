using Microsoft.EntityFrameworkCore.Metadata;
using S7.Net;

namespace Siemens.NET.Models
{
    public class ReadWriteModel
    {

        // Leitura e Escrita de Bytes
        public string? Endereco { get; set; }
        public string ValorPlc { get; set; }
        public string TipoDados { get; set; }

    }
}

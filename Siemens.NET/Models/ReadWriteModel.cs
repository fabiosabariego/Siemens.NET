using Microsoft.EntityFrameworkCore.Metadata;
using S7.Net;
using System.ComponentModel.DataAnnotations;

namespace Siemens.NET.Models
{
    public class ReadWriteModel
    {

        // Leitura e Escrita de Bytes

        [Required]
        public string? Endereco { get; set; }

        [Required]
        public string ValorPlc { get; set; }

        [Required]
        public string TipoDados { get; set; }

    }
}

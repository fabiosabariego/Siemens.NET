using S7.Net;
using System.ComponentModel.DataAnnotations;

namespace Siemens.NET.Models
{
    public class ConexaoPLCModel
    {
        [Required]
        public CpuType TipoCPU { get; set; }

        [Required]
        public string Ip { get; set; }

        [Required]
        public Int16 Rack { get; set; }

        [Required]
        public Int16 Slot { get; set; }


    }
}

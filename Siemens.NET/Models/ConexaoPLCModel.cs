using S7.Net;

namespace Siemens.NET.Models
{
    public class ConexaoPLCModel
    {
        public CpuType TipoCPU { get; set; }
        public string Ip { get; set; }
        public Int16 Rack { get; set; }
        public Int16 Slot { get; set; }
        public PlcException plcException { get; set; }

    }
}

using Microsoft.EntityFrameworkCore.Metadata;
using S7.Net;

namespace Siemens.NET.Models
{
    public class ReadWriteModel
    {
        
        // Leitura e Escrita de Bytes
        public DataType DataType { get; set; }
        public int Db { get; set; }
        public int StartByte { get; set; }
        public int Count { get; set; }
        public byte[] Value { get; set; }
        public int ReadOrWrite { get; set; }

    }
}

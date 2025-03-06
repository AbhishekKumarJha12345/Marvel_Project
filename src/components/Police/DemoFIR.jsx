import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = {
  "Nagpur": {
    "Ajni": [
      {
        "FIR_Number": "2025/NGP/001",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "117 (4)",
        "Key_New_Offences": "Mob Assault"
      },
      {
        "FIR_Number": "2024/NSK/013",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "111",
        "Key_New_Offences": "Organized Crime"
      },
      {
        "FIR_Number": "2024/AUR/015",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "304",
        "Key_New_Offences": "Snatching"
      },
      {
        "FIR_Number": "2025/PN/017",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Zero FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "113",
        "Key_New_Offences": "Terrorism"
      },
      {
        "FIR_Number": "2023/PN/018",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "eFIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "111",
        "Key_New_Offences": "Organized Crime"
      },
      {
        "FIR_Number": "2023/AUR/041",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "112",
        "Key_New_Offences": "Organized Crime"
      },
      {
        "FIR_Number": "2023/NGP/076",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "eFIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "Sec.113",
        "Key_New_Offences": "Terrorism"
      }
    ],
    "Sadar": [
      {
        "FIR_Number": "2023/JAL/002",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Zero FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "117 (4)",
        "Key_New_Offences": "Mob Assault"
      },
      {
        "FIR_Number": "2023/NGP/003",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "117 (4)",
        "Key_New_Offences": "Mob Assault"
      },
      {
        "FIR_Number": "2025/JAL/019",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "113",
        "Key_New_Offences": "Terrorism"
      },
      {
        "FIR_Number": "2025/TH/020",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "117 (4)",
        "Key_New_Offences": "Mob Assault"
      },
      {
        "FIR_Number": "2025/SOL/023",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "113",
        "Key_New_Offences": "Terrorism"
      },
      {
        "FIR_Number": "2023/AMR/026",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "111",
        "Key_New_Offences": "Organized Crime"
      },
      {
        "FIR_Number": "2023/SOL/027",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "304",
        "Key_New_Offences": "Snatching"
      },
      {
        "FIR_Number": "2024/MUM/042",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "113",
        "Key_New_Offences": "Terrorism"
      },
      {
        "FIR_Number": "2025/SOL/043",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "117 (4)",
        "Key_New_Offences": "Mob Assault"
      },
      {
        "FIR_Number": "2023/MUM/046",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "117 (4)",
        "Key_New_Offences": "Mob Assault"
      },
      {
        "FIR_Number": "2024/MUM/057",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "112",
        "Key_New_Offences": "Organized Crime"
      },
      {
        "FIR_Number": "2024/NGP/067",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Zero FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "Sec.112",
        "Key_New_Offences": "Organized Crime"
      },
      {
        "FIR_Number": "2025/AMR/071",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "Sec.113",
        "Key_New_Offences": "Terrorism"
      }
    ],
    "Lakadganj": [
      {
        "FIR_Number": "2024/JAL/004",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "304",
        "Key_New_Offences": "Snatching"
      },
      {
        "FIR_Number": "2025/KOL/006",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Zero FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "304",
        "Key_New_Offences": "Snatching"
      },
      {
        "FIR_Number": "2023/PN/007",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "304",
        "Key_New_Offences": "Terrorism"
      },
      {
        "FIR_Number": "2025/AUR/009",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "111",
        "Key_New_Offences": "Organized Crime"
      },
      {
        "FIR_Number": "2024/JAL/010",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Zero FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "111",
        "Key_New_Offences": "Organized Crime"
      },
      {
        "FIR_Number": "2024/SOL/012",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "111",
        "Key_New_Offences": "Organized Crime"
      },
      {
        "FIR_Number": "2025/AMR/014",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "112",
        "Key_New_Offences": "Organized Crime"
      },
      {
        "FIR_Number": "2023/TH/016",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "304",
        "Key_New_Offences": "Snatching"
      },
      {
        "FIR_Number": "2025/AMR/021",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "eFIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "117 (4)",
        "Key_New_Offences": "Mob Assault"
      },
      {
        "FIR_Number": "2023/MUM/024",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "113",
        "Key_New_Offences": "Terrorism"
      },
      {
        "FIR_Number": "2023/NSK/028",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "111",
        "Key_New_Offences": "Organized Crime"
      },
      {
        "FIR_Number": "2025/KOL/030",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "103 (2)",
        "Key_New_Offences": "Mob Lynching"
      },
      {
        "FIR_Number": "2025/KOL/031",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "111",
        "Key_New_Offences": "Organized Crime"
      },
      {
        "FIR_Number": "2023/PN/033",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "113",
        "Key_New_Offences": "Terrorism"
      },
      {
        "FIR_Number": "2023/MUM/035",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "103 (2)",
        "Key_New_Offences": "Mob Lynching"
      },
      {
        "FIR_Number": "2024/AUR/036",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "304",
        "Key_New_Offences": "Snatching"
      },
      {
        "FIR_Number": "2024/KOL/038",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "112",
        "Key_New_Offences": "Organized Crime"
      },
      {
        "FIR_Number": "2024/NSK/039",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "304",
        "Key_New_Offences": "Snatching"
      },
      {
        "FIR_Number": "2023/MUM/044",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "117 (4)",
        "Key_New_Offences": "Mob Assault"
      },
      {
        "FIR_Number": "2024/TH/047",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "112",
        "Key_New_Offences": "Organized Crime"
      },
      {
        "FIR_Number": "2023/JAL/051",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "111",
        "Key_New_Offences": "Organized Crime"
      },
      {
        "FIR_Number": "2024/MUM/052",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "112",
        "Key_New_Offences": "Organized Crime"
      },
      {
        "FIR_Number": "2023/PN/054",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Zero FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "117 (4)",
        "Key_New_Offences": "Mob Assault"
      },
      {
        "FIR_Number": "2025/NGP/058",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Zero FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "Sec.111",
        "Key_New_Offences": "Organized Crime"
      },
      {
        "FIR_Number": "2024/SOL/061",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "Sec.112",
        "Key_New_Offences": "Organized Crime"
      },
      {
        "FIR_Number": "2024/PN/062",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "Sec.111",
        "Key_New_Offences": "Organized Crime"
      },
      {
        "FIR_Number": "2023/AUR/064",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "Sec.113",
        "Key_New_Offences": "Terrorism"
      },
      {
        "FIR_Number": "2025/MUM/068",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Zero FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "Sec.112",
        "Key_New_Offences": "Organized Crime"
      },
      {
        "FIR_Number": "2024/SOL/072",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "Sec.111",
        "Key_New_Offences": "Organized Crime"
      },
      {
        "FIR_Number": "2023/SOL/075",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "eFIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "Sec.103(2)",
        "Key_New_Offences": "Mob Lynching"
      },
      {
        "FIR_Number": "2023/JAL/078",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "eFIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "Sec.112",
        "Key_New_Offences": "Organized Crime"
      },
      {
        "FIR_Number": "2023/JAL/079",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "Sec.117(4)",
        "Key_New_Offences": "Mob Assault"
      }
    ],
    "Sitabuldi": [
      {
        "FIR_Number": "2025/NGP/005",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "304",
        "Key_New_Offences": "Snatching"
      },
      {
        "FIR_Number": "2023/MUM/008",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "eFIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "304",
        "Key_New_Offences": "Organized Crime"
      },
      {
        "FIR_Number": "2023/AUR/011",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "304",
        "Key_New_Offences": "Snatching"
      },
      {
        "FIR_Number": "2024/SOL/022",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "113",
        "Key_New_Offences": "Terrorism"
      },
      {
        "FIR_Number": "2025/AUR/025",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "112",
        "Key_New_Offences": "Organized Crime"
      },
      {
        "FIR_Number": "2025/NSK/029",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Zero FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "117 (4)",
        "Key_New_Offences": "Mob Assault"
      },
      {
        "FIR_Number": "2024/AUR/032",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "117 (4)",
        "Key_New_Offences": "Mob Assault"
      },
      {
        "FIR_Number": "2024/TH/034",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "113",
        "Key_New_Offences": "Terrorism"
      },
      {
        "FIR_Number": "2023/SOL/037",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "113",
        "Key_New_Offences": "Terrorism"
      },
      {
        "FIR_Number": "2024/SOL/040",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "113",
        "Key_New_Offences": "Terrorism"
      },
      {
        "FIR_Number": "2025/JAL/045",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "111",
        "Key_New_Offences": "Organized Crime"
      },
      {
        "FIR_Number": "2023/AMR/048",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Zero FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "117 (4)",
        "Key_New_Offences": "Mob Assault"
      },
      {
        "FIR_Number": "2025/NGP/049",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "eFIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "112",
        "Key_New_Offences": "Organized Crime"
      },
      {
        "FIR_Number": "2024/NSK/050",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "113",
        "Key_New_Offences": "Terrorism"
      },
      {
        "FIR_Number": "2025/AMR/053",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "111",
        "Key_New_Offences": "Organized Crime"
      },
      {
        "FIR_Number": "2023/JAL/055",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "103 (2)",
        "Key_New_Offences": "Mob Lynching"
      },
      {
        "FIR_Number": "2023/AMR/056",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Zero FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "103 (2)",
        "Key_New_Offences": "Mob Lynching"
      },
      {
        "FIR_Number": "2025/TH/059",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "Sec.304",
        "Key_New_Offences": "Snatching"
      },
      {
        "FIR_Number": "2024/MUM/060",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "eFIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "Sec.112",
        "Key_New_Offences": "Organized Crime"
      },
      {
        "FIR_Number": "2024/AUR/063",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "eFIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "Sec.117(4)",
        "Key_New_Offences": "Mob Assault"
      },
      {
        "FIR_Number": "2025/AMR/065",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "Sec.117(4)",
        "Key_New_Offences": "Mob Assault"
      },
      {
        "FIR_Number": "2023/AUR/066",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Zero FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "Sec.117(4)",
        "Key_New_Offences": "Mob Assault"
      },
      {
        "FIR_Number": "2024/KOL/069",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Zero FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "Sec.304",
        "Key_New_Offences": "Snatching"
      },
      {
        "FIR_Number": "2023/NGP/070",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "Sec.103(2)",
        "Key_New_Offences": "Mob Lynching"
      },
      {
        "FIR_Number": "2024/PN/073",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "Sec.113",
        "Key_New_Offences": "Terrorism"
      },
      {
        "FIR_Number": "2023/NGP/074",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Zero FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "Sec.103(2)",
        "Key_New_Offences": "Mob Lynching"
      },
      {
        "FIR_Number": "2023/NSK/077",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "Sec.111",
        "Key_New_Offences": "Organized Crime"
      },
      {
        "FIR_Number": "2023/SOL/080",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "Sec.103(2)",
        "Key_New_Offences": "Mob Lynching"
      }
    ]
  }
}



const Fir_4_LineGraph = () => {
  const [district, setDistrict] = useState('');
  const [station, setStation] = useState('');
  const [viewType, setViewType] = useState('bar');

  const districts = Object.keys(data);
  const stations = district ? Object.keys(data[district]) : [];

  const offenses = station ? data[district][station] : [];
  const offenseCounts = offenses.reduce((acc, offense) => {
    acc[offense.Key_New_Offences] = (acc[offense.Key_New_Offences] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(offenseCounts).map(key => ({
    name: key,
    count: offenseCounts[key]
  }));

  return (
    <div className="p-4">
      <select onChange={(e) => setDistrict(e.target.value)} value={district} className="ml-4 p-2 border rounded">
        <option value="">Select District</option>
        {districts.map(d => <option key={d} value={d}>{d}</option>)}
      </select>

      {district && (
        <select onChange={(e) => setStation(e.target.value)} value={station} className="ml-4 p-2 border rounded">
          <option value="">Select Police Station</option>
          {stations.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      )}

      {/* {station && (
        <select onChange={(e) => setViewType(e.target.value)} value={viewType} className="ml-4 p-2 border rounded">
          <option value="bar">Bar Chart</option>
          <option value="line">Line Chart</option>
        </select>
      )} */}

      {station && (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Fir_4_LineGraph;

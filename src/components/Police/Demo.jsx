import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { LineChart, Line } from "recharts";


const data = {
  "Nagpur": {
    "Ajni": [
      {
        "FIR_Number": "2025/NGP/001",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "117 (4)",
        "Key_New_Offences": "Mob Assault",
        "FIR_Date": "2023-03-21"
      },
      {
        "FIR_Number": "2024/NSK/013",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "111",
        "Key_New_Offences": "Organized Crime",
        "FIR_Date": "2023-07-17"
      },
      {
        "FIR_Number": "2024/AUR/015",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "304",
        "Key_New_Offences": "Snatching",
        "FIR_Date": "2023-07-07"
      },
      {
        "FIR_Number": "2025/PN/017",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Zero FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "113",
        "Key_New_Offences": "Terrorism",
        "FIR_Date": "2023-07-04"
      },
      {
        "FIR_Number": "2023/PN/018",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "eFIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "111",
        "Key_New_Offences": "Organized Crime",
        "FIR_Date": "2023-03-12"
      },
      {
        "FIR_Number": "2023/AUR/041",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "112",
        "Key_New_Offences": "Organized Crime",
        "FIR_Date": "2023-09-26"
      },
      {
        "FIR_Number": "2023/NGP/076",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "eFIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "Sec.113",
        "Key_New_Offences": "Terrorism",
        "FIR_Date": "2023-10-06"
      }
    ],
    "Sadar": [
      {
        "FIR_Number": "2023/JAL/002",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Zero FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "117 (4)",
        "Key_New_Offences": "Mob Assault",
        "FIR_Date": "2023-01-04"
      },
      {
        "FIR_Number": "2023/NGP/003",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "117 (4)",
        "Key_New_Offences": "Mob Assault",
        "FIR_Date": "2023-01-16"
      },
      {
        "FIR_Number": "2025/JAL/019",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "113",
        "Key_New_Offences": "Terrorism",
        "FIR_Date": "2023-10-21"
      },
      {
        "FIR_Number": "2025/TH/020",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "117 (4)",
        "Key_New_Offences": "Mob Assault",
        "FIR_Date": "2023-11-02"
      },
      {
        "FIR_Number": "2025/SOL/023",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "113",
        "Key_New_Offences": "Terrorism",
        "FIR_Date": "2023-01-24"
      },
      {
        "FIR_Number": "2023/AMR/026",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "111",
        "Key_New_Offences": "Organized Crime",
        "FIR_Date": "2023-05-15"
      },
      {
        "FIR_Number": "2023/SOL/027",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "304",
        "Key_New_Offences": "Snatching",
        "FIR_Date": "2023-03-09"
      },
      {
        "FIR_Number": "2024/MUM/042",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "113",
        "Key_New_Offences": "Terrorism",
        "FIR_Date": "2023-09-15"
      },
      {
        "FIR_Number": "2025/SOL/043",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "117 (4)",
        "Key_New_Offences": "Mob Assault",
        "FIR_Date": "2023-09-16"
      },
      {
        "FIR_Number": "2023/MUM/046",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "117 (4)",
        "Key_New_Offences": "Mob Assault",
        "FIR_Date": "2023-02-10"
      },
      {
        "FIR_Number": "2024/MUM/057",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "112",
        "Key_New_Offences": "Organized Crime",
        "FIR_Date": "2023-05-09"
      },
      {
        "FIR_Number": "2024/NGP/067",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Zero FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "Sec.112",
        "Key_New_Offences": "Organized Crime",
        "FIR_Date": "2023-02-14"
      },
      {
        "FIR_Number": "2025/AMR/071",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "Sec.113",
        "Key_New_Offences": "Terrorism",
        "FIR_Date": "2023-03-16"
      }
    ],
    "Lakadganj": [
      {
        "FIR_Number": "2024/JAL/004",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "304",
        "Key_New_Offences": "Snatching",
        "FIR_Date": "2023-03-01"
      },
      {
        "FIR_Number": "2025/KOL/006",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Zero FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "304",
        "Key_New_Offences": "Snatching",
        "FIR_Date": "2023-01-03"
      },
      {
        "FIR_Number": "2023/PN/007",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "304",
        "Key_New_Offences": "Terrorism",
        "FIR_Date": "2023-05-13"
      },
      {
        "FIR_Number": "2025/AUR/009",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "111",
        "Key_New_Offences": "Organized Crime",
        "FIR_Date": "2023-09-29"
      },
      {
        "FIR_Number": "2024/JAL/010",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Zero FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "111",
        "Key_New_Offences": "Organized Crime",
        "FIR_Date": "2023-06-07"
      },
      {
        "FIR_Number": "2024/SOL/012",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "111",
        "Key_New_Offences": "Organized Crime",
        "FIR_Date": "2023-10-09"
      },
      {
        "FIR_Number": "2025/AMR/014",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "112",
        "Key_New_Offences": "Organized Crime",
        "FIR_Date": "2023-03-16"
      },
      {
        "FIR_Number": "2023/TH/016",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "304",
        "Key_New_Offences": "Snatching",
        "FIR_Date": "2023-11-21"
      },
      {
        "FIR_Number": "2025/AMR/021",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "eFIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "117 (4)",
        "Key_New_Offences": "Mob Assault",
        "FIR_Date": "2023-09-26"
      },
      {
        "FIR_Number": "2023/MUM/024",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "113",
        "Key_New_Offences": "Terrorism",
        "FIR_Date": "2023-10-10"
      },
      {
        "FIR_Number": "2023/NSK/028",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "111",
        "Key_New_Offences": "Organized Crime",
        "FIR_Date": "2023-08-22"
      },
      {
        "FIR_Number": "2025/KOL/030",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "103 (2)",
        "Key_New_Offences": "Mob Lynching",
        "FIR_Date": "2023-12-31"
      },
      {
        "FIR_Number": "2025/KOL/031",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "111",
        "Key_New_Offences": "Organized Crime",
        "FIR_Date": "2023-03-02"
      },
      {
        "FIR_Number": "2023/PN/033",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "113",
        "Key_New_Offences": "Terrorism",
        "FIR_Date": "2023-02-03"
      },
      {
        "FIR_Number": "2023/MUM/035",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "103 (2)",
        "Key_New_Offences": "Mob Lynching",
        "FIR_Date": "2023-02-20"
      },
      {
        "FIR_Number": "2024/AUR/036",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "304",
        "Key_New_Offences": "Snatching",
        "FIR_Date": "2023-12-19"
      },
      {
        "FIR_Number": "2024/KOL/038",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "112",
        "Key_New_Offences": "Organized Crime",
        "FIR_Date": "2023-03-05"
      },
      {
        "FIR_Number": "2024/NSK/039",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "304",
        "Key_New_Offences": "Snatching",
        "FIR_Date": "2023-05-17"
      },
      {
        "FIR_Number": "2023/MUM/044",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "117 (4)",
        "Key_New_Offences": "Mob Assault",
        "FIR_Date": "2023-10-22"
      },
      {
        "FIR_Number": "2024/TH/047",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "112",
        "Key_New_Offences": "Organized Crime",
        "FIR_Date": "2023-07-18"
      },
      {
        "FIR_Number": "2023/JAL/051",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "111",
        "Key_New_Offences": "Organized Crime",
        "FIR_Date": "2023-03-09"
      },
      {
        "FIR_Number": "2024/MUM/052",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "112",
        "Key_New_Offences": "Organized Crime",
        "FIR_Date": "2023-04-01"
      },
      {
        "FIR_Number": "2023/PN/054",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Zero FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "117 (4)",
        "Key_New_Offences": "Mob Assault",
        "FIR_Date": "2023-02-02"
      },
      {
        "FIR_Number": "2025/NGP/058",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Zero FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "Sec.111",
        "Key_New_Offences": "Organized Crime",
        "FIR_Date": "2023-05-06"
      },
      {
        "FIR_Number": "2024/SOL/061",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "Sec.112",
        "Key_New_Offences": "Organized Crime",
        "FIR_Date": "2023-07-29"
      },
      {
        "FIR_Number": "2024/PN/062",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "Sec.111",
        "Key_New_Offences": "Organized Crime",
        "FIR_Date": "2023-02-13"
      },
      {
        "FIR_Number": "2023/AUR/064",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "Sec.113",
        "Key_New_Offences": "Terrorism",
        "FIR_Date": "2023-09-21"
      },
      {
        "FIR_Number": "2025/MUM/068",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Zero FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "Sec.112",
        "Key_New_Offences": "Organized Crime",
        "FIR_Date": "2023-03-16"
      },
      {
        "FIR_Number": "2024/SOL/072",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "Sec.111",
        "Key_New_Offences": "Organized Crime",
        "FIR_Date": "2023-04-03"
      },
      {
        "FIR_Number": "2023/SOL/075",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "eFIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "Sec.103(2)",
        "Key_New_Offences": "Mob Lynching",
        "FIR_Date": "2023-11-26"
      },
      {
        "FIR_Number": "2023/JAL/078",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "eFIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "Sec.112",
        "Key_New_Offences": "Organized Crime",
        "FIR_Date": "2023-01-08"
      },
      {
        "FIR_Number": "2023/JAL/079",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "Sec.117(4)",
        "Key_New_Offences": "Mob Assault",
        "FIR_Date": "2023-06-07"
      }
    ],
    "Sitabuldi": [
      {
        "FIR_Number": "2025/NGP/005",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "304",
        "Key_New_Offences": "Snatching",
        "FIR_Date": "2023-08-10"
      },
      {
        "FIR_Number": "2023/MUM/008",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "eFIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "304",
        "Key_New_Offences": "Organized Crime",
        "FIR_Date": "2023-03-31"
      },
      {
        "FIR_Number": "2023/AUR/011",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "304",
        "Key_New_Offences": "Snatching",
        "FIR_Date": "2023-08-20"
      },
      {
        "FIR_Number": "2024/SOL/022",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "113",
        "Key_New_Offences": "Terrorism",
        "FIR_Date": "2023-09-25"
      },
      {
        "FIR_Number": "2025/AUR/025",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "112",
        "Key_New_Offences": "Organized Crime",
        "FIR_Date": "2023-08-28"
      },
      {
        "FIR_Number": "2025/NSK/029",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Zero FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "117 (4)",
        "Key_New_Offences": "Mob Assault",
        "FIR_Date": "2023-09-04"
      },
      {
        "FIR_Number": "2024/AUR/032",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "117 (4)",
        "Key_New_Offences": "Mob Assault",
        "FIR_Date": "2023-09-29"
      },
      {
        "FIR_Number": "2024/TH/034",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "113",
        "Key_New_Offences": "Terrorism",
        "FIR_Date": "2023-09-14"
      },
      {
        "FIR_Number": "2023/SOL/037",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "113",
        "Key_New_Offences": "Terrorism",
        "FIR_Date": "2023-07-22"
      },
      {
        "FIR_Number": "2024/SOL/040",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "113",
        "Key_New_Offences": "Terrorism",
        "FIR_Date": "2023-09-21"
      },
      {
        "FIR_Number": "2025/JAL/045",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "111",
        "Key_New_Offences": "Organized Crime",
        "FIR_Date": "2023-11-15"
      },
      {
        "FIR_Number": "2023/AMR/048",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Zero FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "117 (4)",
        "Key_New_Offences": "Mob Assault",
        "FIR_Date": "2023-10-05"
      },
      {
        "FIR_Number": "2025/NGP/049",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "eFIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "112",
        "Key_New_Offences": "Organized Crime",
        "FIR_Date": "2023-10-08"
      },
      {
        "FIR_Number": "2024/NSK/050",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "113",
        "Key_New_Offences": "Terrorism",
        "FIR_Date": "2023-07-15"
      },
      {
        "FIR_Number": "2025/AMR/053",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "111",
        "Key_New_Offences": "Organized Crime",
        "FIR_Date": "2023-04-04"
      },
      {
        "FIR_Number": "2023/JAL/055",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "103 (2)",
        "Key_New_Offences": "Mob Lynching",
        "FIR_Date": "2023-06-15"
      },
      {
        "FIR_Number": "2023/AMR/056",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Zero FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "103 (2)",
        "Key_New_Offences": "Mob Lynching",
        "FIR_Date": "2023-03-06"
      },
      {
        "FIR_Number": "2025/TH/059",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "Sec.304",
        "Key_New_Offences": "Snatching",
        "FIR_Date": "2023-07-17"
      },
      {
        "FIR_Number": "2024/MUM/060",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "eFIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "Sec.112",
        "Key_New_Offences": "Organized Crime",
        "FIR_Date": "2023-09-22"
      },
      {
        "FIR_Number": "2024/AUR/063",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "eFIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "Sec.117(4)",
        "Key_New_Offences": "Mob Assault",
        "FIR_Date": "2023-06-03"
      },
      {
        "FIR_Number": "2025/AMR/065",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "Sec.117(4)",
        "Key_New_Offences": "Mob Assault",
        "FIR_Date": "2023-10-22"
      },
      {
        "FIR_Number": "2023/AUR/066",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Zero FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "Sec.117(4)",
        "Key_New_Offences": "Mob Assault",
        "FIR_Date": "2023-04-30"
      },
      {
        "FIR_Number": "2024/KOL/069",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Zero FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "Sec.304",
        "Key_New_Offences": "Snatching",
        "FIR_Date": "2023-06-29"
      },
      {
        "FIR_Number": "2023/NGP/070",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "Sec.103(2)",
        "Key_New_Offences": "Mob Lynching",
        "FIR_Date": "2023-10-24"
      },
      {
        "FIR_Number": "2024/PN/073",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Charge Sheeted",
        "Act": "Sec.113",
        "Key_New_Offences": "Terrorism",
        "FIR_Date": "2023-10-13"
      },
      {
        "FIR_Number": "2023/NGP/074",
        "Criminal_Code": "BNSS",
        "Type_of_FIR": "Zero FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "Sec.103(2)",
        "Key_New_Offences": "Mob Lynching",
        "FIR_Date": "2023-01-07"
      },
      {
        "FIR_Number": "2023/NSK/077",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "Sec.111",
        "Key_New_Offences": "Organized Crime",
        "FIR_Date": "2023-04-11"
      },
      {
        "FIR_Number": "2023/SOL/080",
        "Criminal_Code": "IPC",
        "Type_of_FIR": "Regular FIR",
        "Charge_Sheeted_Status": "Under Investigation",
        "Act": "Sec.103(2)",
        "Key_New_Offences": "Mob Lynching",
        "FIR_Date": "2023-04-26"
      }
    ]
  }
}


// const data = [
//   { type: "FIRs", IPC: 10, BNSS: 8 },
//   { type: "Charge Sheets", IPC: 12, BNSS: 9 },
// ];
const datas = [
  { category: "IPC", FIRs: 24, ChargeSheets: 21 },
  { category: "BNSS", FIRs: 19, ChargeSheets: 16 },
];

const firsBreakdown = [
  { category: "Regular FIRs", IPC_count: 45, BNSS_count: 12 },
  { category: "Zero FIRs", IPC_count: 0, BNSS_count: 14 },
  { category: "eFIRs", IPC_count: 0, BNSS_count: 19 },
];

const bnssBreakdown = [
  { category: "Zero FIRs", count: 3 },
  { category: "eFIRs", count: 4 },
];

const chargesheet_ipc = [
  { category: "Snatching", count: 5 },
  { category: "Mob Lynching", count: 4 },
  { category: "Mob Assault", count: 3 },
  { category: "Terrorism", count: 2 },
  { category: "Organized Crime", count: 1 },
];

// const lineGraphTimePeriod = [
//   { category: "Jan", count: 10 },
//   { category: "Feb", count: 15 },
//   { category: "Mar", count: 8 },
//   { category: "Apr", count: 20 },
//   { category: "May", count: 12 },
// ];


const processLineGraphData = () => {
  let allFIRs = [];

  // Iterate over districts
  Object.values(data).forEach(stations => {
    // Iterate over stations
    Object.values(stations).forEach(firs => {
      allFIRs = allFIRs.concat(firs);
    });
  });

  // Group FIRs by FIR_Date
  const dateCounts = allFIRs.reduce((acc, fir) => {
    acc[fir.FIR_Date] = (acc[fir.FIR_Date] || 0) + 1;
    return acc;
  }, {});

  // Convert to array format for Recharts
  return Object.keys(dateCounts)
    .sort() // Sort by date
    .map(date => ({
      category: date,
      count: dateCounts[date]
    }));
};

// Generate the line graph data
const lineGraphTimePeriod = processLineGraphData();


const FIRChart = () => {
  const [selectedSample, setSelectedSample] = useState(null);


  const [district, setDistrict] = useState('');
  const [station, setStation] = useState('');
  const [viewType, setViewType] = useState('bar');
  
  const districts = Object.keys(data);
  const stations = district ? Object.keys(data[district]) : [];
  
  let offenses = [];
  
  if (district && station) {
    offenses = data[district][station];
  } else if (district) {
    // Aggregate offenses for all stations within the selected district
    offenses = Object.values(data[district]).flat();
  } else {
    // Aggregate offenses for all districts and all stations
    offenses = Object.values(data).flatMap(districtData =>
      Object.values(districtData).flat()
    );
  }
  
  // Count offenses
  const offenseCounts = offenses.reduce((acc, offense) => {
    acc[offense.Key_New_Offences] = (acc[offense.Key_New_Offences] || 0) + 1;
    return acc;
  }, {});
  
  // Format data for the chart
  const chartData = Object.keys(offenseCounts).map(key => ({
    name: key,
    count: offenseCounts[key]
  }));
  
  

  // const handleBarClick = (category, type) => {
  //   const selectedKey =
  //     category === "IPC" && type === "IPC_BNSS"
  //       ? "IPC_BNSS"
  //       : category === "IPC" && type === "sna_mob_terrosim"
  //         ? "sna_mob_terrosim"
  //         : category === "BNSS" && type === "ChargeSheets"
  //           ? "CHARGESHEET_BNSS"
  //           : null;

  //   setSelectedSample((prev) => (prev === selectedKey ? null : selectedKey));
  // };
  const handleBarClick = (category, type) => {
    const selectedKey =
      type === "IPC_BNSS"
        ? "IPC_BNSS" // Clicking on IPC_BNSS bars should go to sna_mob_terrosim
        : type === "sna_mob_terrosim"
        ? "sna_mob_terrosim" // Clicking on sna_mob_terrosim bars should go to chargesheet_ipc
        : type === "line_graph_time_period"
        ? "line_graph_time_period"
        : null;

    setSelectedSample((prev) => (prev === selectedKey ? null : selectedKey));
  };

  return (
    <div>
      {selectedSample ? (
        <div>
          <button onClick={() => setSelectedSample(null)}>Back</button>
          {selectedSample === "IPC_BNSS" && (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={firsBreakdown} barSize={50}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="IPC_count"
                  fill="#8884d8"
                  name="IPC"
                  onClick={(data) =>
                    handleBarClick(data.category, "sna_mob_terrosim")
                  }
                />
                <Bar
                  dataKey="BNSS_count"
                  fill="#82ca9d"
                  name="BNSS"
                  onClick={(data) =>
                    handleBarClick(data.category, "sna_mob_terrosim")
                  }
                />
              </BarChart>
            </ResponsiveContainer>
          )}
          {selectedSample === "sna_mob_terrosim" && (
            // <ResponsiveContainer width="100%" height={400}>
            //   <BarChart data={chargesheet_ipc} barSize={50}>
            //     <XAxis dataKey="category" />
            //     <YAxis />
            //     <Tooltip />
            //     <Legend />
            //     <Bar
            //       dataKey="count"
            //       fill="#82ca9d"
            //       onClick={(data) =>
            //         handleBarClick(data.category, "line_graph_time_period")
            //       }
            //     />
            //   </BarChart>
            // </ResponsiveContainer>
          
            // <FirDemo />


            <div className="p-4">
              <div className="flex items-center justify-between space-x-4">
                <div>
            {/* District Dropdown */}
            <select 
              onChange={(e) => setDistrict(e.target.value)} 
              value={district} 
              className="ml-4 p-2 border rounded"
            >
              <option value="">Select District</option>
              {districts.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          
            {/* Police Station Dropdown (Only Shows if District is Selected) */}
            {district && (
              <select 
                onChange={(e) => setStation(e.target.value)} 
                value={station} 
                className="ml-4 p-2 border rounded"
              >
                <option value="">Select Police Station</option>
                {stations.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            )}
          
            {/* Reset Button */}
            <button 
              onClick={() => {
                setDistrict('');
                setStation('');
              }} 
              className="ml-4 p-2 bg-red-500 text-white rounded"
            >
              Reset Filters
            </button>
            </div>

            <div className="mt-4 flex justify-end space-x-4">
  {chartData.map((item, index) => (
    <p key={index} className="text-sm font-bold">
      <span className="text-black-500">{item.name}</span> : 
      <span className="text-blue-500"> {item.count}</span>
    </p>
  ))}
</div>

  
    </div>

          
            {/* Chart (Always Visible) */}
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="count" 
                  fill="#8884d8" 
                  onClick={(data) =>
                    handleBarClick(data.category, "line_graph_time_period")
                  }
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          

          
          )}
          {selectedSample === "line_graph_time_period" && (
  <ResponsiveContainer width="100%" height={400}>
    <LineChart data={lineGraphTimePeriod}>
      <XAxis dataKey="category" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="count"
        stroke="#82ca9d"
        onClick={(data) => handleBarClick(null)}
      />
    </LineChart>
  </ResponsiveContainer>
)}

        </div>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
  <BarChart data={datas} barSize={50}>
    <XAxis dataKey="category" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar
      dataKey="FIRs"
      fill="#8884d8"
      onClick={(data) => handleBarClick(data.category, "IPC_BNSS")}
    />
    <Bar
      dataKey="ChargeSheets"
      fill="#82ca9d"
      onClick={(data) => handleBarClick(data.category, "IPC_BNSS")}
    />
  </BarChart>
</ResponsiveContainer>

      )}
    </div>
  );
};

export default FIRChart;

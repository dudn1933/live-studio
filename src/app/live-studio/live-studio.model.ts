// type test = "92" | "93" | "94" | "95" | "96" | "97" ;
// export interface LiveStudio {
//     "dp": {
//         "92":number,
//         "93":number,
//         "94":number,
//         "95":number,
//         "96":number,
//         "97":number,
//         "ecg":number[],
//         "hr": {
//             "min":number,
//             "max":number,
//             "current":number
//         },
//         "tempCalibrated":boolean,
//         "F1":number,
//         "9D":number,
//         "A7":number,
//         "AB":number,
//         "AE":number,
//         "B8":number,
//         "B9":number,
//         "D0":number,
//         "D1":number,
//         "hb":boolean,
//     },
//     "di":string,//값 확인하기 숫자인지 스트링인지
//     "dv":string,
//     "gw":string
//     "ts":number,
//     "index":number,
//     "patchIndex":number,
//     "gps":[number,number],
//     "battery":number,
//     "rssi":number,
//     "hospital":string,
// }

type TCode = "92" | "93" | "94" | "95" | "96" | "97" | "F1" | "9D" | "A7" | "AB" | "AE" | "B8" | "B9" | "D0" | "D1";
export interface LiveStudio {
  spaceIndex:number,
  data: {
    dp: {
      [name in TCode]: number;
    } & {
      ecg: number[];
      hr: { min: number; max: number; current: number };
      tempCalibrated: boolean;
      hb: boolean;
    };
    di: string;
    dv: string;
    gw: string;
    ts: number;
    index: number;
    patchIndex: number;
    gps: [number, number];
    battery: number;
    rssi: number;
    hospital: string;
  }
}

export interface Date {
    date: Date;
    year: Date
}
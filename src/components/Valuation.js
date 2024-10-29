import XLSX from "sheetjs-style";
import * as FileSaver from "file-saver";
import { useRef } from "react";
import LoadingSpinner from "./LoadingSpinner";
import Table from "./base/Table";
import ExcelButton from "./base/ExcelButton";

export default function Valuation(props) {
  const { isLoading, valuation, selectedIndustry } = props;

  const ref = useRef(null);

  const exportToExcel = () => {
    var headers = [
      [
        "Hisse Senedi Kodu",
        "Şirket",
        "Bilanço Dönemi",
        "Fiyat",
        "Fiyat / Kazanç Oranı",
        "Piyasa / Defter Değeri",
        "Firma Değeri / FAVÖK",
        "Net Borç / FAVÖK",
        "Hisse Başı Net Nakit",
        "Değerleme Puanı",
        "Tavsiye",
      ],
    ];

    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;";
    const fileExtension = ".xlsx";
    var fileName = selectedIndustry;
    fileName = fileName.concat(" Hisseleri Analiz Raporu-");

    var today = new Date();
    today =
      String(today.getDate()).padStart(2, "0") +
      "." +
      String(today.getMonth() + 1).padStart(2, "0") +
      "." +
      today.getFullYear();

    fileName = fileName.concat(today);

    const ws = XLSX.utils.book_new();
    XLSX.utils.sheet_add_aoa(ws, headers);
    XLSX.utils.sheet_add_json(ws, valuation, {
      origin: "A2",
      skipHeader: true,
    });

    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div ref={ref} class="w-100 p-3">
          <div class="d-flex justify-content-end mb-2">
            <ExcelButton onClick={() => exportToExcel()} />
          </div>
          <Table data={valuation} />
        </div>
      )}
    </div>
  );
}

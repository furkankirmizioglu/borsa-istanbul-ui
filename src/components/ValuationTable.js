import XLSX from "sheetjs-style";
import * as FileSaver from "file-saver";
import { useRef } from "react";
import LoadingSpinner from "./LoadingSpinner"

export default function ValuationTable(props) {
  const {isLoading, valuation, selectedIndustry } = props;

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
            <button
              type="button"
              class="custom-button"
              onClick={() => exportToExcel()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-download"
                viewBox="0 0 15 20"
              >
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"></path>
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"></path>
              </svg>{" "}
              Excel olarak indir
            </button>
          </div>
          <table class="table table-hover table-dark">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th className="th">Hisse Kodu</th>
                <th className="th">Şirket</th>
                <th className="th">Bilanço Dönemi</th>
                <th className="th">Fiyat</th>
                <th className="th">Fiyat / Kazanç</th>
                <th className="th">Piyasa / Defter Değeri</th>
                <th className="th">Firma Değeri / FAVÖK</th>
                <th className="th">Net Borç / FAVÖK</th>
                <th className="th">Değerleme Puanı</th>
                <th className="th">Tavsiye</th>
              </tr>
            </thead>
            <tbody>
              {valuation && valuation.length > 0 ? (
                valuation.map((value) => (
                  <tr>
                    <th scope="row">{valuation.indexOf(value) + 1}</th>
                    <th>{value.ticker}</th>
                    <td>{value.companyName}</td>
                    <td>{value.latestBalanceSheetTerm}</td>
                    <td>{value.price}</td>
                    <td>{value.pe}</td>
                    <td>{value.pb}</td>
                    <td>{value.evToEbitda}</td>
                    <td>{value.netDebtToEbitda}</td>
                    <td>
                      <b>{value.finalScore}</b>
                    </td>
                    <td>{value.suggestion}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" style={{ textAlign: "center" }}>
                    Seçtiğiniz sektöre ait hisseler ve analiz değerleri burada
                    görüntülenecektir.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

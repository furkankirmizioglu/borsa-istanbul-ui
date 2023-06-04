import React from "react";
import { useState, useEffect, useRef } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import LoadingSpinner from "./Spinner/LoadingSpinner.js";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";

export default function App() {
  const [industries, setIndustries] = useState();
  const [valuation, setValuation] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState("");

  const ref = useRef(null);

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;";
  const fileExtension = ".xlsx";

  useEffect(() => {
    document.title = "AlgoAnalyze";
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch("http://localhost:8080/industry/list", {
      mode: "cors",
    });
    const data = await response.json();
    setIndustries(data);
  };

  const fetchValuation = async (industry) => {
    setValuation(null);
    setSelectedIndustry(industry);
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setIsLoading(true);
    const response = await fetch(`http://localhost:8080/valuation/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: industry,
    });
    const data = await response.json();
    setValuation(data);
    setIsLoading(false);
  };

  const exportToExcel = () => {
    var headers = [
      [
        "Hisse Senedi Kodu",
        "Şirket Unvanı",
        "Bilanço Dönemi",
        "Fiyat",
        "Piyasa / Defter Değeri",
        "PEG",
        "FAVÖK Marjı",
        "Net Kâr Marjı",
        "Net Borç / FAVÖK",
        "Değerleme Puanı (100)",
        "Tavsiye",
      ],
    ];

    var fileName = selectedIndustry;
    fileName = fileName.concat(" Sektörü Hisse Senedi Temel Analiz Raporu-");

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

  const valuationTable = (
    <div ref={ref} class="container col-xl-14 col-xxl-14">
      <table class="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">Hisse Kodu</th>
            <th scope="col">Şirket Unvanı</th>
            <th scope="col">Bilanço Dönemi</th>
            <th scope="col">Fiyat</th>
            <th scope="col">Piyasa / Defter Değeri</th>
            <th scope="col">PEG</th>
            <th scope="col">FAVÖK Marjı</th>
            <th scope="col">Net Kâr Marjı</th>
            <th scope="col">Net Borç / FAVÖK</th>
            <th scope="col">Değerleme Puanı &#40;100&#41;</th>
            <th scope="col">Tavsiye</th>
          </tr>
        </thead>
        <tbody>
          {valuation &&
            valuation.length > 0 &&
            valuation.map((value) => (
              <tr>
                <th scope="row">{value.ticker}</th>
                <td>{value.companyName}</td>
                <td>{value.latestBalanceSheetTerm}</td>
                <td>{value.price}</td>
                <td>{value.pb}</td>
                <td>{value.peg}</td>
                <td>%{value.ebitdaMargin}</td>
                <td>%{value.netProfitMargin}</td>
                <td>{value.netDebtToEbitda}</td>
                <td>{value.finalScore}</td>
                <td>{value.suggestion}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div class="d-flex justify-content-end">
        <button
          type="button"
          class="btn btn-secondary"
          onClick={() => exportToExcel()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            class="bi bi-download"
            viewBox="0 0 20 20"
          >
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"></path>
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"></path>
          </svg>{" "}
          Excel'e aktar
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <header class="p-3 text-bg-dark">
        <div class="container">
          <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <h4>
                  AlgoAnalyze - Fundamental Analysis Application For Istanbul
                  Stock Exchange
                </h4>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <div class="container col-xl-14 col-xxl-14">
        <div class="row align-items-center g-lg-5 py-5">
          <div class="col-lg-7 text-center text-lg-start">
            <h1 class="display-4 fw-bold lh-1 mb-3">
              Choosing stocks has never been easier!
            </h1>
            <p class="col-lg-10 fs-4">
              Various metrics such as PEG Ratio, Price / Book Value and more has
              scored simultaneously and bringing opportunities of stock market
              in to your screen. You can find the stocks that have the highest
              chance of profit by choosing a business next to this section.
            </p>
          </div>
          <div class="col-md-10 mx-auto col-lg-5">
            <div class="dropdown-menu dropdown-menu-dark d-block position-static border-0 pt-0 mx-0 rounded-3 shadow w-280px">
              <ul class="list-unstyled mb-0">
                {industries &&
                  industries.length > 0 &&
                  industries.map((indObj, index) => (
                    <li>
                      <button
                        class="dropdown-item d-flex align-items-center gap-2 py-2"
                        onClick={() => fetchValuation(industries[index])}
                        key={index}
                      >
                        <span class="d-inline-block bg-danger rounded-circle p-1"></span>
                        {industries[index]}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? <LoadingSpinner /> : valuationTable}

      <div class="container col-xl-14 col-xxl-14">
        <footer class="py-3 my-4">
          <ul class="nav justify-content-center border-bottom pb-3 mb-3"></ul>
          <p class="text-center text-muted">© 2023 Furkan Kırmızıoğlu</p>
        </footer>
      </div>
    </div>
  );
}

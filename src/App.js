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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const fetchResult = await fetch("http://localhost:8080/industry/list", {
      mode: "cors",
    });
    const response = await fetchResult.json();
    if(response.responseCode === "1") {
      setIndustries(response.data.industryList);
    }       
  };

  const fetchValuation = async (industry) => {
    setValuation(null);
    setSelectedIndustry(industry);
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setIsLoading(true);

    const fetchData = await fetch(`http://localhost:8080/valuation/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: industry,
    });
    const response = await fetchData.json();
    if(response.responseCode === "1") {
      setValuation(response.data.responseDataList);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  const exportToExcel = () => {
    var headers = [
      [
        "Hisse Senedi Kodu",
        "Şirket",
        "Bilanço Dönemi",
        "Fiyat",
        "Fiyat / Kazanç Oranı",
        "Piyasa / Defter Değeri",
        "PEG",
        "FAVÖK Marjı",
        "Net Kâr Marjı",
        "Net Borç / FAVÖK",
        "Değerleme Puanı (100)",
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

  const valuationTable = (
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
            <th className="th">F/K</th>
            <th className="th">PD/DD</th>
            <th className="th">PEG</th>
            <th className="th">FAVÖK Marjı</th>
            <th className="th">Net Kâr Marjı</th>
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
                <td>{value.peg}</td>
                <td>%{value.ebitdaMargin}</td>
                <td>%{value.netProfitMargin}</td>
                <td>{value.netDebtToEbitda}</td>
                <td>
                  <b>{value.finalScore}</b>
                </td>
                <td>{value.suggestion}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="13" style={{ textAlign: "center" }}>
                Seçtiğiniz sektöre ait hisseler ve analiz değerleri burada
                görüntülenecektir.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      {/* HEADER PANEL */}
      <header class="p-3 text-bg-dark">
        <div class="container">
          <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <h4>AlgoAnalyze - Borsa Istanbul Temel Analiz Uygulaması</h4>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* INFORMATION TEXT */}
      <div class="container w-100 p-3">
        <div class="row align-items-center py-5">
          <div class="text-center text-lg-start">
            <h1 class="display-3 fw-bold lh-1 mb-4">
              Yatırım fırsatlarını bulmak
              <br />
              hiç bu kadar kolay olmamıştı!
            </h1>
            <p class="col-lg-8 fs-4">
              Borsa İstanbul'da işlem gören şirketlerin hisselerini 
              saniyeler içinde analiz ediyor ve sonuçları anlaşılır
              bir şekilde önünüze getiriyoruz. Siz de incelemek istediğiniz
              sektörü aşağıdan seçin, borsanın fırsatlarını değerlendirin.
            </p>
          </div>
        </div>
      </div>

      {/* INDUSTRY SCROLLBAR */}
      <div className="list-group w-100 p-3 mb-5">
        <ul className="list-group list-group-horizontal position-relative overflow-auto custom-scrollbar">
          {industries &&
            industries.length > 0 &&
            industries.map((indObj) => (
              <button
                className="custom-button"
                onClick={() => fetchValuation(indObj)}
                key={indObj}
                tabIndex={0}
              >
                {indObj}
              </button>
            ))}
        </ul>
      </div>

      {/* VALUATION RESULT TABLE */}
      {isLoading ? <LoadingSpinner /> : valuationTable}

      {/* FOOTER */}
      <div class="w-100">
        <footer class="py-3 my-4">
          <ul class="nav justify-content-center border-bottom pb-3 mb-3"></ul>
          <p class="text-center text-muted">© Furkan Kırmızıoğlu / 2023</p>
          <p class="mx-auto text-center text-muted" style={{ width: "1000px" }}>
            YASAL UYARI: Burada yer alan yatırım bilgi, yorum ve tavsiyeleri
            yatırım danışmanlığı kapsamında değildir. Yatırım danışmanlığı
            hizmeti, kişilerin risk ve getiri tercihleri dikkate alınarak kişiye
            özel sunulmaktadır. Burada yer alan ve hiçbir şekilde yönlendirici
            nitelikte olmayan içerik, yorum ve tavsiyeler ise genel
            niteliktedir. Bu tavsiyeler mali durumunuz ile risk ve getiri
            tercihlerinize uygun olmayabilir. Bu nedenle, sadece burada yer alan
            bilgilere dayanılarak yatırım kararı verilmesi beklentilerinize
            uygun sonuçlar doğurmayabilir.
          </p>
        </footer>
      </div>
    </div>
  );
}

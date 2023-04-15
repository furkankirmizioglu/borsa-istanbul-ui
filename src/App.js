import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

export default function App() {
  const [industries, setIndustries] = useState();
  const [valuation, setValuation] = useState();

  useEffect(() => {
    document.title = 'AlgoAnalyze'
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/getIndustries", { mode: 'cors' });
      const data = await response.json();
      setIndustries(data);
    };
    fetchData();
  }, []);

  const fetchValuation = async (industry) => {
    const response = await fetch(`http://localhost:8000/valuation?industry=${encodeURIComponent(industry)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": '*',
        },
      }
    );
    const data = await response.json();
    setValuation(data);
  };

  return (
    <div>
      
      <header class="p-3 text-bg-dark">
        <div class="container">
          <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <h4>AlgoAnalyze - Fundamental Analysis Application For Istanbul Stock Exchange</h4>
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
              Various metrics such as PEG Ratio, Price / Book Value and more has scored simultaneously and 
              bringing opportunities of stock market in to your screen.
              You can find the stocks that have the highest chance of profit by choosing a business next to this section.
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
                        onClick={() => fetchValuation(indObj.industry)}
                        key={index}>
                        <span class="d-inline-block bg-danger rounded-circle p-1"></span>
                        {indObj.industry}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div class="container col-xl-14 col-xxl-14">
        <table class="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">Hisse Kodu</th>
              <th scope="col">Şirket</th>
              <th scope="col">Son Bilanço Dönemi</th>
              <th scope="col">Fiyat</th>
              <th scope="col">PD / DD</th>
              <th scope="col">PEG</th>
              <th scope="col">Uzun Vadeli Borç / Özkaynak</th>
              <th scope="col">Değerleme Puanı &#40;100&#41;</th>
              <th scope="col">Tavsiye</th>
            </tr>
          </thead>
          <tbody>
            {valuation &&
              valuation.length > 0 &&
              valuation.map((indObj, index) => (
                <tr>
                  <th scope="row">{indObj[0]}</th>
                  <td>{indObj[1]}</td>
                  <td>{indObj[2]}</td>
                  <td>{indObj[3]}</td>
                  <td>{indObj[4]}</td>
                  <td>{indObj[5]}</td>
                  <td>%{indObj[6]}</td>                  
                  <td>{indObj[7]}</td>
                  <td>{indObj[8]}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div class="container">
        <footer class="py-3 my-4">
          <ul class="nav justify-content-center border-bottom pb-3 mb-3">
          </ul>
          <p class="text-center text-muted">© 2023 Furkan Kırmızıoğlu</p>
        </footer>
      </div>

    </div>
  );
}
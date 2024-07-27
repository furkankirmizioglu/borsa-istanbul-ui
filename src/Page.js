import React from "react";
import { useState } from "react";
import Header from "./components/Header.js";
import Scrollbar from "./components/Scrollbar.js";
import ValuationTable from "./components/ValuationTable.js";
import Footer from "./components/Footer.js";

export default function Page() {
  
  const [valuation, setValuation] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState("");

  return (
    <React.Fragment>
      <Header />
      <Scrollbar
        setSelectedIndustry={setSelectedIndustry}
        setIsLoading={setIsLoading}
        setValuation={setValuation}
      />
      <ValuationTable
        isLoading={isLoading}
        valuation={valuation}
        selectedIndustry={selectedIndustry}
      />
      <Footer />
    </React.Fragment>
  );
}

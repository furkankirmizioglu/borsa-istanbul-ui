import React from "react";
import "../css/Page.css";
import "bootstrap/dist/css/bootstrap.css";
import { useState, useRef, useEffect} from "react";

export default function Scrollbar(props) {

  const ref = useRef(null);
  const{setSelectedIndustry, setValuation, setIsLoading} = props;

  const [industries, setIndustries] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch("http://localhost:8080/industry/list").then(
      (res) => res.json()
    );
    if (response) {
      setIndustries(response);
    }
  };
  
  const fetchValuation = async (industry) => {
    setValuation(null);
    setSelectedIndustry(industry);
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setIsLoading(true);

    const response = await fetch(
      "http://localhost:8080/valuation/list?industry=" + industry
    ).then((res) => res.json());

    if (response) {
      setValuation(response);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  return (
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
  );
}

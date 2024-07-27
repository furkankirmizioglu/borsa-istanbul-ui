import "bootstrap/dist/css/bootstrap.css";

export default function ValuationHeader() {
  return (
    <div>
      <div>
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
      </div>
      <div class="container w-100 p-3">
        <div class="row align-items-center py-5">
          <div class="text-center text-lg-start">
            <h1 class="display-3 fw-bold lh-1 mb-4">
              Yatırım fırsatlarını bulmak
              <br />
              hiç bu kadar kolay olmamıştı!
            </h1>
            <p class="col-lg-8 fs-4">
              Borsa İstanbul'da işlem gören şirketlerin hisselerini saniyeler
              içinde analiz ediyor ve sonuçları anlaşılır bir şekilde önünüze
              getiriyoruz. Siz de incelemek istediğiniz sektörü aşağıdan seçin,
              borsanın fırsatlarını değerlendirin.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

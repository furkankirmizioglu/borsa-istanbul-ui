export default function Table({data}) {
    return (
        <>
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
                <th className="th">Hisse Başı Net Nakit</th>
                <th className="th">Değerleme Puanı</th>
                <th className="th">Tavsiye</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((value) => (
                  <tr>
                    <th scope="row">{data.indexOf(value) + 1}</th>
                    <th>{value.ticker}</th>
                    <td>{value.companyName}</td>
                    <td>{value.latestBalanceSheetTerm}</td>
                    <td>{value.price}</td>
                    <td>{value.pe}</td>
                    <td>{value.pb}</td>
                    <td>{value.evToEbitda}</td>
                    <td>{value.netDebtToEbitda}</td>
                    <td>{value.netCashPerShare}</td>
                    <td>
                      <b>{value.finalScore}</b>
                    </td>
                    <td>{value.suggestion}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" style={{ textAlign: "center" }}>
                    Seçtiğiniz sektöre ait hisseler ve analiz değerleri burada
                    görüntülenecektir.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>


    ) 
}
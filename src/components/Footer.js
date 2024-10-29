import "bootstrap/dist/css/bootstrap.css";

export default function Footer() {
  return (
    <div>
      <footer class="py-3 my-4">
        <ul class="nav justify-content-center border-bottom pb-3 mb-3"></ul>
        <p class="text-center text-muted">© Furkan Kırmızıoğlu / 2024</p>
        <p class="text-center text-muted">
          YASAL UYARI: Burada yer alan yatırım bilgi, yorum ve tavsiyeleri
          yatırım danışmanlığı kapsamında değildir. Yatırım danışmanlığı
          hizmeti, kişilerin risk ve getiri tercihleri dikkate alınarak kişiye
          özel sunulmaktadır. Burada yer alan ve hiçbir şekilde yönlendirici
          nitelikte olmayan içerik, yorum ve tavsiyeler ise genel niteliktedir.
          Bu tavsiyeler mali durumunuz ile risk ve getiri tercihlerinize uygun
          olmayabilir. Bu nedenle, sadece burada yer alan bilgilere dayanılarak
          yatırım kararı verilmesi beklentilerinize uygun sonuçlar
          doğurmayabilir.
          <br />
          <br />
          TEKNİK UYARI: BIST verileri 15 dakika gecikmeli olarak sunulmaktadır.
          Buna paralel olarak oranlarda farklılık görülebilir.
        </p>
      </footer>
    </div>
  );
}

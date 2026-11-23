export type AccentTheme = "emerald" | "teal" | "amber";

export interface PortfolioFeature {
  title: string;
  description: string;
}

export interface PortfolioItem {
  id: "toptanci" | "veteriner" | "fizyoterapi";
  tabLabel: string;
  shortLabel: string;
  badge: string;
  title: string;
  story: string;
  accent: AccentTheme;
  demoUrl: string;
  demoButtonLabel: string;
  /** İsteğe bağlı gerçek ekran görüntüsü yolu (örn: "/demos/toptanci.png"). Boş bırakılırsa canlı interaktif simülatör gösterilir. */
  screenshotUrl?: string;
  solvedProblems: string[];
  keyFeatures: PortfolioFeature[];
  metrics: { label: string; value: string; sub: string }[];
}

export interface InvoiceSampleItem {
  rawText: string;
  matchedProduct: string;
  quantity: string;
  netUnitPrice: number;
  vatRate: number;
  vatIncludedUnitCost: number;
  lineTotal: number;
  stockStatus: "Eşleşti" | "Yeni Kart";
}

export interface InvoiceSample {
  id: string;
  label: string;
  supplier: string;
  taxNo: string;
  invoiceNo: string;
  invoiceDate: string;
  confidence: string;
  durationSec: string;
  items: InvoiceSampleItem[];
}

export const siteConfig = {
  brandName: "y&n Software Solutions",
  brandTagline: "İşletmenize Özel Yapay Zeka Destekli ERP & Klinik Sistemleri",
  logoPath: "/logo.png",
  aiBadge: "Google Gemini 2.5 AI Destekli Yeni Nesil İşletme Sistemleri",
  heroTitle:
    "Defteri, Karmaşık Excel'leri ve Saatler Süren Fatura Girişini Tarihe Gömdük.",
  heroSubtitle:
    "Toptancılardan veteriner kliniklerine, fizyoterapi merkezlerinden yerel işletmelere kadar; işinize özel kurgulanan, telefonunuzdan tek tıkla yönetilen yapay zeka destekli ERP ve Klinik Yönetim Sistemleri.",
  contact: {
    phoneDisplay: "+90 532 000 00 00",
    phoneRaw: "+905320000000",
    /** Başında + olmadan ülke kodu ile WhatsApp numarası (örn: 905321234567) */
    whatsappNumber: "905320000000",
    whatsappDefaultMessage:
      "Merhaba y&n Software Solutions! İşletmemiz için yapay zeka destekli özel ERP / Klinik sistemi hakkında canlı demo ve bilgi almak istiyorum.",
    email: "info@ynsoftwaresolutions.com",
    location: "İstanbul & Tüm Türkiye Uzaktan Kurulum",
    workingHours: "Pzt - Cmt: 09:00 - 20:00",
  },
  navLinks: [
    { label: "Çözümlerimiz", href: "#cozumler" },
    { label: "Örnek Sistemler", href: "#vitrin" },
    { label: "Yapay Zeka", href: "#yapay-zeka" },
    { label: "Neden Biz?", href: "#neden-biz" },
    { label: "S.S.S.", href: "#sss" },
  ],

  portfolioData: [
    {
      id: "toptanci",
      tabLabel: "Toptancı & Gıda Dağıtım ERP",
      shortLabel: "Toptancı ERP",
      badge: "Yumurta, İçecek & Gıda Dağıtım",
      title: "Toptancı & Gıda Dağıtım ERP Sistemi",
      story:
        "Günlük değişen alış maliyetleri, müşteriye özel fiyatlar, veresiye takibi ve e-Arşiv faturalar tek ekranda.",
      accent: "emerald",
      demoUrl: "#iletisim",
      demoButtonLabel: "Toptancı ERP Canlı Demosunu İste",
      screenshotUrl: undefined,
      solvedProblems: [
        "Her gün değişen alış fiyatlarında gerçek kârı görememe sorunu",
        "Kalem kalem e-Arşiv alış faturası girerken kaybedilen saatler",
        "İşletme kasasıyla şahsi harcamaların birbirine karışması",
      ],
      keyFeatures: [
        {
          title: "Yapay Zeka Fatura Okuma",
          description:
            "Toptancıdan gelen PDF/HTML veya kamera fotoğrafı faturayı 3 saniyede KDV dahil birim maliyetleriyle stoka işler.",
        },
        {
          title: "Ağırlıklı Ortalama Maliyet Motoru",
          description:
            "Geçmiş tarihli fatura girilse bile tüm satışların net kârını kuruşu kuruşuna yeniden hesaplar.",
        },
        {
          title: "Cebimdeki Para & Emanet/Şahsi Borç Takibi",
          description:
            "İşletme giderleriyle şahsi harcamaları ayırır, kasadaki gerçek nakdi anlık olarak gösterir.",
        },
      ],
      metrics: [
        { label: "Fatura İşleme Süresi", value: "2.4 sn", sub: "18 kalem ortalama" },
        { label: "Maliyet Doğruluğu", value: "%100", sub: "Otomatik ağırlıklı ort." },
        { label: "Günlük Zaman Kazancı", value: "2.5 Saat", sub: "Sıfır manuel giriş" },
      ],
    },
    {
      id: "veteriner",
      tabLabel: "Veteriner Kliniği & Ecza ERP",
      shortLabel: "Veteriner ERP",
      badge: "Pet Klinik & Büyükbaş Çiftlik",
      title: "Veteriner Kliniği & Ecza / Petshop ERP",
      story:
        "Hem evcil hayvan klinikleri hem de büyükbaş/çiftlik veterinerleri için hasta karnesi, aşı takvimi ve veresiye ilaç yönetimi.",
      accent: "teal",
      demoUrl: "#iletisim",
      demoButtonLabel: "Veteriner ERP Canlı Demosunu İste",
      screenshotUrl: undefined,
      solvedProblems: [
        "Aşısı gelen hastaların defterde unutulup takip edilememesi",
        "Çiftliklere verilen veresiye ilaç ve tohumlama alacaklarının karışması",
        "Ecza deposu faturalarındaki son kullanma tarihi ve kritik stok kaçakları",
      ],
      keyFeatures: [
        {
          title: "Otomatik Aşı Takvimi + WhatsApp Hatırlatma",
          description:
            "Aşısı veya parazit uygulaması gelen hasta sahibine tek tıkla kişiselleştirilmiş hazır WhatsApp mesajı gönderir.",
        },
        {
          title: "Küpe / Mikroçip No ile Hasta Karnesi",
          description:
            "Hayvanın geçmiş tüm muayene, teşhis, gebelik ve uygulanan ilaç geçmişine saniyeler içinde ulaşın.",
        },
        {
          title: "Ecza Deposu AI Fatura Tarama & Kritik Stok",
          description:
            "Depodan gelen ilaç/mama faturalarını kamerayla okur, azalan aşı ve ilaçları önceden haber verir.",
        },
      ],
      metrics: [
        { label: "Aşı Geri Dönüş Oranı", value: "+%42", sub: "WhatsApp hatırlatma ile" },
        { label: "Ecza Stok Takibi", value: "Anlık", sub: "Kritik seviye uyarısı" },
        { label: "Hasta Karnesi Erişim", value: "1 Tık", sub: "Küpe & Mikroçip arama" },
      ],
    },
    {
      id: "fizyoterapi",
      tabLabel: "Fizyoterapi & Klinik Pilates",
      shortLabel: "Fizyoterapi & Klinik",
      badge: "Seans, Paket & VAS Ağrı Takibi",
      title: "Fizyoterapi & Klinik Pilates Yönetim Sistemi",
      story:
        "10'lu paket alan danışanların kaçıncı seansta olduğunu, kalan taksitlerini ve ağrı gelişimini sıfır hatayla yönetin.",
      accent: "amber",
      demoUrl: "#iletisim",
      demoButtonLabel: "Fizyoterapi Sistemi Demosunu İste",
      screenshotUrl: undefined,
      solvedProblems: [
        "10'lu veya 12'li paketlerde kimin kaç seansı kaldığının karışması",
        "Elden taksit ödeyen danışanların kalan borçlarının takip edilememesi",
        "Danışana tedavi sürecindeki iyileşmeyi somut verilerle gösterememe",
      ],
      keyFeatures: [
        {
          title: "Akıllı Paket & Kalan Seans Sayacı",
          description:
            "\"Seansa Geldi\" butonuna basıldığı anda paketten otomatik 1 seans düşer, son 2 seansı kalanları yenileme için uyarır.",
        },
        {
          title: "VAS Ağrı Skoru (0-10) Gelişim Karnesi",
          description:
            "Danışanın ilk geliş ağrısı (8/10) ile güncel ağrısını (2/10) karşılaştırarak klinik başarınızı görselleştirir.",
        },
        {
          title: "Elden Taksit & Günlük Randevu Ajandası",
          description:
            "Paket ücretini parça parça ödeyen danışanların bakiye takibi ve tek tıkla WhatsApp randevu hatırlatma.",
        },
      ],
      metrics: [
        { label: "Paket Yenileme Artışı", value: "+%35", sub: "Son 2 seans uyarısıyla" },
        { label: "Randevu İptal Azalışı", value: "-%60", sub: "Otomatik hatırlatma" },
        { label: "Kasa & Taksit Hatası", value: "0", sub: "Tam otomatik cari" },
      ],
    },
  ] as PortfolioItem[],

  aiInvoiceSamples: [
    {
      id: "toptanci-fatura",
      label: "Toptancı Gıda Faturası",
      supplier: "ANADOLU KÜMES & GIDA DAĞITIM A.Ş.",
      taxNo: "VKN: 0680419283 • Vergi Dairesi: Başkent",
      invoiceNo: "GIB2026000048192",
      invoiceDate: "23.11.2026",
      confidence: "%99.6",
      durationSec: "1.42 sn",
      items: [
        {
          rawText: "L BOY GEZEN TAVUK YUMURTA 30'LU VİYOL",
          matchedProduct: "L Boy Yumurta (30'lu Viyol)",
          quantity: "120 Viyol",
          netUnitPrice: 138.61,
          vatRate: 1,
          vatIncludedUnitCost: 140.0,
          lineTotal: 16800.0,
          stockStatus: "Eşleşti",
        },
        {
          rawText: "M BOY KAFES YUMURTA 15'Lİ PAKET",
          matchedProduct: "M Boy Yumurta (15'li Paket)",
          quantity: "80 Paket",
          netUnitPrice: 64.36,
          vatRate: 1,
          vatIncludedUnitCost: 65.0,
          lineTotal: 5200.0,
          stockStatus: "Eşleşti",
        },
        {
          rawText: "SADE MADEN SUYU 24X200ML KASA",
          matchedProduct: "Doğal Maden Suyu (24'lü Kasa)",
          quantity: "45 Kasa",
          netUnitPrice: 118.18,
          vatRate: 10,
          vatIncludedUnitCost: 130.0,
          lineTotal: 5850.0,
          stockStatus: "Eşleşti",
        },
        {
          rawText: "SOĞUK ÇAY ŞEFTALİ 12X1L KOLİ",
          matchedProduct: "Soğuk Çay Şeftali 1L (12'li)",
          quantity: "30 Koli",
          netUnitPrice: 286.36,
          vatRate: 10,
          vatIncludedUnitCost: 315.0,
          lineTotal: 9450.0,
          stockStatus: "Yeni Kart",
        },
      ],
    },
    {
      id: "veteriner-fatura",
      label: "Veteriner Ecza Deposu",
      supplier: "MEDİVET ECZA DEPOSU VE BİYOLOJİK ÜRÜNLER LTD.",
      taxNo: "VKN: 6140928371 • Vergi Dairesi: Selçuk",
      invoiceNo: "MDV2026000019405",
      invoiceDate: "23.11.2026",
      confidence: "%99.3",
      durationSec: "1.38 sn",
      items: [
        {
          rawText: "KÖPEK KARMA AŞI DHPPi+L 10 DOZ FLAKON",
          matchedProduct: "Köpek Karma Aşı (DHPPi+L)",
          quantity: "20 Doz",
          netUnitPrice: 218.18,
          vatRate: 10,
          vatIncludedUnitCost: 240.0,
          lineTotal: 4800.0,
          stockStatus: "Eşleşti",
        },
        {
          rawText: "KEDİ İÇ-DIŞ PARAZİT DAMLA 4-8KG 3'LÜ",
          matchedProduct: "Kedi Broadline Damla (4-8kg)",
          quantity: "15 Kutu",
          netUnitPrice: 381.82,
          vatRate: 10,
          vatIncludedUnitCost: 420.0,
          lineTotal: 6300.0,
          stockStatus: "Eşleşti",
        },
        {
          rawText: "BÜYÜKBAŞ ANTİBİYOTİK ENJ. 100ML",
          matchedProduct: "Oksitetrasiklin 100ml Enj.",
          quantity: "24 Şişe",
          netUnitPrice: 168.18,
          vatRate: 10,
          vatIncludedUnitCost: 185.0,
          lineTotal: 4440.0,
          stockStatus: "Eşleşti",
        },
        {
          rawText: "KISIRLAŞTIRILMIŞ KEDİ MAMASI SOMONLU 10KG",
          matchedProduct: "Sterilised Somonlu Mama 10kg",
          quantity: "6 Çuval",
          netUnitPrice: 1583.33,
          vatRate: 20,
          vatIncludedUnitCost: 1900.0,
          lineTotal: 11400.0,
          stockStatus: "Yeni Kart",
        },
      ],
    },
  ] as InvoiceSample[],

  whyUsFeatures: [
    {
      id: "simplicity",
      title: "Sıfır Eğitim Gerektiren Sadeliği",
      description:
        "Muhasebeci olmanıza gerek yok; akıllı telefon kullanabilen herkes 5 dakikada öğrenir ve ilk günden kullanmaya başlar.",
      badge: "5 Dk Kurulum",
      span: "lg:col-span-3",
    },
    {
      id: "cloud-backup",
      title: "Bulut Altyapı + Tek Tıkla Yedekleme",
      description:
        "Bilgisayarınız bozulsa veya telefonunuz kaybolsa bile verileriniz Avrupa sunucularında güvende; üstelik tek tıkla kendi cihazınıza yedek indirin.",
      badge: "AWS / EU Güvenlik",
      span: "lg:col-span-3",
    },
    {
      id: "multi-device",
      title: "Telefon, Tablet ve Bilgisayarda Kusursuz",
      description:
        "Sahada, depoda, klinikte veya evde cep telefonunuzdan fatura fotoğrafı çekip anında stoka ve cariye işleyin.",
      badge: "Mobil Öncelikli",
      span: "lg:col-span-2",
    },
    {
      id: "tailor-made",
      title: "İşletmenize Özel Terzi İşi Uyarlama",
      description:
        "Kullanmadığınız yüzlerce karmaşık menü yok; sadece sizin iş akışınıza, sektörünüze ve terminolojinize özel modüller.",
      badge: "%100 Özelleştirme",
      span: "lg:col-span-2",
    },
    {
      id: "data-safety",
      title: "Veri Kaybı Korumalı Mimari",
      description:
        "Yanlışlıkla bir ürün veya kart silinse bile geçmiş fatura, stok hareketi ve müşteri cari bakiyeleriniz asla bozulmaz.",
      badge: "Korumalı Veritabanı",
      span: "lg:col-span-2",
    },
    {
      id: "transparent-pricing",
      title: "Yıllık Fahiş Lisans Dayatması Yok",
      description:
        "Her yıl sürpriz zamlar ve zorunlu yenileme tuzakları olmadan; şeffaf kurulum, net bakım ve doğrudan mühendis desteği.",
      badge: "Şeffaf Model",
      span: "lg:col-span-6",
    },
  ],

  comparisonData: {
    oldWayTitle: "Eski Düzen",
    oldWaySubtitle: "Veresiye Defteri / Excel / Karmaşık Muhasebe Programı",
    oldWayItems: [
      "Tek bir alış faturasını kalem kalem girmek 20 dakika sürer",
      "Kimin kaç seansı, hangi aşısı veya ne kadar veresiyesi kaldı karışır",
      "Geçmiş tarihli fatura gelince ortalama maliyet ve gerçek kâr yanlış hesaplanır",
      "Bilgisayar veya telefon bozulursa yılların müşteri ve borç kayıtları silinir",
      "Şahsi harcamalarla dükkan kasası karışır, ay sonunda net kâr bilinmez",
      "Kullanılmayan 200 menü arasında kaybolursunuz, personel öğrenemez",
    ],
    newWayTitle: "y&n Software Solutions Sistemi",
    newWaySubtitle: "Yapay Zeka Destekli, İşinize Özel Bulut ERP & Klinik Paneli",
    newWayItems: [
      "Kamera veya PDF ile 3 saniyede 20+ kalem fatura KDV dahil stoka işlenir",
      "Tek tıkla WhatsApp aşı/randevu hatırlatma ve güncel cari hesap ekstresi",
      "Ağırlıklı ortalama maliyet motoru ile kuruşu kuruşuna gerçek kâr ve net kasa",
      "Avrupa bulut sunucularında günlük otomatik yedek + tek tıkla cihazınıza indirme",
      "\"Cebimdeki Para\" ekranı ile işletme kasası ve şahsi/emanet kartlar net ayrılır",
      "Sadece sizin işinize özel tertemiz ekranlar; ilk günden sıfır eğitimle kullanım",
    ],
  },

  sectorsData: [
    {
      name: "Oto Servis & Yedek Parça",
      desc: "Plaka bazlı servis geçmişi, parça stok ve usta işçilik takibi.",
      tag: "Plaka & Bakım",
    },
    {
      name: "Zirai İlaç & Gübre Bayisi",
      desc: "Sezonluk harman vadeli çiftçi carisi ve AI fatura stok girişi.",
      tag: "Vadeli Cari",
    },
    {
      name: "İnşaat Malzemeleri & Nalbur",
      desc: "Şantiye bazlı sevkiyat, palet/metre birim dönüşümü ve kasa.",
      tag: "Şantiye Takibi",
    },
    {
      name: "Diş Kliniği & Estetik Merkezi",
      desc: "Tedavi planı, çoklu taksit, seans sayacı ve WhatsApp randevu.",
      tag: "Klinik & Seans",
    },
    {
      name: "Toptan Tekstil & Gıda",
      desc: "Müşteriye özel fiyat listesi, seri/koli takibi ve anlık kâr.",
      tag: "B2B Dağıtım",
    },
    {
      name: "Medikal, Optik & Eczane",
      desc: "Lot/SKT takibi, kritik stok uyarısı ve hızlı barkod/kamera girişi.",
      tag: "SKT & Stok",
    },
  ],

  faqItems: [
    {
      q: "Verilerim gerçekten güvende mi? Bilgisayarım bozulursa ne olur?",
      a: "Tüm verileriniz şifreli bağlantılarla yüksek güvenlikli Avrupa bulut sunucularında barındırılır ve her gün otomatik yedeklenir. Bilgisayarınız veya telefonunuz bozulsa bile yeni bir cihazdan şifrenizle giriş yaparak kaldığınız yerden devam edersiniz. Ayrıca dilediğiniz an tek tıkla tüm verilerinizi Excel/yedek dosyası olarak kendi cihazınıza indirebilirsiniz.",
    },
    {
      q: "Cep telefonundan veya tabletten rahatça kullanabilir miyim?",
      a: "Evet! Sistemlerimiz ilk günden itibaren mobil öncelikli (mobile-first) olarak tasarlanır. Depoda gezerken, sahada araçtayken veya muayene odasındayken telefon kamerasıyla fatura okutabilir, cari tahsilat girebilir ve tek tıkla WhatsApp mesajı gönderebilirsiniz.",
    },
    {
      q: "Mevcut Excel listelerim veya eski programımdaki veriler aktarılır mı?",
      a: "Kesinlikle. Mevcut müşteri listenizi, ürün kataloğunuzu, açılış cari bakiyelerinizi ve stok miktarlarınızı kurulum aşamasında ekibimiz sizin için eksiksiz şekilde yeni sisteme aktarır. Sıfırdan tek tek veri girmenize gerek kalmaz.",
    },
    {
      q: "İnternetim kesilirse işlerim durur mu?",
      a: "Sistemimiz çok düşük veri tükettiği için iş yerinizde internet kesildiğinde cep telefonunuzun mobil verisi üzerinden saniyeler içinde çalışmaya devam edebilirsiniz. Kurulum sonrası ekibimiz kesintisiz çalışma akışınızı da sizinle birlikte test eder.",
    },
    {
      q: "Fiyatlandırma nasıl? Her yıl fahiş lisans yenileme ücreti var mı?",
      a: "Büyük ERP firmalarının aksine sürpriz kullanıcı başı ücretler veya yıllık fahiş lisans dayatmaları yapmıyoruz. İşletmenizin ihtiyaç duyduğu modüllere göre tek seferlik şeffaf kurulum bedeli ve çok makul bulut/destek modeliyle çalışıyoruz. 15 dakikalık canlı demo sonrasında net teklifimizi aynı gün iletiyoruz.",
    },
  ],
} as const;

export function buildWhatsAppUrl(customMessage?: string): string {
  const message = customMessage ?? siteConfig.contact.whatsappDefaultMessage;
  return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
}

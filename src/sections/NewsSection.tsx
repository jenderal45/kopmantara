import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRight, 
  ExternalLink, 
  Calendar, 
  BookOpen, 
  Sparkles, 
  X, 
  Share2, 
  Check, 
  Building2, 
  ShieldCheck 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface NewsArticle {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  categoryType: 'media' | 'edukasi';
  sourceName: string;
  date: string;
  image: string;
  summary: string;
  fullContent: string;
  externalUrl?: string;
  keyPoints?: string[];
}

const newsArticles: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Kopmantara Lakukan Audiensi dengan Kemenkop RI',
    category: 'Audiensi & Regulasi',
    categoryColor: 'bg-forest text-white',
    categoryType: 'media',
    sourceName: 'Jurnal Realitas',
    date: '12 Februari 2026',
    image: '/assets/img-4.jpg',
    summary: 'KOPMANTARA menggelar audiensi resmi bersama Kementerian Koperasi dan UKM RI guna memaparkan roadmap penguatan koperasi multi pihak dan ekosistem pengusaha muda.',
    fullContent: 'Koperasi Pengusaha Muda Mandiri Nusantara (KOPMANTARA) melakukan kunjungan audiensi resmi dengan jajaran pejabat Kementerian Koperasi dan UKM Republik Indonesia (Kemenkop RI). Pertemuan strategis ini berfokus pada pembahasan roadmap penguatan kelembagaan koperasi multi pihak, akselerasi legalitas badan usaha anggota, serta perluasan akses pembiayaan produktif bagi pelaku UMKM muda di seluruh Indonesia.\n\nPihak Kemenkop RI memberikan apresiasi tinggi terhadap visi KOPMANTARA yang mengedepankan digitalisasi layanan anggota serta kolaborasi lintas sektor dalam membangkitkan ekonomi kerakyatan modern.',
    externalUrl: 'https://www.jurnalrealitas.com/kopmantara-lakukan-audiensi-dengan-kemenkop-ri/',
    keyPoints: [
      'Pemaparan roadmap kelembagaan koperasi multi pihak',
      'Penyelarasan regulasi permodalan dan perlindungan UMKM',
      'Sinergi program pendampingan wirausaha muda di tingkat nasional'
    ]
  },
  {
    id: 'news-2',
    title: 'Harapan Kolaborasi dengan Danantara, Kopmantara Perkuat Ekosistem Usaha Pengusaha Muda',
    category: 'Kolaborasi Strategis',
    categoryColor: 'bg-gold text-forest',
    categoryType: 'media',
    sourceName: 'Suara UMKM',
    date: '7 Februari 2026',
    image: '/assets/img-6.jpg',
    summary: 'Memperluas akses pendanaan dan scale-up bisnis bagi wirausaha muda nasional, KOPMANTARA menjajaki peluang kolaborasi strategis dengan Danantara.',
    fullContent: 'Dalam upaya memperkuat kapasitas pendanaan dan percepatan scale-up bisnis pengusaha muda Indonesia, KOPMANTARA menyambut antusias kehadiran Badan Pengelola Investasi Danantara. Peluang kolaborasi ini difokuskan pada pembentukan ekosistem pembiayaan terpadu dan kemitraan investasi bagi usaha-usaha produktif yang digerakkan oleh anggota koperasi.\n\nLangkah ini ditargetkan mampu menciptakan ribuan wirausaha muda mandiri yang berdaya saing tinggi serta mampu membuka lapangan kerja baru di berbagai daerah.',
    externalUrl: 'https://suaraumkm.com/2026/02/07/harapan-kolaborasi-dengan-danantara-kopmantara-perkuat-ekosistem-usaha-pengusaha-muda/',
    keyPoints: [
      'Jajaki sinergi investasi produktif dengan Danantara',
      'Fasilitasi scale-up bisnis anggota pengusaha muda',
      'Pengembangan inkubasi usaha berbasis koperasi multi pihak'
    ]
  },
  {
    id: 'news-3',
    title: 'Kemenkop RI Terima Audiensi Kopmantara: Dukung Penguatan Koperasi Modern Multi Pihak',
    category: 'Kemitraan Pemerintah',
    categoryColor: 'bg-emerald text-white',
    categoryType: 'media',
    sourceName: 'Jelajah Perkara',
    date: '14 Februari 2026',
    image: '/assets/img-1.jpg',
    summary: 'Kemenkop RI menyambut delegasi KOPMANTARA, menegaskan dukungan penuh terhadap penerapan model koperasi multi pihak berorientasi teknologi.',
    fullContent: 'Kementerian Koperasi RI secara resmi menyambut audiensi delegasi pengurus KOPMANTARA. Dialog konstruktif ini menegaskan komitmen pemerintah untuk terus mendampingi dan memfasilitasi koperasi-koperasi generasi baru yang mengadopsi model multi pihak.\n\nKemenkop RI menilai model KOPMANTARA sangat relevan dalam menyatukan berbagai pemangku kepentingan—mulai dari pemilik modal, praktisi usaha, profesional, hingga komunitas konsumen—dalam satu payung kelembagaan yang transparan dan akuntabel.',
    externalUrl: 'https://jelajahperkara2.com/kemenkop-ri-terima-audiensi-kopmantara/',
    keyPoints: [
      'Dukungan legalitas dan pembinaan koperasi multi pihak',
      'Penerapan Good Cooperative Governance terstandar',
      'Integrasi program kementerian dengan layanan anggota KOPMANTARA'
    ]
  },
  {
    id: 'news-4',
    title: 'Wiranesia Foundation Penuhi Undangan Audiensi Wali Kota Jakarta Utara Bahas Akselerasi Kolaborasi UMKM Menuju Digitalisasi',
    category: 'Digitalisasi UMKM',
    categoryColor: 'bg-forest text-white',
    categoryType: 'media',
    sourceName: 'Suara UMKM',
    date: '5 Agustus 2025',
    image: '/assets/img-3.jpg',
    summary: 'Wiranesia Foundation bersama ekosistem KOPMANTARA merumuskan langkah akselerasi digitalisasi dan kurasi produk UMKM di Jakarta Utara.',
    fullContent: 'Wiranesia Foundation bersama jajaran penggerak ekosistem KOPMANTARA memenuhi undangan audiensi Wali Kota Administrasi Jakarta Utara. Pertemuan ini membahas kolaborasi terstruktur dalam mengakselerasi transformasi digital ratusan pelaku UMKM lokal.\n\nFokus utama program meliputi pelatihan pemasaran daring, kurasi produk ekspor, sertifikasi izin usaha, serta penyediaan fasilitas pembiayaan mikro koperasi untuk mendorong kemandirian pelaku usaha mikro dan kecil.',
    externalUrl: 'https://suaraumkm.com/2025/08/05/wiranesia-foundation-penuhi-undangan-audiensi-wali-kota-jakarta-utara-bahas-akselerasi-utuk-kolaborasi-umkm-menuju-digitalisasi/',
    keyPoints: [
      'Pelatihan dan kurasi onboarding UMKM digital',
      'Dukungan sertifikasi usaha dan fasilitasi legalitas',
      'Sinergi pemerintah kota dengan koperasi untuk pemberdayaan ekonomi'
    ]
  },
  {
    id: 'news-5',
    title: 'Sinergi Tanpa Batas: Women Lawyer Club Hadiri Undangan Buka Puasa Bersama Kopmantara',
    category: 'Sinergi & Advokasi',
    categoryColor: 'bg-sage text-white',
    categoryType: 'media',
    sourceName: 'Kampus Cyber Widyo',
    date: '10 Maret 2026',
    image: '/assets/img-5.jpg',
    summary: 'Women Lawyer Club dan KOPMANTARA pererat silaturahmi sekaligus inisiasi kerjasama bantuan hukum dan perlindungan bisnis bagi wirausaha wanita.',
    fullContent: 'Dalam semangat persaudaraan bulan Ramadhan, Women Lawyer Club menghadiri undangan buka puasa bersama yang diselenggarakan oleh KOPMANTARA Group. Acara ini menjadi panggung sinergi strategis untuk memperkuat advokasi dan pendampingan hukum bagi para pelaku usaha, khususnya kelompok wirausaha perempuan.\n\nKerjasama ini mencakup konsultasi perlindungan hak kekayaan intelektual (HAKI), perjanjian kemitraan bisnis, serta edukasi kepatuhan hukum bagi anggota koperasi.',
    externalUrl: 'https://kampuscyberwidyo.wordpress.com/2026/03/10/sinergi-tanpa-batas-women-lawyer-club-hadiri-undangan-buka-puasa-bersama-kopmantara/',
    keyPoints: [
      'Pendampingan hukum dan legalitas bagi UMKM wanita',
      'Edukasi perlindungan HAKI dan kontrak bisnis',
      'Penguatan jejaring profesional perempuan wirausaha'
    ]
  },
  {
    id: 'news-6',
    title: 'Pengertian Koperasi dan Peranannya sebagai Soko Guru Perekonomian Indonesia',
    category: 'Literasi Koperasi',
    categoryColor: 'bg-emerald text-white',
    categoryType: 'edukasi',
    sourceName: 'Edukasi KOPMANTARA',
    date: '28 Februari 2026',
    image: '/assets/img-2.jpg',
    summary: 'Menelusuri sejarah, definisi yuridis menurut UU No. 25/1992, dan cita-cita Bung Hatta menempatkan koperasi sebagai tulang punggung demokrasi ekonomi.',
    fullContent: 'Koperasi merupakan badan usaha yang beranggotakan orang-seorang atau badan hukum koperasi dengan melandaskan kegiatannya berdasarkan prinsip koperasi sekaligus sebagai gerakan ekonomi rakyat yang berdasar atas asas kekeluargaan (Pasal 1 UU No. 25 Tahun 1992).\n\nDrs. Mohammad Hatta (Bapak Koperasi Indonesia) menekankan bahwa koperasi adalah soko guru perekonomian nasional yang menempatkan manusia di atas modal. Koperasi didirikan bukan untuk mengejar keuntungan segelintir pemodal, melainkan untuk melayani dan mensejahterakan seluruh anggotanya secara gotong royong dan berkeadilan sosial.',
    keyPoints: [
      'Berdasarkan Pasal 33 UUD 1945 dan UU No. 25/1992',
      'Mengutamakan kemakmuran bersama di atas kepentingan individu',
      'Beroperasi dengan prinsip demokrasi: Satu Anggota Satu Suara'
    ]
  },
  {
    id: 'news-7',
    title: 'Mengenal Jenis-Jenis Koperasi di Indonesia: Dari Simpan Pinjam hingga Koperasi Multi Pihak',
    category: 'Jenis Koperasi',
    categoryColor: 'bg-gold text-forest',
    categoryType: 'edukasi',
    sourceName: 'Panduan Koperasi',
    date: '22 Februari 2026',
    image: '/assets/img-4.jpg',
    summary: 'Panduan komprehensif memahami model bisnis 5 jenis koperasi konvensional serta inovasi Koperasi Multi Pihak (KMP) modern.',
    fullContent: 'Di Indonesia, koperasi diklasifikasikan ke dalam beberapa bentuk utama sesuai dengan fokus aktivitas usahanya:\n\n1. Koperasi Simpan Pinjam (KSP): Menghimpun simpanan dan menyalurkan pinjaman produktif bagi anggota.\n2. Koperasi Konsumen: Menyediakan barang-barang kebutuhan pokok dan perlengkapan usaha dengan harga kompetitif.\n3. Koperasi Produsen: Membantu pengadaan bahan baku, proses produksi, dan standardisasi produk anggota produsen.\n4. Koperasi Pemasaran: Menangani distribusi, branding, dan pemasaran produk anggota ke pasar yang lebih luas.\n5. Koperasi Jasa: Menyediakan berbagai layanan non-keuangan seperti transportasi, logistik, dan konsultasi bisnis.\n6. Koperasi Multi Pihak (KMP): Bentuk modern yang mewadahi berbagai kelompok kepentingan (pendiri, investor, pekerja, dan konsumen) dalam satu entitas badan usaha.',
    keyPoints: [
      'KSP, Konsumen, Produsen, Pemasaran, dan Jasa',
      'Inovasi Koperasi Multi Pihak berdasarkan Permenkop No. 8/2021',
      'Fleksibilitas model usaha sesuai kebutuhan anggota'
    ]
  },
  {
    id: 'news-8',
    title: 'Pentingnya Transformasi Digital dan Tata Kelola Koperasi Modern di Era Industri 4.0',
    category: 'Transformasi Digital',
    categoryColor: 'bg-forest text-white',
    categoryType: 'edukasi',
    sourceName: 'Inovasi & Tata Kelola',
    date: '18 Februari 2026',
    image: '/assets/img-3.jpg',
    summary: 'Implementasi portal anggota digital (member.kopmantara.co.id) dan sistem pencatatan real-time meningkatkan transparansi serta kecepatan layanan.',
    fullContent: 'Transformasi digital pada institusi koperasi menjadi kunci utama dalam meraih kepercayaan generasi muda. KOPMANTARA memelopori integrasi teknologi informasi melalui portal anggota (member.kopmantara.co.id), memungkinkan anggota memantau simpanan pokok, simpanan wajib, pengajuan pembiayaan, hingga pembagian SHU secara transparan.\n\nGood Cooperative Governance yang didukung sistem digital memastikan setiap keputusan keuangan tercatat secara akurat, auditable, dan dapat dipertanggungjawabkan kapan pun.',
    keyPoints: [
      'Akses mandiri anggota melalui portal terintegrasi',
      'Transparansi pembukuan dan kalkulasi SHU real-time',
      'Proses pengajuan dan verifikasi pinjaman lebih cepat & aman'
    ]
  },
  {
    id: 'news-9',
    title: 'Manfaat Nyata Menjadi Anggota Koperasi: Dari SHU Hingga Akses Ekosistem Usaha Mandiri',
    category: 'Manfaat Anggota',
    categoryColor: 'bg-sage text-white',
    categoryType: 'edukasi',
    sourceName: 'Literasi Keuangan',
    date: '15 Februari 2026',
    image: '/assets/img-5.jpg',
    summary: 'Posisi ganda anggota sebagai pemilik sekaligus pengguna layanan memberikan imbal hasil adil, proteksi usaha, dan jejaring komunitas luas.',
    fullContent: 'Menjadi anggota koperasi memberikan status unik: Anda adalah pemilik (owner) sekaligus pengguna (user) dari badan usaha tersebut. Berbagai manfaat yang diperoleh antara lain:\n\n- Sisa Hasil Usaha (SHU): Pembagian keuntungan tahunan yang proporsional dengan aktivitas transaksi dan permodalan.\n- Akses Permodalan Adil: Fasilitas pinjaman tanpa syarat memberatkan dan bunga yang dikelola secara kekeluargaan.\n- Pendampingan & Inkubasi Bisnis: Pelatihan terstruktur, kurasi produk, hingga perluasan akses pasar.\n- Perlindungan & Solidaritas: Jaring pengaman sosial dan kemitraan gotong royong antar sesama pengusaha.',
    keyPoints: [
      'Hak suara yang setara dalam Rapat Anggota Tahunan (RAT)',
      'SHU yang dibagikan secara transparan dan adil',
      'Jejaring bisnis dan pembinaan kewirausahaan berkelanjutan'
    ]
  },
  {
    id: 'news-10',
    title: '7 Prinsip Pokok Koperasi Dunia Berdasarkan UU No. 25/1992 dan Nilai Universal ICA',
    category: 'Prinsip Koperasi',
    categoryColor: 'bg-emerald text-white',
    categoryType: 'edukasi',
    sourceName: 'Nilai & Filosofi',
    date: '10 Februari 2026',
    image: '/assets/img-1.jpg',
    summary: 'Mengenal 7 pilar etika gerakan koperasi internasional yang menjamin kedaulatan anggota dan kemandirian usaha bersama.',
    fullContent: 'Koperasi di seluruh dunia, termasuk di Indonesia sesuai UU No. 25/1992 dan panduan International Co-operative Alliance (ICA), wajib berpegang teguh pada 7 prinsip pokok:\n\n1. Keanggotaan Sukarela dan Terbuka tanpa diskriminasi gender, sosial, ras, atau agama.\n2. Pengendalian oleh Anggota Secara Demokratis melalui sistem satu orang satu suara.\n3. Partisipasi Ekonomi Anggota di mana modal dikontribusikan secara adil.\n4. Otonomi dan Kemandirian dalam mengelola badan usaha.\n5. Pendidikan, Pelatihan, dan Informasi bagi anggota, pengurus, dan masyarakat umum.\n6. Kerjasama Antar Koperasi di tingkat lokal, nasional, dan global.\n7. Kepedulian Terhadap Komunitas dan pembangunan berkelanjutan lingkungan sekitar.',
    keyPoints: [
      'Keanggotaan sukarela dan pengelolaan demokratis',
      'Partisipasi modal dan balas jasa yang adil',
      'Kepedulian nyata terhadap komunitas dan lingkungan sekitar'
    ]
  },
];

export default function NewsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'media' | 'edukasi'>('all');
  const [activeModalArticle, setActiveModalArticle] = useState<NewsArticle | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const filteredNews = newsArticles.filter((item) => {
    if (selectedFilter === 'all') return true;
    return item.categoryType === selectedFilter;
  });

  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards) return;

    gsap.fromTo(
      cards.children,
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
      }
    );
  }, [selectedFilter]);

  const handleShare = (article: NewsArticle) => {
    const shareUrl = article.externalUrl || window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${article.title} - ${shareUrl}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="berita"
      className="relative bg-stone-50/70 border-t border-b border-stone-200/50"
      style={{ padding: 'clamp(4.5rem, 8vh, 7rem) 0' }}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="section-label justify-start mb-3">
              <span className="whitespace-nowrap font-semibold tracking-wider">KABAR & EDUKASI KOPERASI</span>
            </div>
            <h2
              className="font-display font-semibold text-forest leading-tight"
              style={{ fontSize: 'clamp(1.85rem, 3.5vw, 2.75rem)' }}
            >
              Berita, Kegiatan & Literasi
            </h2>
            <p className="font-body text-charcoal/70 text-[15px] max-w-[620px] mt-2">
              Kumpulan warta kegiatan resmi KOPMANTARA di media nasional, audiensi kementerian, serta panduan edukasi seputar perkoperasian modern Indonesia.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-white p-1.5 rounded-2xl border border-stone-200/80 shadow-xs shrink-0 self-start md:self-auto">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-body font-medium transition-all ${
                selectedFilter === 'all'
                  ? 'bg-forest text-white shadow-xs font-semibold'
                  : 'text-charcoal/70 hover:text-forest hover:bg-stone-100'
              }`}
            >
              Semua ({newsArticles.length})
            </button>
            <button
              onClick={() => setSelectedFilter('media')}
              className={`px-4 py-2 rounded-xl text-xs font-body font-medium transition-all ${
                selectedFilter === 'media'
                  ? 'bg-forest text-white shadow-xs font-semibold'
                  : 'text-charcoal/70 hover:text-forest hover:bg-stone-100'
              }`}
            >
              Berita Media (5)
            </button>
            <button
              onClick={() => setSelectedFilter('edukasi')}
              className={`px-4 py-2 rounded-xl text-xs font-body font-medium transition-all ${
                selectedFilter === 'edukasi'
                  ? 'bg-forest text-white shadow-xs font-semibold'
                  : 'text-charcoal/70 hover:text-forest hover:bg-stone-100'
              }`}
            >
              Edukasi Koperasi (5)
            </button>
          </div>
        </div>

        {/* Highlight Banner / Quick Member Portal Banner */}
        <div className="mb-10 bg-gradient-to-r from-forest via-forest to-emerald rounded-2xl p-6 sm:p-7 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-forest/30">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center shrink-0 border border-gold/30">
              <Sparkles className="w-6 h-6 text-gold" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-gold tracking-wide uppercase mb-1">
                <Building2 className="w-3.5 h-3.5" />
                <span>Portal Anggota Terintegrasi</span>
              </div>
              <h3 className="font-display text-lg sm:text-xl font-semibold text-white">
                Kelola Simpanan, Pinjaman & Pantau SHU KOPMANTARA
              </h3>
              <p className="text-white/80 text-xs sm:text-sm font-body max-w-[650px] mt-1">
                Semua anggota resmi dapat mengakses dasbor keuangan transparan, riwayat keanggotaan, dan partisipasi usaha secara langsung di platform kami.
              </p>
            </div>
          </div>
          <a
            href="https://member.kopmantara.co.id"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gold hover:bg-gold/90 text-forest font-medium text-sm transition-all shadow-sm shrink-0 whitespace-nowrap hover:scale-105"
          >
            Masuk ke Member Portal
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          {filteredNews.map((news) => (
            <article
              key={news.id}
              className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              {/* Image thumbnail */}
              <div 
                className="relative overflow-hidden aspect-[16/10] bg-stone-100 cursor-pointer"
                onClick={() => setActiveModalArticle(news)}
              >
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white text-xs font-medium flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    Klik untuk baca artikel
                  </span>
                </div>

                {/* Source Badge */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5">
                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide shadow-xs ${news.categoryColor}`}>
                    {news.category}
                  </span>
                </div>

                {/* Source Name Pill */}
                <div className="absolute top-3.5 right-3.5">
                  <span className="bg-black/60 backdrop-blur-md text-white/95 px-2.5 py-1 rounded-md text-[10px] font-medium border border-white/20">
                    {news.sourceName}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-charcoal/50 text-[12px] mb-2.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{news.date}</span>
                    <span className="w-1 h-1 rounded-full bg-stone-300" />
                    <span className="text-stone-500 font-medium">
                      {news.categoryType === 'media' ? 'Media Berita' : 'Edukasi'}
                    </span>
                  </div>

                  <h3 
                    onClick={() => setActiveModalArticle(news)}
                    className="font-body font-bold text-[16px] text-forest leading-snug line-clamp-2 group-hover:text-emerald cursor-pointer transition-colors"
                  >
                    {news.title}
                  </h3>

                  <p className="font-body text-[13.5px] text-charcoal/70 leading-relaxed mt-2.5 line-clamp-3">
                    {news.summary}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="pt-5 mt-4 border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={() => setActiveModalArticle(news)}
                    className="text-xs font-semibold text-forest hover:text-emerald inline-flex items-center gap-1.5 transition-colors group/btn"
                  >
                    Baca Detail
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1 text-gold" />
                  </button>

                  {news.externalUrl ? (
                    <a
                      href={news.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-charcoal/60 hover:text-forest flex items-center gap-1 px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 transition-colors"
                      title="Buka sumber website berita"
                    >
                      <span>Sumber Asli</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                      Panduan Resmi
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      {activeModalArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Image */}
            <div className="relative aspect-[16/9] w-full bg-stone-900 shrink-0">
              <img
                src={activeModalArticle.image}
                alt={activeModalArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              {/* Close Button */}
              <button
                onClick={() => setActiveModalArticle(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors border border-white/20"
                aria-label="Tutup dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Badges in Modal Header */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2">
                <span className={`px-3 py-1 rounded-md text-xs font-semibold ${activeModalArticle.categoryColor}`}>
                  {activeModalArticle.category}
                </span>
                <span className="bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1 rounded-md border border-white/20">
                  {activeModalArticle.sourceName}
                </span>
                <span className="text-white/80 text-xs flex items-center gap-1 ml-auto">
                  <Calendar className="w-3.5 h-3.5" />
                  {activeModalArticle.date}
                </span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 flex-1">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-forest leading-snug mb-4">
                {activeModalArticle.title}
              </h2>

              <div className="prose prose-stone text-charcoal/80 text-[15px] leading-relaxed space-y-4 mb-6">
                {activeModalArticle.fullContent.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Key Points */}
              {activeModalArticle.keyPoints && activeModalArticle.keyPoints.length > 0 && (
                <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200/80 mb-6">
                  <h4 className="text-xs font-semibold text-forest uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-gold" />
                    Poin Utama & Fokus Bahasan:
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-charcoal/80">
                    {activeModalArticle.keyPoints.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Modal Footer Actions */}
              <div className="pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleShare(activeModalArticle)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium border border-stone-200 text-charcoal/70 hover:text-forest hover:bg-stone-50 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    {copiedLink ? 'Link Tersalin!' : 'Bagikan'}
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  {activeModalArticle.externalUrl ? (
                    <a
                      href={activeModalArticle.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-forest hover:bg-emerald text-white text-xs font-semibold transition-colors shadow-sm"
                    >
                      Buka di {activeModalArticle.sourceName}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <a
                      href="https://member.kopmantara.co.id"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-forest hover:bg-emerald text-white text-xs font-semibold transition-colors shadow-sm"
                    >
                      Akses Portal Anggota
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button
                    onClick={() => setActiveModalArticle(null)}
                    className="px-4 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-charcoal text-xs font-medium transition-colors"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

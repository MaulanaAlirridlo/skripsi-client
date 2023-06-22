import Image from "next/image";
import { DataContext } from "../utils/Data";
import { useEffect, useContext, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

export default function Kesimpulan() {
  const { data, setData } = useContext(DataContext);
  const [mergedData, setMergedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_SERVER);
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <header className="bg-slate-50">
        <div className="justify-between bg-white shadow-lg text-black flex p-4 px-24 relative">
          <Link href="/">Data Asli</Link>
          <Link href="/Preprocessing">Preprocessing</Link>
          <Link href="/TfIdf">TF-IDF</Link>
          <Link href="/Pembobotan">Perbandingan</Link>
          <Link href="/KFoldCS">K-Fold CS</Link>
          <Link href="/Kesimpulan">Kesimpulan</Link>
        </div>
      </header>

      <main className="flex min-h-screen flex-col m-auto px-24 pt-5 pb-10 bg-slate-50">
        <div className="bg-white w-2/3 rounded-xl text-black shadow-md p-5 flex">
          <Image
            src="/logo-polije.png"
            alt="logo"
            width={1870}
            height={924}
            style={{ width: "20%", height: "auto" }}
          />
          <h2 className="w-fit items-center flex ml-5 text-4xl font-bold font-mono">
            Kesimpulan
          </h2>
        </div>
        {Object.keys(data).length > 0 ? (
          <div>
            <div className="flex justify-center">
              <div className="mt-5 rounded-xl text-black shadow-md bg-white mr-2ml-28">
                <div className="p-5">
                  <h1 className="font-bold text-lg">Lexicon Based Features</h1>
                  <p
                    className={`px-2 ${
                      data.mean_scoreA < data.mean_scoreC
                        ? "bg-yellow-300"
                        : data.mean_scoreA > data.mean_scoreC
                        ? "bg-green-400"
                        : ""
                    }`}
                  >
                    Acuration : {data.mean_scoreA}
                  </p>
                  <p
                    className={`px-2 ${
                      data.cpuTimeA > data.cpuTimeC
                        ? "bg-yellow-300"
                        : data.cpuTimeA < data.cpuTimeC
                        ? "bg-green-400"
                        : ""
                    }`}
                  >
                    Waktu CPU : {data.cpuTimeA} detik
                  </p>
                  <p
                    className={`px-2 ${
                      data.allTimeA > data.allTimeC
                        ? "bg-yellow-300"
                        : data.allTimeA < data.allTimeC
                        ? "bg-green-400"
                        : ""
                    }`}
                  >
                    Waktu Proses : {data.allTimeA} detik
                  </p>
                </div>
              </div>
              <div className="mt-5 rounded-xl text-black shadow-md bg-white ml-28">
                <div className="p-5">
                  <h1 className="font-bold text-lg">Ensemble Features</h1>
                  <p
                    className={`px-2 ${
                      data.mean_scoreC < data.mean_scoreA
                        ? "bg-yellow-300"
                        : data.mean_scoreC > data.mean_scoreA
                        ? "bg-green-400"
                        : ""
                    }`}
                  >
                    Acuration : {data.mean_scoreC}
                  </p>
                  <p
                    className={`px-2 ${
                      data.cpuTimeC > data.cpuTimeA
                        ? "bg-yellow-300"
                        : data.cpuTimeC < data.cpuTimeA
                        ? "bg-green-400"
                        : ""
                    }`}
                  >
                    Waktu CPU : {data.cpuTimeC} detik
                  </p>
                  <p
                    className={`px-2 ${
                      data.allTimeC > data.allTimeA
                        ? "bg-yellow-300"
                        : data.allTimeC < data.allTimeA
                        ? "bg-green-400"
                        : ""
                    }`}
                  >
                    Waktu Proses : {data.allTimeC} detik
                  </p>
                </div>
              </div>
            </div>
            <p className="bg-white rounded-xl text-black shadow-md my-5 p-4 text-justify">
              {`Algoritma ekstraksi fitur yang memiliki akurasi terbaik adalah `}
              <span className="font-bold">
                {data.mean_scoreA > data.mean_scoreC
                  ? "Lexicon Based Features"
                  : data.mean_scoreC > data.mean_scoreA
                  ? "Ensemble Features"
                  : ""}
              </span>
              {`. Dalam perbandingan efisiensi algoritma atau penggunaan sumber daya, waktu CPU lebih penting daripada waktu keseluruhan. Pemilik waktu CPU tercepat adalah `}
              <span className="font-bold">
                {data.cpuTimeA < data.cpuTimeC
                  ? "Lexicon Based Features"
                  : data.cpuTimeC < data.cpuTimeA
                  ? "Ensemble Features"
                  : ""}
              </span>
              {`.  Namun secepat apapun algoritmanya jika tidak akurat akan sia-sia, dan yang dibutuhkan untuk menyelesaikan masalah adalah algoritma yang memiliki akurasi tertinggi kecuali perbedaan akurasi tidak terlalu jauh. Sehingga `}
              <span className="font-bold">
                {data.mean_scoreA > data.mean_scoreC
                  ? "Lexicon Based Features"
                  : data.mean_scoreC > data.mean_scoreA
                  ? "Ensemble Features"
                  : ""}
              </span>
              {` adalah algoritma ekstraksi fitur terbaik yang dapat dikombinasikan dengan pembobotan TF-IDF di antara ketiga metode ekstraksi fitur yang dibandingkan.`}
            </p>
          </div>
        ) : (
          ""
        )}
        <div className="flex justify-end">
          <Link href="/SVM" className="w-fit">
            <button className="text-black bg-white shadow-md px-5 py-2 rounded-xl mt-5 mr-3">
              Sebelumnya
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}

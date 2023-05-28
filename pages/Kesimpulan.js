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
          <Link href="/TfIdf">Pembobotan 1</Link>
          <Link href="/Pembobotan">Pembobotan 2</Link>
          <Link href="/Split">Split Data</Link>
          <Link href="/SVM">SVM</Link>
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
            <div className="flex justify-between">
              <div className="mt-5 rounded-xl text-black shadow-md bg-white">
                <div className="p-5">
                  <h1 className="font-bold text-lg">Lexicon Based Features</h1>
                  <p
                    className={`px-2 ${
                      data.accuracyA < data.accuracyB &&
                      data.accuracyA < data.accuracyC
                        ? "bg-red-500"
                        : data.accuracyA > data.accuracyB &&
                          data.accuracyA > data.accuracyC
                        ? "bg-green-500"
                        : "bg-yellow-400"
                    }`}
                  >
                    Acuration : {data.accuracyA}
                  </p>
                  <p
                    className={`px-2 ${
                      data.precisionA < data.precisionB &&
                      data.precisionA < data.precisionC
                        ? "bg-red-500"
                        : data.precisionA > data.precisionB &&
                          data.precisionA > data.precisionC
                        ? "bg-green-500"
                        : "bg-yellow-400"
                    }`}
                  >
                    Precision : {data.precisionA}
                  </p>
                  <p
                    className={`px-2 ${
                      data.recallA < data.recallB && data.recallA < data.recallC
                        ? "bg-red-500"
                        : data.recallA > data.recallB &&
                          data.recallA > data.recallC
                        ? "bg-green-500"
                        : "bg-yellow-400"
                    }`}
                  >
                    Recall : {data.recallA}
                  </p>
                  <p
                    className={`px-2 ${
                      data.f1A < data.f1B && data.f1A < data.f1C
                        ? "bg-red-500"
                        : data.f1A > data.f1B && data.f1A > data.f1C
                        ? "bg-green-500"
                        : "bg-yellow-400"
                    }`}
                  >
                    F1-score : {data.f1A}
                  </p>
                  <p
                    className={`px-2 ${
                      data.cpuTimeA > data.cpuTimeB &&
                      data.cpuTimeA > data.cpuTimeC
                        ? "bg-red-500"
                        : data.cpuTimeA < data.cpuTimeB &&
                          data.cpuTimeA < data.cpuTimeC
                        ? "bg-green-500"
                        : "bg-yellow-400"
                    }`}
                  >
                    Waktu CPU : {data.cpuTimeA} detik
                  </p>
                  <p
                    className={`px-2 ${
                      data.allTimeA > data.allTimeB &&
                      data.allTimeA > data.allTimeC
                        ? "bg-red-500"
                        : data.allTimeA < data.allTimeB &&
                          data.allTimeA < data.allTimeC
                        ? "bg-green-500"
                        : "bg-yellow-400"
                    }`}
                  >
                    Waktu Proses : {data.allTimeA} detik
                  </p>
                </div>
              </div>
              <div className="mt-5 rounded-xl text-black shadow-md bg-white">
                <div className="p-5">
                  <h1 className="font-bold text-lg">Ensemble Features</h1>
                  <p
                    className={`px-2 ${
                      data.accuracyC < data.accuracyA &&
                      data.accuracyC < data.accuracyB
                        ? "bg-red-500"
                        : data.accuracyC > data.accuracyA &&
                          data.accuracyC > data.accuracyB
                        ? "bg-green-500"
                        : "bg-yellow-400"
                    }`}
                  >
                    Acuration : {data.accuracyC}
                  </p>
                  <p
                    className={`px-2 ${
                      data.precisionC < data.precisionA &&
                      data.precisionC < data.precisionB
                        ? "bg-red-500"
                        : data.precisionC > data.precisionA &&
                          data.precisionC > data.precisionB
                        ? "bg-green-500"
                        : "bg-yellow-400"
                    }`}
                  >
                    Precision : {data.precisionC}
                  </p>
                  <p
                    className={`px-2 ${
                      data.recallC < data.recallA && data.recallC < data.recallB
                        ? "bg-red-500"
                        : data.recallC > data.recallA &&
                          data.recallC > data.recallB
                        ? "bg-green-500"
                        : "bg-yellow-400"
                    }`}
                  >
                    Recall : {data.recallC}
                  </p>
                  <p
                    className={`px-2 ${
                      data.f1C < data.f1A && data.f1C < data.f1B
                        ? "bg-red-500"
                        : data.f1C > data.f1A && data.f1C > data.f1B
                        ? "bg-green-500"
                        : "bg-yellow-400"
                    }`}
                  >
                    F1-score : {data.f1C}
                  </p>
                  <p
                    className={`px-2 ${
                      data.cpuTimeC > data.cpuTimeA &&
                      data.cpuTimeC > data.cpuTimeB
                        ? "bg-red-500"
                        : data.cpuTimeC < data.cpuTimeA &&
                          data.cpuTimeC < data.cpuTimeB
                        ? "bg-green-500"
                        : "bg-yellow-400"
                    }`}
                  >
                    Waktu CPU : {data.cpuTimeC} detik
                  </p>
                  <p
                    className={`px-2 ${
                      data.allTimeC > data.allTimeA &&
                      data.allTimeC > data.allTimeB
                        ? "bg-red-500"
                        : data.allTimeC < data.allTimeA &&
                          data.allTimeC < data.allTimeB
                        ? "bg-green-500"
                        : "bg-yellow-400"
                    }`}
                  >
                    Waktu Proses : {data.allTimeC} detik
                  </p>
                </div>
              </div>
              <div className="mt-5 rounded-xl text-black shadow-md bg-white">
                <div className="p-5">
                  <h1 className="font-bold text-lg">Bag of Words</h1>
                  <p
                    className={`px-2 ${
                      data.accuracyB < data.accuracyA &&
                      data.accuracyB < data.accuracyC
                        ? "bg-red-500"
                        : data.accuracyB > data.accuracyA &&
                          data.accuracyB > data.accuracyC
                        ? "bg-green-500"
                        : "bg-yellow-400"
                    }`}
                  >
                    Acuration : {data.accuracyB}
                  </p>
                  <p
                    className={`px-2 ${
                      data.precisionB < data.precisionA &&
                      data.precisionB < data.precisionC
                        ? "bg-red-500"
                        : data.precisionB > data.precisionA &&
                          data.precisionB > data.precisionC
                        ? "bg-green-500"
                        : "bg-yellow-400"
                    }`}
                  >
                    Precision : {data.precisionB}
                  </p>
                  <p
                    className={`px-2 ${
                      data.recallB < data.recallA && data.recallB < data.recallC
                        ? "bg-red-500"
                        : data.recallB > data.recallA &&
                          data.recallB > data.recallC
                        ? "bg-green-500"
                        : "bg-yellow-400"
                    }`}
                  >
                    Recall : {data.recallB}
                  </p>
                  <p
                    className={`px-2 ${
                      data.f1B < data.f1A && data.f1B < data.f1C
                        ? "bg-red-500"
                        : data.f1B > data.f1A && data.f1B > data.f1C
                        ? "bg-green-500"
                        : "bg-yellow-400"
                    }`}
                  >
                    F1-score : {data.f1B}
                  </p>
                  <p
                    className={`px-2 ${
                      data.cpuTimeB > data.cpuTimeA &&
                      data.cpuTimeB > data.cpuTimeC
                        ? "bg-red-500"
                        : data.cpuTimeB < data.cpuTimeA &&
                          data.cpuTimeB < data.cpuTimeC
                        ? "bg-green-500"
                        : "bg-yellow-400"
                    }`}
                  >
                    Waktu CPU : {data.cpuTimeB} detik
                  </p>
                  <p
                    className={`px-2 ${
                      data.allTimeB > data.allTimeA &&
                      data.allTimeB > data.allTimeC
                        ? "bg-red-500"
                        : data.allTimeB < data.allTimeA &&
                          data.allTimeB < data.allTimeC
                        ? "bg-green-500"
                        : "bg-yellow-400"
                    }`}
                  >
                    Waktu Proses : {data.allTimeB} detik
                  </p>
                </div>
              </div>
            </div>
            <p className="bg-white rounded-xl text-black shadow-md my-5 p-4 text-justify">
              {`Algoritma ekstraksi fitur yang memiliki akurasi terbaik adalah `}
              <span className="font-bold">
                {data.accuracyA > data.accuracyB &&
                data.accuracyA > data.accuracyC
                  ? "Lexicon Based Features"
                  : data.accuracyC > data.accuracyA &&
                    data.accuracyC > data.accuracyB
                  ? "Ensemble Features"
                  : "Bag of Words"}
              </span>
              {`. Dalam perbandingan efisiensi algoritma atau penggunaan sumber daya, waktu CPU lebih penting daripada waktu keseluruhan. Pemilik waktu CPU tercepat adalah `}
              <span className="font-bold">
                {data.cpuTimeA < data.cpuTimeB && data.cpuTimeA < data.cpuTimeC
                  ? "Lexicon Based Features"
                  : data.cpuTimeC < data.cpuTimeA &&
                    data.cpuTimeC < data.cpuTimeB
                  ? "Ensemble Features"
                  : "Bag of Words"}
              </span>
              {`.  Namun secepat apapun algoritmanya jika tidak akurat akan sia-sia, dan yang dibutuhkan untuk menyelesaikan masalah adalah algoritma yang memiliki akurasi tertinggi. Sehingga `}
              <span className="font-bold">
                {data.accuracyA > data.accuracyB &&
                data.accuracyA > data.accuracyC
                  ? "Lexicon Based Features"
                  : data.accuracyC > data.accuracyA &&
                    data.accuracyC > data.accuracyB
                  ? "Ensemble Features"
                  : "Bag of Words"}
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

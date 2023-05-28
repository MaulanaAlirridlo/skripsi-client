import Image from 'next/image'
import { DataContext } from '../utils/Data'
import { useEffect, useContext, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link';

const DynamicDataTable = dynamic(() => import('react-data-table-component'), { ssr: false })

export default function Split() {
  const {data, setData} = useContext(DataContext)
  const [mergedData, setMergedData] = useState([])

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
  }, [])

  function cek(kelas) { 
    if (kelas == 0) {
      return 'negatif'
    } else if (kelas == 1) {
      return 'positif'
    } else {
      return 'netral'
    }
  }
  // a = tf-idf & lbf
  // b = tf-idf & bow
  // c = tf-idf & ef
  if (data.tweetTestA && mergedData.length === 0) {
    setMergedData(data.tweetTestA.map((item, index) => ({
      tweetTestA: item,
      tweetTestB: data.tweetTestB[index],
      tweetTestC: data.tweetTestC[index],
      yTestA: cek(JSON.stringify(data.yTestA[index])),
      yTestB: cek(JSON.stringify(data.yTestB[index])),
      yTestC: cek(JSON.stringify(data.yTestC[index])),
      svmA: cek(JSON.stringify(data.svmA[index])),
      svmB: cek(JSON.stringify(data.svmB[index])),
      svmC: cek(JSON.stringify(data.svmC[index])),

    })))
  }

  const TestAColumns = [
    {
      name: 'No',
      cell: (row, index) => index + 1,
      width: '50px',
    },
    {
      name: 'Tweet Bersih',
      selector: 'tweetTestA',
      cell: row => <div style={{ width: `${row.tweetTestA.length * 10}px` }}>{row.tweetTestA}</div>,
    },
    {
      name: 'Class',
      selector: 'yTestA',
      cell: row => <div style={{ width: `${row.yTestA.length * 10}px` }}>{row.yTestA}</div>,
    },
    {
      name: 'Prediksi',
      selector: 'svmA',
      cell: row => <div style={{ width: `${row.svmA.length * 10}px` }}>{row.svmA}</div>,
    },
  ]

  const TestBColumns = [
    {
      name: 'No',
      cell: (row, index) => index + 1,
      width: '50px',
    },
    {
      name: 'Tweet Bersih',
      selector: 'tweetTestB',
      cell: row => <div style={{ width: `${row.tweetTestB.length * 10}px` }}>{row.tweetTestB}</div>,
    },
    {
      name: 'Class',
      selector: 'yTestB',
      cell: row => <div style={{ width: `${row.yTestB.length * 10}px` }}>{row.yTestB}</div>,
    },
    {
      name: 'Prediksi',
      selector: 'svmB',
      cell: row => <div style={{ width: `${row.svmB.length * 10}px` }}>{row.svmB}</div>,
    },
  ]

  const TestCColumns = [
    {
      name: 'No',
      cell: (row, index) => index + 1,
      width: '50px',
    },
    {
      name: 'Tweet Bersih',
      selector: 'tweetTestC',
      cell: row => <div style={{ width: `${row.tweetTestC.length * 10}px` }}>{row.tweetTestC}</div>,
    },
    {
      name: 'Class',
      selector: 'yTestC',
      cell: row => <div style={{ width: `${row.yTestC.length * 10}px` }}>{row.yTestC}</div>,
    },
    {
      name: 'Prediksi',
      selector: 'svmC',
      cell: row => <div style={{ width: `${row.svmC.length * 10}px` }}>{row.svmC}</div>,
    },
  ]

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
          <Link href="/Kesimpulan">Kesipulan</Link>
        </div>
      </header>

      <main className="flex min-h-screen flex-col m-auto px-24 pt-5 pb-10 bg-slate-50">
        <div className="bg-white w-2/3 rounded-xl text-black shadow-md p-5 flex">
          <Image src="/logo-polije.png" alt='logo' width={1870} height={924} style={{width: '20%', height: 'auto'}}/>
          <h2 className='w-fit items-center flex ml-5 text-4xl font-bold font-mono'>Support Vector Machine</h2>
        </div>
        <div className='mt-5 rounded-xl text-black shadow-md bg-white'>
          <DynamicDataTable
            title={'TF-IDF + Lexicon Based Features'}
            columns={TestAColumns}
            data={mergedData}
            pagination={true}
            responsive={true}
            highlightOnHover={true}
          />
          <div className="px-5 pb-3">
            <p>
              Acuration : {data.accuracyA}
            </p>
            <p>
              Precision : {data.precisionA}
            </p>
            <p>
              Recall : {data.recallA}
            </p>
            <p>
              F1-score : {data.f1A}
            </p>
            <p>
              Waktu CPU : {data.cpuTimeA} detik
            </p>
            <p>
              Waktu Proses : {data.allTimeA} detik
            </p>
          </div>
        </div>
        <div className='mt-5 rounded-xl text-black shadow-md bg-white'>
          <DynamicDataTable
            title={'TF-IDF + Ensemble Features'}
            columns={TestCColumns}
            data={mergedData}
            pagination={true}
            responsive={true}
            highlightOnHover={true}
          />
          <div className="px-5 pb-3">
            <p>
              Acuration : {data.accuracyC}
            </p>
            <p>
              Precision : {data.precisionC}
            </p>
            <p>
              Recall : {data.recallC}
            </p>
            <p>
              F1-score : {data.f1C}
            </p>
            <p>
              Waktu CPU : {data.cpuTimeC} detik
            </p>
            <p>
              Waktu Proses : {data.allTimeC} detik
            </p>
          </div>
        </div>
        <div className='mt-5 rounded-xl text-black shadow-md bg-white'>
          <DynamicDataTable
            title={'TF-IDF + Bag of Words'}
            columns={TestBColumns}
            data={mergedData}
            pagination={true}
            responsive={true}
            highlightOnHover={true}
          />
          <div className="px-5 pb-3">
            <p>
              Acuration : {data.accuracyB}
            </p>
            <p>
              Precision : {data.precisionB}
            </p>
            <p>
              Recall : {data.recallB}
            </p>
            <p>
              F1-score : {data.f1B}
            </p>
            <p>
              Waktu CPU : {data.cpuTimeB} detik
            </p>
            <p>
              Waktu Proses : {data.allTimeB} detik
            </p>
          </div>
        </div>
        <div className='flex justify-end'>
          <Link href="/Split" className='w-fit'>
            <button className='text-black bg-white shadow-md px-5 py-2 rounded-xl mt-5 mr-3'>Sebelumnya</button>
          </Link>
          <Link href="/Kesimpulan" className='w-fit'>
            <button className='text-black bg-white shadow-md px-5 py-2 rounded-xl mt-5'>Selanjutnya</button>
          </Link>
        </div>
      </main>
    </div>
  )
}
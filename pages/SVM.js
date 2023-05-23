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
    },
    {
      name: 'Tweet Bersih',
      selector: 'tweetTestA',
    },
    {
      name: 'Class',
      selector: 'yTestA',
    },
    {
      name: 'Prediksi',
      selector: 'svmA',
    },
  ]

  const TestBColumns = [
    {
      name: 'No',
      cell: (row, index) => index + 1,
    },
    {
      name: 'Tweet Bersih',
      selector: 'tweetTestB',
    },
    {
      name: 'Class',
      selector: 'yTestB',
    },
    {
      name: 'Prediksi',
      selector: 'svmB',
    },
  ]

  const TestCColumns = [
    {
      name: 'No',
      cell: (row, index) => index + 1,
    },
    {
      name: 'Tweet Bersih',
      selector: 'tweetTestC',
    },
    {
      name: 'Class',
      selector: 'yTestC',
    },
    {
      name: 'Prediksi',
      selector: 'svmC',
    },
  ]

  return (
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
      </div>
    </main>
  )
}
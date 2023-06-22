import Image from 'next/image'
import { DataContext } from '../utils/Data'
import { useEffect, useContext, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link';

const DynamicDataTable = dynamic(() => import('react-data-table-component'), { ssr: false })

export default function KFoldCS() {
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

  // a = tf-idf & lbf
  // b = tf-idf & bow
  // c = tf-idf & ef
  if (data.scoresA && mergedData.length === 0) {
    setMergedData(data.scoresA.map((item, index) => ({
      no: index+1,
      scoresA: item,
      scoresC: data.scoresC[index],
    })).concat({
      no: "rata-rata",
      scoresA: data.mean_scoreA,
      scoresC: data.mean_scoreC,
    }))
  }

  const TestAColumns = [
    {
      name: 'No',
      selector: 'no',
      width: '100px',
    },
    {
      name: 'Lexicon Based Features',
      selector: 'scoresA',
      cell: row => <div style={{ width: `${row.scoresA.length * 10}px` }}>{row.scoresA}</div>,
    },
    {
      name: 'Ensemble Features',
      selector: 'scoresC',
      cell: row => <div style={{ width: `${row.scoresC.length * 10}px` }}>{row.scoresC}</div>,
    },
  ]

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
          <Image src="/logo-polije.png" alt='logo' width={1870} height={924} style={{width: '20%', height: 'auto'}}/>
          <h2 className='w-fit items-center flex ml-5 text-4xl font-bold font-mono'>K-Fold Cross Validation</h2>
        </div>
        <div className='mt-5 rounded-xl text-black shadow-md bg-white'>
          <DynamicDataTable
            title={'Perbandingan Akurasi'}
            columns={TestAColumns}
            data={mergedData}
            // pagination={true}
            responsive={true}
            highlightOnHover={true}
          />
        </div>
        <div className='flex justify-end mt-5'>
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
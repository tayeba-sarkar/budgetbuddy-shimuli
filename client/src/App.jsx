import { useState, useEffect } from 'react'

export default function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('bb-shimuli')
    return saved ? JSON.parse(saved) : [
      { id: 1, type: 'income', amount: 35000, category: 'Salary', note: 'BS23 Stipend', date: '2026-10-29' },
      { id: 2, type: 'expense', amount: 1200, category: 'Food', note: 'Lunch', date: '2026-10-29' },
      { id: 3, type: 'expense', amount: 3500, category: 'Shopping', note: 'Dress', date: '2026-10-28' },
    ]
  })
  const [type, setType] = useState('expense')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')
  const [note, setNote] = useState('')

  useEffect(() => {
    localStorage.setItem('bb-shimuli', JSON.stringify(transactions))
  }, [transactions])

  const income = transactions.filter(t => t.type === 'income').reduce((a, b) => a + Number(b.amount), 0)
  const expense = transactions.filter(t => t.type === 'expense').reduce((a, b) => a + Number(b.amount), 0)

  const add = (e) => {
    e.preventDefault()
    if (!amount) return
    const newTx = { id: Date.now(), type, amount: Number(amount), category, note: note || category, date: new Date().toISOString().split('T')[0] }
    setTransactions([newTx, ...transactions])
    setAmount('')
    setNote('')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b sticky top-0">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between">
          <div className="flex gap-3 items-center">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">B</div>
            <div>
              <h1 className="font-bold">BudgetBuddy</h1>
              <p className="text-[11px] text-gray-500">By Shimuli Akhter • BS23 • CGPA 3.59</p>
            </div>
          </div>
          <span className="text-xs bg-gray-900 text-white px-4 py-2 rounded-full">Live 5174</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 grid lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white p-4 rounded-2xl border"><p className="text-[10px] text-gray-500">INCOME</p><p className="font-bold text-green-600">৳{income}</p></div>
            <div className="bg-white p-4 rounded-2xl border"><p className="text-[10px] text-gray-500">EXPENSE</p><p className="font-bold text-red-600">৳{expense}</p></div>
            <div className="bg-indigo-600 p-4 rounded-2xl text-white"><p className="text-[10px] opacity-70">BALANCE</p><p className="font-bold">৳{income - expense}</p></div>
          </div>

          <form onSubmit={add} className="bg-white p-6 rounded-[24px] border space-y-4">
            <h3 className="font-bold">Add Transaction ✨</h3>
            <div className="flex bg-gray-100 p-1 rounded-full">
              <button type="button" onClick={() => { setType('expense'); setCategory('Food') }} className={`flex-1 py-2 text-sm rounded-full ${type === 'expense' ? 'bg-white shadow font-bold' : ''}`}>💸 Expense</button>
              <button type="button" onClick={() => { setType('income'); setCategory('Salary') }} className={`flex-1 py-2 text-sm rounded-full ${type === 'income' ? 'bg-white shadow font-bold' : ''}`}>💰 Income</button>
            </div>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount BDT" className="w-full border rounded-xl px-4 py-3 text-sm" required />
            <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border rounded-xl px-4 py-3 text-sm bg-white">
              {(type === 'expense' ? ['Food','Transport','Shopping','Bills','Health'] : ['Salary','Freelance','Gift']).map(c => <option key={c}>{c}</option>)}
            </select>
            <input value={note} onChange={e => setNote(e.target.value)} placeholder="Note" className="w-full border rounded-xl px-4 py-3 text-sm" />
            <button className="w-full bg-gray-900 text-white py-3 rounded-xl text-sm font-semibold">Add →</button>
          </form>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-[24px] border">
            <div className="p-6 flex justify-between"><h4 className="font-bold text-sm">Recent</h4><span className="text-xs bg-gray-100 px-3 py-1 rounded-full">{transactions.length} items</span></div>
            <div className="divide-y">
              {transactions.map(t => (
                <div key={t.id} className="p-4 px-6 flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${t.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>{t.type === 'income' ? '💰' : '💸'}</div>
                    <div><p className="font-semibold text-sm">{t.category} <span className="text-gray-400 font-normal">• {t.note}</span></p><p className="text-[11px] text-gray-500">{t.date}</p></div>
                  </div>
                  <div className="flex gap-3 items-center">
                    <span className="font-bold text-sm">{t.type === 'income' ? '+' : '-'}৳{t.amount}</span>
                    <button onClick={() => setTransactions(transactions.filter(x => x.id !== t.id))} className="text-gray-400">✕</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-[11px] text-gray-400 mt-6">Made with ❤️ by Shimuli Akhter • CSE • Uni of South Asia • For BS23 Internship</p>
        </div>
      </div>
    </div>
  )
}
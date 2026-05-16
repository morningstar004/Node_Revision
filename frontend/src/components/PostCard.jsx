import { useState } from 'react'
import api from '../api/axios'

export default function PostCard({ post, onRefresh }) {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    name: post.name, description: post.description, age: post.age
  })

  const handleUpdate = async () => {
    await api.patch(`/posts/update/${post._id}`, { ...form, age: Number(form.age) })
    setEditing(false)
    onRefresh()
  }

  const handleDelete = async () => {
    await api.delete(`/posts/delete/${post._id}`)
    onRefresh()
  }

  return (
    <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
      {editing ? (
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</label>
            <input 
              className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all" 
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })} 
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Age</label>
            <input 
              className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all" 
              type="number" 
              value={form.age}
              onChange={e => setForm({ ...form, age: e.target.value })} 
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</label>
            <textarea 
              className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all min-h-[100px]" 
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })} 
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button 
              onClick={handleUpdate} 
              className="flex-1 bg-indigo-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Save Changes
            </button>
            <button 
              onClick={() => setEditing(false)} 
              className="flex-1 bg-slate-100 text-slate-600 px-4 py-2.5 rounded-xl font-medium hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-bold text-xl text-slate-900 tracking-tight">{post.name}</h3>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full">
              {post.age} Years Old
            </span>
          </div>
          
          <p className="text-slate-600 leading-relaxed mb-6 flex-grow">
            {post.description}
          </p>
          
          <div className="flex gap-3 pt-4 border-t border-slate-50">
            <button 
              onClick={() => setEditing(true)} 
              className="flex-1 bg-slate-50 text-slate-700 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-amber-50 hover:text-amber-700 transition-all border border-transparent hover:border-amber-100"
            >
              Edit
            </button>
            <button 
              onClick={handleDelete} 
              className="flex-1 bg-slate-50 text-slate-700 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-rose-50 hover:text-rose-600 transition-all border border-transparent hover:border-rose-100"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
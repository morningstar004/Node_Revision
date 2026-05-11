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
    <div className="bg-white p-4 rounded shadow space-y-2">
      {editing ? (
        <>
          <input className="w-full border p-2 rounded" value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })} />
          <input className="w-full border p-2 rounded" type="number" value={form.age}
            onChange={e => setForm({ ...form, age: e.target.value })} />
          <textarea className="w-full border p-2 rounded" value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })} />
          <div className="flex gap-2">
            <button onClick={handleUpdate} className="bg-blue-600 text-white px-3 py-1 rounded">Save</button>
            <button onClick={() => setEditing(false)} className="bg-gray-300 px-3 py-1 rounded">Cancel</button>
          </div>
        </>
      ) : (
        <>
          <h3 className="font-bold text-lg">{post.name} <span className="text-gray-400 text-sm">age: {post.age}</span></h3>
          <p className="text-gray-600">{post.description}</p>
          <div className="flex gap-2">
            <button onClick={() => setEditing(true)} className="bg-yellow-400 px-3 py-1 rounded text-sm">Edit</button>
            <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded text-sm">Delete</button>
          </div>
        </>
      )}
    </div>
  )
}
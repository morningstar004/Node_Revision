import { useState, useEffect } from 'react'
import api from '../api/axios'
import PostCard from '../components/PostCard'

export default function Posts() {
  const [posts, setPosts] = useState([])
  const [form, setForm] = useState({ name: '', description: '', age: '' })
  const [error, setError] = useState('')

  const fetchPosts = async () => {
    const res = await api.get('/posts')
    setPosts(res.data)
  }

  useEffect(() => { fetchPosts() }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      await api.post('/posts/create', { ...form, age: Number(form.age) })
      setForm({ name: '', description: '', age: '' })
      fetchPosts()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post')
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Posts</h2>

      {/* Create Post Form */}
      <form onSubmit={handleCreate} className="bg-white p-6 rounded shadow space-y-3">
        <h3 className="font-semibold text-lg">Create New Post</h3>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input className="w-full border p-2 rounded" placeholder="Name" value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })} />
        <input className="w-full border p-2 rounded" placeholder="Age" type="number" value={form.age}
          onChange={e => setForm({ ...form, age: e.target.value })} />
        <textarea className="w-full border p-2 rounded" placeholder="Description" value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })} />
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Create Post
        </button>
      </form>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map(post => (
          <PostCard key={post._id} post={post} onRefresh={fetchPosts} />
        ))}
      </div>
    </div>
  )
}
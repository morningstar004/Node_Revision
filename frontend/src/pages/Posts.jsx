import { useState, useEffect } from 'react'
import api from '../api/axios'
import PostCard from '../components/PostCard.jsx'

export default function Posts() {
  const [posts, setPosts] = useState([])
  const [form, setForm] = useState({ name: '', description: '', age: '' })
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const fetchPosts = async (search = '') => {
    try {
      const res = await api.get('/posts', { params: { search } })
      setPosts(res.data)
    } catch (err) {
      console.error("Failed to fetch posts")
    }
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchPosts(searchTerm)
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  const handleCreate = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await api.post('/posts/create', { ...form, age: Number(form.age) })
      setForm({ name: '', description: '', age: '' })
      fetchPosts(searchTerm)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50/30 pb-20">
      <div className="max-w-3xl mx-auto p-6 space-y-10">
        
        {/* Header Section */}
        <div className="flex items-center justify-between pt-4">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Feed</h2>
            <p className="text-slate-500 text-sm mt-1">Manage and view all shared revisions.</p>
          </div>
          <div className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-bold">
            {posts.length} {posts.length === 1 ? 'Post' : 'Posts'}
          </div>
        </div>

        {/* Search Bar Section */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            type="text"
            className="w-full bg-white border border-slate-200 pl-11 pr-4 py-4 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm placeholder:text-slate-400 text-slate-700"
            placeholder="Search posts by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Create Post Form Card */}
        <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-100">
              +
            </div>
            <h3 className="font-bold text-xl text-slate-800">Create New Post</h3>
          </div>

          {error && (
            <div className="mb-4 bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Title / Name</label>
                <input 
                  className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all" 
                  placeholder="Enter name..." 
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })} 
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Age</label>
                <input 
                  className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all" 
                  placeholder="e.g. 25" 
                  type="number" 
                  value={form.age}
                  onChange={e => setForm({ ...form, age: e.target.value })} 
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Description</label>
              <textarea 
                className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all min-h-[100px]" 
                placeholder="What's on your mind?" 
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })} 
                required
              />
            </div>

            <button className="w-full bg-slate-900 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-indigo-600 transition-all shadow-md active:scale-[0.99]">
              Publish Post
            </button>
          </form>
        </section>

        {/* Posts List Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <hr className="flex-grow border-slate-100" />
            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Recent Activity</span>
            <hr className="flex-grow border-slate-100" />
          </div>

          {posts.length > 0 ? (
            <div className="grid gap-6">
              {posts.map(post => (
                <PostCard key={post._id} post={post} onRefresh={() => fetchPosts(searchTerm)} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-slate-200">
              <div className="text-4xl mb-4">📝</div>
              <h4 className="text-slate-900 font-bold text-lg">{searchTerm ? 'No results found' : 'No posts yet'}</h4>
              <p className="text-slate-500">{searchTerm ? `We couldn't find anything matching "${searchTerm}"` : 'Be the first to share something with the community.'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
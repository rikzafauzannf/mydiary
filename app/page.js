"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { getPosts, addPost, deletePost } from "@/service/crud";
import Link from "next/link";
// Load react-quill dynamically to prevent SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"; // import styles

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getPosts();
        setPosts(posts);
      } catch (error) {
        setError("Failed to fetch posts");
      }
    };
    fetchPosts();
  }, []);

  const handleAddPost = async () => {
    try {
      await addPost({ title: newTitle, content: newContent });
      const posts = await getPosts();
      setPosts(posts);
      setNewTitle("");
      setNewContent("");
    } catch (error) {
      setError("Failed to add post");
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await deletePost(id);
      const posts = await getPosts();
      setPosts(posts);
    } catch (error) {
      setError("Failed to delete post");
    }
  };

  return (
    <>
      {/* FORM */}
      <h1 className="text-4xl font-extrabold">GOBDiary</h1>
      <p className="text-based font-semibold">
        Tempat ngebacot untuk saling beradu nasib
      </p>
      <div className="gap-2 grid grid-cols-1 w-full">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Post Title"
          className="input input-bordered w-full text-white"
        />
        <ReactQuill
          value={newContent}
          onChange={setNewContent}
          className="w-full min-h-[76vh] mb-20 text-white bg-slate-950 rounded-md"
        />
        {/* <textarea
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          placeholder="Post Content"
          className="input input-bordered w-full h-64"
        /> */}
      </div>
      <button className="btn btn-md btn-primary " onClick={handleAddPost}>
        Add Diary
      </button>

      {/* content */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="card w-full bg-slate-800/50">
            <div className="card-body">
              <h1 className="text-xl font-semibold text-white">{post.title}</h1>
              <div className="flex flex-row gap-1">
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="btn btn-sm btn-error"
                  aria-label={`Delete ${post.title}`}
                >
                  Delete
                </button>
                <Link
                  href={`/post/${post.id}`}
                  className="btn btn-sm btn-success flex-1"
                >
                  Baca
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Tampilkan pesan kesalahan jika ada */}
      {error && <div className="text-red-500">{error}</div>}
    </>
  );
}

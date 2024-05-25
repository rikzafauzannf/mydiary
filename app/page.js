"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { getPosts, addPost, deletePost } from "@/service/crud";
import Link from "next/link";
// Load react-quill dynamically to prevent SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"; // import styles

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

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
      <h1 className="text-4xl font-extrabold text-white">GOBDiary</h1>
      <p className="text-based font-medium text-white">
        Tempat ngebacot untuk saling beradu nasib, karena kebanyakan orang tidak
        bisa meluapkan isi pikiran dengan baik dan disinilah tempat dimana lu
        bisa menyampaikan segala yang lu rasain dengan bebas
      </p>

      <Disclosure>
        <DisclosureButton className="group flex items-center gap-2 btn btn-md btn-error w-full">
          Mulai Ngebacot
          {/* <ChevronDownIcon className="w-5 group-data-[open]:rotate-180" /> */}
        </DisclosureButton>
        <DisclosurePanel>
          <div className="gap-2 grid grid-cols-1 w-full">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Post Title"
              className="input input-bordered w-full text-white shadow-lg"
            />
            <ReactQuill
              value={newContent}
              onChange={setNewContent}
              className="w-full min-h-[76vh] mb-20 text-white bg-slate-950 rounded-md shadow-lg"
            />
            {/* <textarea
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          placeholder="Post Content"
          className="input input-bordered w-full h-64"
        /> */}
          </div>
          <button
            className="btn btn-md btn-primary shadow-lg"
            onClick={handleAddPost}
          >
            Add Diary
          </button>
        </DisclosurePanel>
      </Disclosure>

      {/* content */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="card w-full bg-slate-800/50 shadow-lg">
            <div className="card-body">
              <h1 className="text-xl font-semibold text-white">{post.title}</h1>
              <div className="flex flex-row gap-1">
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="btn btn-sm btn-error shadow-lg"
                  aria-label={`Delete ${post.title}`}
                >
                  Delete
                </button>
                <Link
                  href={`/post/${post.id}`}
                  className="btn btn-sm btn-success flex-1 shadow-lg"
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

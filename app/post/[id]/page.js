"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { getPostById, updatePost } from "@/service/crud";
import React from "react";
import Link from "next/link";
// Load react-quill dynamically to prevent SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"; // import styles

const PostDetails = ({ params }) => {
  const id = params.id;
  const [post, setPost] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        try {
          const postData = await getPostById(id);
          setPost(postData);
          setEditedTitle(postData.title);
          setEditedContent(postData.content);
        } catch (error) {
          console.error("Failed to fetch post:", error);
        }
      }
    };
    fetchPost();
  }, [id]);

  const handleUpdatePost = async () => {
    try {
      await updatePost(id, { title: editedTitle, content: editedContent });
      const updatedPost = await getPostById(id);
      setPost(updatedPost);
      setEditing(false);
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <>
      <div>
        {editing ? (
          <div className="space-y-2">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="input input-bordered w-full text-white shadow-lg"
            />
            <ReactQuill
              value={editedContent}
              onChange={setEditedContent}
              className="w-full min-h-[76vh] mb-20 text-white bg-slate-950 rounded-md shadow-lg"
            />
            <button
              onClick={handleUpdatePost}
              className="btn btn-md btn-success shadow-lg w-full"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="card bg-gradient-to-tr from-slate-400/50 shadow-lg">
            <div className="card-body">
              <h1 className="text-2xl font-semibold">{post.title}</h1>
              <hr />
              <div
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="w-full break-words whitespace-normal"
              />
              <div className="flex flex-row gap-2">
                <Link href={"/"} className="btn btn-sm btn-primary shadow-lg">
                  Back
                </Link>
                <button
                  onClick={() => setEditing(true)}
                  className="btn btn-sm btn-success flex-1 shadow-lg"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PostDetails;

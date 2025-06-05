import React from "react";

export default function ViewPostModal({ post, onClose }) {
  if (!post) return null;

  return (
    <div className="modal">
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal-content">
        <span className="modal-close" onClick={onClose}>&times;</span>
        <img src={post.src} alt={post.title} />
        <p>{post.title}</p>
      </div>
    </div>
  );
}

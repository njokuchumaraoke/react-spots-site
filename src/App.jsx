import React, { useState, useEffect } from "react";
import PostCard from "./components/PostCard";
import EditBioModal from "./components/EditBioModal";
import AddPostModal from "./components/AddPostModal";
import ViewPostModal from "./components/ViewPostModal";
import { initialPosts } from "./data/postsData";

// Image imports (all from src/assets/images)
import logoImg from "./assets/images/Logo.svg";
import editIcon from "./assets/images/Group3.svg";
import newPostIcon from "./assets/images/Group 26.svg";
import defaultProfileImg from "./assets/images/image2.svg";

export default function App() {
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem("posts");
    return saved ? JSON.parse(saved) : initialPosts;
  });

  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("profile");
    return saved
      ? JSON.parse(saved)
      : {
          name: "Bessie Coleman",
          bio: "Civil Servant",
          image: defaultProfileImg, // use imported image
        };
  });

  const [viewPost, setViewPost] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  function handleAddPost(newPost) {
    setPosts([...posts, newPost]);
    setShowAddModal(false);
  }

  function handleEditProfile(updatedProfile) {
    setProfile(updatedProfile);
    setShowEditModal(false);
  }

  function handleToggleLike(post) {
    setPosts((prevPosts) =>
      prevPosts.map((p) => (p === post ? { ...p, liked: !p.liked } : p))
    );
  }

  return (
    <div>
      <header>
        <img src={logoImg} alt="spot-logo" />
      </header>

      <section className="main-section">
        <section className="profile-section">
          <div className="bio-container">
            <div className="img-bio">
              <img src={profile.image} alt="profile" />
            </div>
            <div className="bio-section">
              <div className="bio-content">
                <div className="bio-content-data">
                  <h1>{profile.name}</h1>
                  <p>{profile.bio}</p>
                </div>
                <div className="edit-button-container">
                  <button
                    className="edit-button"
                    onClick={() => setShowEditModal(true)}
                  >
                    <img src={editIcon} alt="edit" />
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="new-post-container">
            <button
              className="new-post-button"
              onClick={() => setShowAddModal(true)}
            >
              <img src={newPostIcon} alt="new post" />
              New Post
            </button>
          </div>
        </section>

        <section className="image-post-section" id="imagePostSection">
          {posts.map((post, index) => (
            <PostCard
              key={index}
              post={post}
              onClick={() => setViewPost(post)}
              onToggleLike={() => handleToggleLike(post)}
            />
          ))}
        </section>
      </section>

      <footer>
        <p>2023 &copy; Spots</p>
      </footer>

      {showEditModal && (
        <EditBioModal
          profile={profile}
          onClose={() => setShowEditModal(false)}
          onSave={handleEditProfile}
        />
      )}

      {showAddModal && (
        <AddPostModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddPost}
        />
      )}

      {viewPost && (
        <ViewPostModal post={viewPost} onClose={() => setViewPost(null)} />
      )}
    </div>
  );
}

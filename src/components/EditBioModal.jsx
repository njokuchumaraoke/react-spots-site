import React, { useState } from "react";

export default function EditBioModal({ profile, onClose, onSave }) {
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [image, setImage] = useState(profile.image);

  // Handle image file change and preview
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave({ name, bio, image });
  }

  return (
    <div id="edit-bio-modal" className="modal">
      {/* Modal backdrop */}
      <div className="modal-backdrop" onClick={onClose} />

      <div className="modal-content">
        {/* Close button */}
        <button
          id="edit-bio-cancel"
          className="modal-close"
          onClick={onClose}
          aria-label="Close edit profile modal"
        >
          &times;
        </button>

        <form id="edit-bio-form" onSubmit={handleSubmit}>
          <h2>Edit Profile Bio</h2>

          <label htmlFor="bio-image-input">Change Image</label>
          <input
            type="file"
            id="bio-image-input"
            accept="image/*"
            onChange={handleImageChange}
          />

          <label htmlFor="bio-name-input">Name</label>
          <input
            type="text"
            id="bio-name-input"
            placeholder="Enter new name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="bio-text-input">Bio</label>
          <input
            type="text"
            id="bio-text-input"
            placeholder="Enter new bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
          />

          {image && (
            <div style={{ marginTop: "0.5rem", marginBottom: "1rem" }}>
              <img
                src={image}
                alt="Profile Preview"
                style={{ maxWidth: "100%", borderRadius: "50%", height: "200px" }}
              />
            </div>
          )}

          <div className="form-actions" style={{ marginTop: "1rem" }}>
            <button type="submit">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

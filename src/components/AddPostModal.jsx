import React from "react";

export default function AddPostModal({ onClose, onAdd }) {
  const [imageSrc, setImageSrc] = React.useState(null);
  const [title, setTitle] = React.useState("");
  const fileInputRef = React.useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImageSrc(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!imageSrc || !title.trim()) {
      alert("Please provide an image and title.");
      return;
    }

    // Use 'src' and add 'alt'
    onAdd({
      src: imageSrc,
      alt: 'User uploaded image',
      title: title.trim(),
      liked: false,
    });

    // Reset form
    setTitle("");
    setImageSrc(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
    onClose();
  };

  const handleCancel = () => {
    setTitle("");
    setImageSrc(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
    onClose();
  };

  return (
    <div className="upload-modal">
      <div className="upload-modal-backdrop" onClick={handleCancel}></div>
      <div className="upload-modal-content">
        <button className="upload-close-button" onClick={handleCancel}>
          &times;
        </button>
        <form id="upload-form" onSubmit={handleSubmit}>
          <h2>New Post</h2>

          <div className="form-group">
            <label htmlFor="upload-image">Upload Image</label>
            <input
              type="file"
              id="upload-image"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              required
            />
          </div>

          {imageSrc && (
            <div className="preview-image">
              <img
                src={imageSrc}
                alt="Preview"
                style={{ maxWidth: "100%", borderRadius: "6px" , height: "200px"}}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="upload-title">Title</label>
            <input
              type="text"
              id="upload-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit">Add Post</button>
          </div>
        </form>
      </div>
    </div>
  );
}

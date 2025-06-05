export default function PostCard({ post, onClick, onToggleLike }) {
  const { src, alt, title, liked } = post;

  const heartIcon = liked
    ? 'data:image/svg+xml;utf8,<svg fill="red" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>'
    : 'src/assets/images/Union.svg';

  return (
    <div className="post-grid-item" onClick={() => onClick(post)}>
      <img className="post-image" src={src} alt={alt || title} />
      <div className="title-icon">
        <div className="title">
          <p>{title}</p>
        </div>
        <div className="title">
          <img
            src={heartIcon}
            alt="Like"
            onClick={(e) => {
              e.stopPropagation(); // prevent modal from opening
              onToggleLike(post);
            }}
          />
        </div>
      </div>
    </div>
  );
}

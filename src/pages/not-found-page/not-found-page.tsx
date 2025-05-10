
export default function NotFoundPage() {
  return (
    <div className="error-container">
      <h1 className="error-title">
        Oops! This page wandered off...
        <span className="error-subtitle">
          But you can visit our <a href="/" className="error-link">homepage</a> instead
        </span>
      </h1>

      <div className="error-image-wrapper">
        <img
          src="img/not-found.jpg"
          alt="Page is not Found"
          className="error-image"
        />
      </div>
    </div>
  );
}

import { useState } from "react";
import { useGeoLocation } from "./useGeoLocation";
export default function GeoLocation() {
  const [countClicks, setCountClicks] = useState(0);

  const { position, isLoading, error, getPosition } = useGeoLocation();
  const { lat, lng } = position;

  function handleClick() {
    setCountClicks((count) => count + 1);
    getPosition();
  }

  return (
    <div className="container">
      <button className="button" onClick={handleClick} disabled={isLoading}>
        Get my position
      </button>

      {isLoading && <p className="message loading">Loading position...</p>}
      {error && <p className="message error">{error}</p>}
      {!isLoading && !error && lat && lng && (
        <p className="coordinates">
          Your GPS position:{" "}
          <a
            className="link"
            target="_blank"
            rel="noreferrer"
            href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
          >
            {lat}, {lng}
          </a>
        </p>
      )}

      <p className="text">You requested position {countClicks} times</p>
    </div>
  );
}

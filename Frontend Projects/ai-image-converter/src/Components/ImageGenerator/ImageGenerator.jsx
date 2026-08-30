import React, { useRef, useState } from "react";
import "./ImageGenerator.css";
import default_image from "../Assets/default_image.svg";

const ImageGenerator = () => {
  const [image_url, setImage_url] = useState("/");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  let inputRef = useRef(null);

  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        "/v1/images/generations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "dall-e-3",
            prompt: `${inputRef.current.value}`,
            n: 1,
            size: "1024x1024",
          }),
        },
      );
      if (!response.ok) {
        const err = await response.json();
        console.error("API error:", response.status, err);
        const msg = err?.error?.message || JSON.stringify(err);
        setError(`API Error ${response.status}: ${msg}`);
        return;
      }
      let data = await response.json();
      let data_array = data.data;
      if (!data_array || data_array.length === 0) {
        console.error("No image data returned from API", data);
        setError("Failed to generate image. Please try again.");
        return;
      }
      setImage_url(data_array[0].url);
    } catch (err) {
      console.error("Error generating image:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-image-generator">
      <div className="header">
        Ai Image <span>generator</span>
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="img-loading"></div>
      <div className="image">
        <img src={image_url === "/" ? default_image : image_url} alt="" />
      </div>

      <div>
        <div className="search-box">
          <input
            type="text"
            ref={inputRef}
            className="search-input"
            placeholder="Describe What You Want To See"
          />
          <button
            className="generate-btn"
            onClick={() => {
              imageGenerator();
            }}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;

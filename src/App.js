import React, { useState } from "react";
import logo from "./logo.png";
import "./app.css";
import axios from "axios";
import ReactCanvasConfetti from "./confetti/confetti";

function App() {
  const [getLink, setGetLink] = useState("");
  const [stateOnChangeGetLink, setStateOnChangeGetLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [stateButton, setStateButton] = useState("");
  const [showResult, setShowResult] = useState(false);
  const onClickCallApi = async () => {
    setLoading(true);
    const response = await axios.get(
      `https://api.shrtco.de/v2/shorten?url=${stateOnChangeGetLink}`
    );
    const { short_link, short_link2, short_link3 } = response.data.result;
    console.log(stateButton === "short_link2");
    if (stateButton === "short_link1") {
      setGetLink(short_link);
    } else if (stateButton === "short_link2") {
      setGetLink(short_link2);
    } else if (stateButton === "short_link3") {
      setGetLink(short_link3);
    } else if (stateButton === "") {
      setGetLink(short_link);
    }
    setLoading(false);
    setShowResult(true);
  };
  const getLinkOnChange = (event) => {
    setStateOnChangeGetLink(event.target.value);
  };

  const getButtonClick = (e) => {
    setStateButton(e);
  };

  return (
    <div className="app-container">
      <img src={logo} alt="logo" />
      <h1>
        The <b>privacy-friendly</b> URL Shortener
      </h1>
      <div className="container">
        <div className="input-box">
          <h2>Link Shortener</h2>
          <span>Enter a Link: </span>
          <input
            type="text"
            placeholder="example.com"
            onChange={getLinkOnChange}
          />
          <button onClick={onClickCallApi}>
            <i
              id={loading ? "display-none" : ""}
              className="fa-solid fa-arrow-right"
            ></i>
            {loading && <i className="fa-solid fa-spinner fa-spin-pulse"></i>}
          </button>
        </div>
        <div className="link-box">
          <span>Short domain: </span>
          <button onClick={() => getButtonClick("short_link1")}>
            shrtco.de
          </button>
          <button onClick={() => getButtonClick("short_link2")}>9qr.de</button>
          <button onClick={() => getButtonClick("short_link3")}>
            shiny.link
          </button>
        </div>
        <p>
          With this free Link Shortener you can make Links shorter and easier to
          remember. Just enter a Link into the form and click on the above
          Button to generate a short Link. When visiting the short-Link, the
          short-Link will immediately redirect you to the long Link.
        </p>
      </div>
      <p>By using shrtcode you agree to our Terms of Service.</p>
      {showResult && (
        <div className="result">
          <label htmlFor="">Link generated!</label>
          <a href={`http://${getLink}`} target="_blank" rel="noreferrer">
            {getLink}
          </a>
          <button
            onClick={() => {
              navigator.clipboard.writeText(getLink);
              alert("Copied to clipboard");
            }}
          >
            Copy
          </button>
        </div>
      )}
      {showResult && <ReactCanvasConfetti />}

      <div className="footer">© 2022 shrtcode by QS </div>
    </div>
  );
}

export default App;

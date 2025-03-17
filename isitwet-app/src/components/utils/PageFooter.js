import React from "react";

export const PageFooter = () => {

  return (
    <footer className="page-footer">
      <div className="page-footer-grid">
        <div className="page-footer-grid__info">
          <div className="page-footer-info__message">
            <p className="page-footer-message__headline">
              <span>This application is brought to you by <a
                  id="open-meteo-link"
                  href="https://github.com/jona-sch"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  me
                </a></span>
            </p>
            <p className="page-footer-message__description">
                <span>Easy weather service using <a
                  id="open-meteo-link"
                  href="https://open-meteo.com"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Open-Meteo
                </a></span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

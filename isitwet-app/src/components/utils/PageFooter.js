import React from "react";

export const PageFooter = () => {

  return (
    <footer className="page-footer">
      <div className="page-footer-grid">
        <div className="page-footer-grid__info">
          <div className="page-footer-info__message">
            <p className="page-footer-message__headline">
              <span>This application is brought to you by https://github.com/jona-sch</span>
            </p>
            <p className="page-footer-message__description">
                <span>Easy weather service</span>
            </p>
          </div>
          <div className="page-footer-info__button">
            <a
              id="github-button"
              className="button button--secondary"
              href="https://github.com/jona-sch/isitwet"
              target="_blank"
              rel="noreferrer noopener"
            >
              Source code
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { useHistory } from "react-router-dom";

export const Auth0ProviderWithHistory = ({ children }) => {
  const history = useHistory();

  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

  const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: audience
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
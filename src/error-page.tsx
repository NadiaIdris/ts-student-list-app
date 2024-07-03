import { ErrorResponse, useRouteError } from "react-router-dom";

function ErrorBoundary() {
  const error = useRouteError() as ErrorResponse;
  return <div>{error.data}</div>;
}

export { ErrorBoundary };

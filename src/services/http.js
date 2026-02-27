const http = async (
  method,
  url,
  data,
  contentType = 'json',
  timeout = 10000
) => {
  console.log({url})
  const token = localStorage.getItem('token');
  const headers = {
  "ngrok-skip-browser-warning": "true"
};
//   const headers = {
// };

  if (contentType === 'json') {
    headers["Accept"] = "application/json";
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options = {
    method: method.toUpperCase(),
    headers
  };

  if (method.toLowerCase() !== 'get' && data) {
    options.body = JSON.stringify(data);
  }

  return Promise.race([
    fetch(url, options).then(async (response) => {

      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      if (contentType && contentType.includes("application/json")) {
        return response.json();
      } else {
        const text = await response.text();
        throw new Error("Respuesta no es JSON: " + text);
      }

    }),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), timeout)
    )
  ]);
};

export default http;
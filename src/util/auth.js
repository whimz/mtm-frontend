/**
 * Gets the authentication token from localStorage
 * Throws a Response error if token is missing
 */
export function getAuthToken() {
  const token = localStorage.getItem("token")

  if (!token) {
    throw new Response(JSON.stringify({ message: "Not authenticated" }), { status: 401 })
  }

  return token
}

/**
 * Makes an authenticated fetch request
 * Automatically includes the auth token in headers
 */
export async function authFetch(url, options = {}) {
  const token = getAuthToken()

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      ...options.headers,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Response(JSON.stringify({ message: error.error || error.message || "Request failed" }), {
      status: response.status,
    })
  }

  return response.json()
}

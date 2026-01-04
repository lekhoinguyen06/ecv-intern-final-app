const COGNITO_PREFIX = "CognitoIdentityServiceProvider"

export const clearAuthStorage = () => {
  if (typeof window === "undefined") return

  // Xóa toàn bộ key Cognito
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(COGNITO_PREFIX)) {
      localStorage.removeItem(key)
    }
  })

  // App custom keys
  localStorage.removeItem("accessToken")
  localStorage.removeItem("idToken")
  localStorage.removeItem("refreshToken")
  localStorage.removeItem("userProfile")
}

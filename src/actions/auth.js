export const login= (user)=> {
  return {
      type: "LOGIN",
      payload: user
  }
}

export const logout= (user)=> {
  return {
      type: "LOGOUT"
  }
}

export const getCurrentUser= (currentUser)=> {
  return {
      type: "CURRENT_USER",
      payload: currentUser
  }
}

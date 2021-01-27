export const authReducer= (state,action)=> {
  switch (action.type) {
      case "LOGIN":
          state= {...state, user: action.payload}
          return state

      case "LOGOUT":
          state= {...state, user: null}
          localStorage.removeItem('token')
          return state

      case "CURRENT_USER":
          state= {...state, currentUser: action.payload }
          return state

      default:
          throw new Error(`Invalid Action Type: ${action.type}`)
  }
}
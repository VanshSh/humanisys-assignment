import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'

const QueryContext = createContext()

const initialState = {
  queryCount: 0,
  queryHistory: [],
  isAuthenticated: false,
}

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('queryState')
    if (serializedState === null) {
      return initialState
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return initialState
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT_QUERY':
      return {
        ...state,
        queryCount: state.queryCount + 1,
        queryHistory: [...state.queryHistory, action.payload],
      }
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
      }
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
      }
    default:
      return state
  }
}

export const QueryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, loadState())

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      const serializedState = JSON.stringify(state)
      localStorage.setItem('queryState', serializedState)
    } catch (err) {
      console.error('Failed to save state:', err)
    }
  }, [state])

  const incrementQuery = useCallback((query) => {
    dispatch({ type: 'INCREMENT_QUERY', payload: query })
  }, [])

  const login = useCallback(() => {
    dispatch({ type: 'LOGIN' })
  }, [])

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' })
  }, [])

  const value = useMemo(
    () => ({
      queryCount: state.queryCount,
      queryHistory: state.queryHistory,
      isAuthenticated: state.isAuthenticated,
      incrementQuery,
      login,
      logout,
    }),
    [
      state.queryCount,
      state.queryHistory,
      state.isAuthenticated,
      incrementQuery,
      login,
      logout,
    ]
  )

  return <QueryContext.Provider value={value}>{children}</QueryContext.Provider>
}

export const useQuery = () => {
  const context = useContext(QueryContext)
  if (!context) {
    throw new Error('useQuery must be used within a QueryProvider')
  }
  return context
}

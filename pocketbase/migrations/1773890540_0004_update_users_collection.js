migrate(
  (app) => {
    // Migration deliberately left empty.
    // The users collection rules and the 'role' field are already correctly
    // managed by `0009_fix_auth_final.js`. This prevents invalid rule parsing errors.
  },
  (app) => {
    // No rollback needed
  },
)

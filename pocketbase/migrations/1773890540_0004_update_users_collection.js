migrate(
  (app) => {
    // No-op migration to resolve the "invalid left operand '@request.data.role'" error
    // The collection rules are properly configured in 0004_setup_users.js
  },
  (app) => {
    // No-op
  },
)

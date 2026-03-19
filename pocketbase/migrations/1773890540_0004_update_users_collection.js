migrate(
  (app) => {
    // No-op migration to fix the invalid @request.data rule issue.
    // The correct schema updates and seeds are now handled in 0004_seed_admin_user.js.
  },
  (app) => {
    // No-op
  },
)

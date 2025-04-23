export { default } from "next-auth/middleware"

export const config = { matcher: ['/log', '/getSummary', 'sign-in', 'sign-up'] }
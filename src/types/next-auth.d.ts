import 'next-auth'

declare module 'next-auth' {
    interface User {
        email: string,
        name: string,
        id: string
    }

    interface Session {
        user: {
            email: string,
            name: string,
            id: string
        }
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        email: string,
        name: string,
        id: string
    }
}
// shorthand to export the default export from next-auth/middleware
// we're exporting the default object from next-auth/middleware
export { default } from "next-auth/middleware";

//we have a variable config here so that we can control when the middleware is actually used
// set to an object
// `matcher` property set to an array of strings that represent the paths that we want to use the middleware on
export const config = {
    // if you add a * after the parameter...
    // *: zero or more parameters
    // means that if you go to users OR users/1 etc it will redirect
    // +: one or more parameters
    // ?: zero or one parameters
    matcher: ['/users/:id*',
    '/update',
    // in a real app... something like
    '/dashboard/:path*'] //will protect all routes that start with /dashboard
}
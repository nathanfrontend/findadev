import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";
// export default async function middleware(
//   req: NextRequest,
//   event: NextFetchEvent,
// ) {
//   const token = await getToken({ req });
//   const isAuthenticated = !!token;
//   console.log(token);
//   console.log(req.nextUrl.pathname);
//   if (isAuthenticated && req.nextUrl.pathname === "/") {
//     return NextResponse.redirect(new URL("/browse", req.url));
//   } else if (!isAuthenticated) {
//     return NextResponse.redirect(new URL("/", req.url));
//   }
//   // return NextResponse.next();
// }
export const config = {
  matcher: ["/your-rooms", "/browse", "/edit-room", "/create-room"],
};

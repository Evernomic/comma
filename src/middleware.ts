import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";
import { isSiteProtected } from "./lib/edge";

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const path = url.pathname;
  const hostname = req.headers.get("host")!;
  const session = await getToken({ req });
  const searchParams = `?${url.searchParams.toString()}`;
  const userDomain = process.env.NEXT_PUBLIC_USER_DOMAIN as string
  const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN as string;
  const vercelDomain = ".vercel.app";
  if (
    (hostname.endsWith(appDomain) || hostname.endsWith(vercelDomain)) &&
    !hostname.startsWith("app") &&
    !hostname.includes("localhost")
  ) {

    if (path === "/" && session) {
      return NextResponse.redirect(process.env.NEXT_PUBLIC_APP_URL as string);
    }
    if (path === "/" && !session) {
      return NextResponse.rewrite(new URL("/home", req.url));
    }
  }

  if (hostname === `app.${appDomain}`) {
    const isAuthPage = path === "/login" || path === "/signup";
    if (session && isAuthPage) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (!session && !isAuthPage) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.rewrite(
      new URL(
        `/app${path === "/" ? "" : path}${
          url.searchParams ? searchParams : ""
        }`,
        req.url,
      ),
    );
  }


  if(hostname.endsWith(`.${process.env.NEXT_PUBLIC_LEGACY_USER_DOMAIN}`)) {
    const username = hostname.split(`.${process.env.NEXT_PUBLIC_LEGACY_USER_DOMAIN}`)[0]
    return NextResponse.redirect(`https://${username}.${userDomain}`)
  }

  if (hostname.endsWith(`.${userDomain}`)) {
    const domain = hostname.split(`.${userDomain}`)[0];
    const password = await isSiteProtected(domain);
    if (password) {
      const cookiePassword = req.cookies.get(domain)?.value;
      if (cookiePassword === password) {
        return NextResponse.rewrite(
          new URL(
            `/user/${domain}${path === "/" ? "" : path}${
              url.searchParams ? searchParams : ""
            }`,
            req.url,
          ),
        );
      }
      return NextResponse.rewrite(new URL(`/protected`, req.url), {
        headers: {
          "X-Domain": domain,
        },
      });
    }
    return NextResponse.rewrite(
      new URL(
        `/user/${domain}${path === "/" ? "" : path}${
          url.searchParams ? searchParams : ""
        }`,
        req.url,
      ),
    );
  }

  if (!hostname.includes(userDomain) && !hostname.endsWith(vercelDomain) && !hostname.includes(process.env.NEXT_PUBLIC_LEGACY_USER_DOMAIN!)) {
    const password = await isSiteProtected(hostname);
    if (password) {
      const cookiePassword = req.cookies.get(hostname)?.value;
      if (cookiePassword === password) {
        return NextResponse.rewrite(
          new URL(
            `/user/${hostname}${path === "/" ? "" : path}${
              url.searchParams ? searchParams : ""
            }`,
            req.url,
          ),
        );
      }
      return NextResponse.rewrite(new URL(`/protected`, req.url), {
        headers: {
          "X-Domain": hostname,
        },
      });
    }
    
    return NextResponse.rewrite(
      new URL(
        `/user/${hostname}${path === "/" ? "" : path}${
          url.searchParams ? searchParams : ""
        }`,
        req.url,
      ),
    );
  }
}

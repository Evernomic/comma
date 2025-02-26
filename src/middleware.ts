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
  const [
    appDomain,
    userDomain,
    legacyAppDomain,
    legacyUserDomain,
    vercelDomain,
  ] = [
    process.env.NEXT_PUBLIC_USER_DOMAIN!,
    process.env.NEXT_PUBLIC_APP_DOMAIN!,
    process.env.NEXT_PUBLIC_LEGACY_APP_DOMAIN!,
    process.env.NEXT_PUBLIC_LEGACY_USER_DOMAIN!,
    ".vercel.app",
  ];

  if (hostname.includes(legacyUserDomain)) {
    if (hostname.startsWith("app") && hostname.endsWith(legacyAppDomain)) {
      return NextResponse.redirect(
        new URL(url.pathname + url.search, process.env.NEXT_PUBLIC_APP_URL!),
        { status: 308 },
      );
    }

    if (hostname.startsWith("go") && hostname.endsWith(legacyUserDomain)) {
      return NextResponse.redirect(
        new URL(url.pathname, `https://go.${appDomain}`),
        { status: 308 },
      );
    }

    if (hostname === legacyAppDomain) {
      return NextResponse.redirect(process.env.NEXT_PUBLIC_URL!, {
        status: 308,
      });
    }

    const domain = hostname.split(`.${legacyUserDomain}`)[0];

    return NextResponse.redirect(
      new URL(url.pathname + url.search, `http://${domain}.${userDomain}`),
      { status: 308 },
    );
  }

  if (
    (hostname.endsWith(appDomain) || hostname.endsWith(vercelDomain)) &&
    !hostname.startsWith("app") &&
    !hostname.includes("localhost")
  ) {
    if (path === "/" && session) {
      return NextResponse.redirect(process.env.NEXT_PUBLIC_APP_URL!);
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

  if (hostname.endsWith(`.${userDomain}`) && hostname.endsWith(`.${userDomain}`)) {
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

  if (!hostname.includes(userDomain) && !hostname.endsWith(vercelDomain)) {
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

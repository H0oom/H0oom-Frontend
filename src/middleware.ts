import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (req: NextRequest) => {
  const cookieHeader = req.headers.get('cookie');
  let token: string | null = null;

  if (cookieHeader) {
    const cookies = cookieHeader.split(';').reduce(
      (acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        acc[key] = value;
        return acc;
      },
      {} as Record<string, string>,
    );

    token = cookies['accessToken'] || null;
  }

  const protectedPaths = ['/users', '/chat', '/call'];
  const isProtectedPath = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path),
  );

  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  if (req.nextUrl.pathname === '/auth' && token) {
    return NextResponse.redirect(new URL('/users', req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

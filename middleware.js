import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// Função middleware para lidar com a autenticação e redirecionamento
export function middleware(request) {
  // Obter o cookie auth
  const auth = request.cookies.get("auth");

  // Se o user não estiver autenticado e tentar aceder à página /posts, redirecionar para a página de login
  if (request.nextUrl.pathname.startsWith("/posts") && !auth) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Se o user estiver autenticado e tentar aceder à página de login, redirecionar para a página /posts
  if (request.nextUrl.pathname === "/" && auth) {
    return NextResponse.redirect(new URL("/posts", request.url));
  }

  // Permitir que o request prossiga
  return NextResponse.next();
}

// Configuração para o middleware corresponder a rotas específicas
export const config = {
  matcher: ["/", "/posts/:path*"],
};

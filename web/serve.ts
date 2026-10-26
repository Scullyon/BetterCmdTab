import { join, sep } from "node:path";

// `<dir>/index.html` for a slashed URL, a bare dir 301s to the slashed one, /404.html for
// anything missing.
const root = join(import.meta.dir, "out");
const notFound = () => new Response(Bun.file(join(root, "404.html")), { status: 404 });
const redirect = (location: string) =>
  new Response(null, { status: 301, headers: { Location: location } });

Bun.serve({
  port: Number(process.env.PORT ?? 3000),
  async fetch(req) {
    const { pathname, search } = new URL(req.url);
    // The Polish docs once lived at /pl/; Google still crawls those URLs.
    if (pathname === "/pl" || pathname.startsWith("/pl/"))
      return redirect(`/docs${pathname}${search}`);

    const path = join(root, decodeURIComponent(pathname));
    if (path !== root && !path.startsWith(root + sep)) return notFound();

    const file = Bun.file(pathname.endsWith("/") ? join(path, "index.html") : path);
    if (!(await file.exists())) {
      if (!(await Bun.file(join(path, "index.html")).exists())) return notFound();
      return redirect(`${pathname}/${search}`);
    }

    // Vite (/assets/) and Next (/docs/_next/static/) content-hash these, so a change gets a new URL.
    const headers: Record<string, string> = {};
    if (pathname.startsWith("/assets/") || pathname.startsWith("/docs/_next/static/")) {
      headers["Cache-Control"] = "public, max-age=31536000, immutable";
    } else if (/\.(png|jpe?g|webp|wav)$/.test(pathname)) {
      // Not hashed, but replaced rarely: a week of staleness after a redesign is the trade.
      headers["Cache-Control"] = "public, max-age=604800";
    }
    return new Response(file, { headers });
  },
});

import { Header } from "../Header";
import { Footer } from "../Footer";

/** Header, main and footer for every inner page. */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div id="top" className="flex flex-1 flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

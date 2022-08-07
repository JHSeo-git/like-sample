import Link from 'next/link';

export interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <header className="container mx-auto px-2 fixed top-2 left-0 right-0 z-30">
        <nav className="navbar bg-base-200 border-base-300 shadow-xl rounded-lg">
          <Link href="/" passHref>
            <a className="btn btn-ghost">Home</a>
          </Link>
          <Link href="/items" passHref>
            <a className="btn btn-ghost">List</a>
          </Link>
        </nav>
      </header>
      <main className="container mx-auto mt-24 px-4">{children}</main>
    </>
  );
}

export default Layout;

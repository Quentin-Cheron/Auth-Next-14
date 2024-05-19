export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="centered">{children}</main>;
}

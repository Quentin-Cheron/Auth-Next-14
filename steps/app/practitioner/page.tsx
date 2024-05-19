import Link from "next/link";

export default function PractitionerPage() {
  return (
    <div className="h-full flex flex-col gap-10 items-center justify-center">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold text-white drop-shadow-md">
          Auth
        </h1>
        <p className="text-white text-lg">A simple authtentification service</p>
        <div>
          <Link href="/practitioner">Êtes vous practicien ?</Link>
        </div>
      </div>
    </div>
  );
}

import { RegisterForm } from "@/components/auth/register-form";
import { Button } from "@/components/ui/button";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <Card>
      <CardHeader>
        <h1 className="text-lg">Comment voulez-vous créer votre compte ?</h1>
      </CardHeader>
      <CardContent className="flex justify-between">
        <Button>
          <Link href="/auth/register/patient">Patient</Link>
        </Button>
        <Button>
          <Link href="/auth/register/pro">Professionel de santé</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

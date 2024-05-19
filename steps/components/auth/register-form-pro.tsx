"use client";
import { Fragment } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useTransition } from "react";

import { RegisterSchema } from "@/schemas";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { CardWrapper } from "@/components/auth/card-wrapper";
import StepIndicator from "@/components/auth/step-indicator";

import { FormSuccess, FormError } from "@/components/form-messages";

import { register } from "@/actions/register";

import { Loader2 } from "lucide-react";

import { CardStepInput, CardStepSelect } from "@/components/auth/card-step";

import { steps } from "@/data/steps";

export function RegisterForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [step, setStep] = useState(1);
  const totalSteps = steps.length;

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      phone: "",
      profession: "",
      otherProfession: "",
      speciality: "",
      description: "",
      address: "",
      city: "",
      zip: "",
      country: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  const fetchError = () => {
    setError("Des champs sont manquants ou incorrects");
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const goToStep = (step: number) => setStep(step);

  return (
    <CardWrapper
      headerLabel="Créer votre compte professionnel"
      headerTitle="Inscription"
      backButtonLabel="Vous avez déjà un compte ?"
      backButtonHref="/auth/login"
      showSocial
    >
      <StepIndicator
        currentStep={step}
        totalSteps={totalSteps}
        onStepClick={goToStep}
        titleStep={steps}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, fetchError)}
          className="space-y-6"
        >
          <h2 className="text-xl font-semibold text-gray-800">
            {steps[step - 1].title}
          </h2>
          {steps[step - 1].fields.map((step) => {
            const isProfessionStep = step.name === "profession";
            return (
              <Fragment key={step.name}>
                {step.fields ? (
                  <CardStepSelect
                    control={form.control}
                    name={step.name}
                    label={step.label}
                    placeholder={step.placeholder}
                    fields={step.fields}
                    isPending={isPending}
                  />
                ) : (
                  <CardStepInput
                    control={form.control}
                    name={step.name}
                    label={step.label}
                    type={step.type}
                    placeholder={step.placeholder}
                    isPending={isPending}
                  />
                )}
                {isProfessionStep &&
                  form.getValues("profession") === "Other" && (
                    <CardStepInput
                      control={form.control}
                      name="otherProfession"
                      label="Other profession"
                      type="text"
                      placeholder="Other profession"
                      isPending={isPending}
                    />
                  )}
              </Fragment>
            );
          })}

          <div className="flex items-center justify-between">
            {step > 1 && (
              <Button
                type="button"
                onClick={prevStep}
                disabled={isPending}
                variant="secondary"
              >
                Previous
              </Button>
            )}
            {step < totalSteps && (
              <Button type="button" onClick={nextStep} disabled={isPending}>
                Next
              </Button>
            )}
            {step === totalSteps && (
              <Button type="submit" disabled={isPending}>
                {isPending ? <Loader2 className="w-6 h-6" /> : "Create account"}
              </Button>
            )}
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
        </form>
      </Form>
    </CardWrapper>
  );
}

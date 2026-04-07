import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { DateOfBirth } from "@/features/auth/components/DateOfBirth";
import { useForm, Controller } from "react-hook-form";
import { registerSchema, type RegisterFormValues } from "@/features/auth/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRegister } from "@/features/auth/hooks/use-register";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register: formRegister,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
  });

  const { register, isLoading } = useRegister();

  const handleRegister = async (data: RegisterFormValues) => {
    console.log("Register-> Dữ liệu sẵn sàng gửi đi: ", data);
    // Giả lập gửi API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    register(data);
  };

  const onError = (errors: any) => {
    console.log("Register Errors: ", errors);
    toast.error("Vui lòng kiểm tra lại thông tin đăng ký", {
      position: "top-right",
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleRegister, onError)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...formRegister("email")}
                />
                <FieldError className="text-xs" errors={[errors.email]} />
              </Field>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  placeholder="johndoe"
                  {...formRegister("username")}
                />
                <FieldError className="text-xs" errors={[errors.username]} />
              </Field>
              <Field className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    {...formRegister("password")}
                  />
                  <FieldError className="text-xs" errors={[errors.password]} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirm-password">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    id="confirm-password"
                    type="password"
                    {...formRegister("confirmPassword")}
                  />
                  <FieldError className="text-xs" errors={[errors.confirmPassword]} />
                </Field>
              </Field>
              <Field className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="name">Full Name</FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    {...formRegister("name")}
                  />
                  <FieldError className="text-xs" errors={[errors.name]} />
                </Field>
                <Field>
                  <Controller
                    name="dob"
                    control={control}
                    render={({ field }) => (
                      <DateOfBirth
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.dob?.message}
                      />
                    )}
                  />
                </Field>
              </Field>

              <Field>
                <Button type="submit" disabled={isSubmitting || isLoading}>
                  {isSubmitting || isLoading ? "Creating..." : "Create Account"}
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <a href="/login">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}

import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, "Username phải có ít nhất 3 ký tự"),
  password: z.string().min(1, "Mật khẩu không được để trống"),
});

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username phải có ít nhất 3 ký tự")
      .max(20, "Username không quá 20 ký tự")
      .regex(/^[a-zA-Z0-9_]+$/, "Username chỉ chứa chữ, số và dấu gạch dưới"),

    email: z.string().email("Định dạng Email không hợp lệ"),

    password: z.string().min(3, "Mật khẩu phải từ 8 ký tự trở lên"),
    confirmPassword: z.string().min(1, "Phải nhập xác nhận mật khẩu"),

    name: z.string().min(2, "Tên không được để trống").max(50, "Tên quá dài"),

    dob: z
      .string()
      .refine((date) => !isNaN(Date.parse(date)), {
        message: "Ngày sinh không đúng định dạng (YYYY-MM-DD)",
      })
      .refine((date) => {
        const birthDate = new Date(date);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }

        return age >= 13;
      }, "Bạn phải từ 13 tuổi trở lên"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Xác nhận mật khẩu không khớp",
    path: ["confirmPassword"],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email?: string;
  };
}

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Cookies from 'js-cookie';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { axiosClient } from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import { STUDENT_DASHBORD_ROUTE } from "../../router";
import { Loader } from "lucide-react";

const formSchema = z.object({
  email: z.string().email().min(2).max(50),
  password: z.string().min(4).max(50),
});

export default function StudentLogin() {
    const navigate = useNavigate()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "ouss123maelmouh@gmail.com",
      password: "password",
    },
  }) 
  const { setError, formState: { isSubmitting } } = form;

 /*  const onSubmit = async (values) => {
    try {
        await axiosClient.get('/sanctum/csrf-cookie')
      const response = await axiosClient.post('/login', values);
  
      if (response.status === 204) {
        navigate(STUDENT_DASHBORD_ROUTE);
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        if (errors.email) {
          setError("email", { message: errors.email.join() });
        }
        if (errors.password) {
          setError("password", { message: errors.password.join() });
        }
      } else {
        console.error(error);
      }
    }
  }; */
  const getCsrfToken = () => {
    return Cookies.get('XSRF-TOKEN');
  };
  const onSubmit = async (values) => {
    try {
      await axiosClient.get('/sanctum/csrf-cookie',{
        baseURL: import.meta.env.VITE_BACKEND_URL
      });
      const csrfToken = getCsrfToken();
      if (!csrfToken) {
        throw new Error("Jeton CSRF non trouvé.");
      }
      const response = await axiosClient.post('/login', values, {
        headers: {
          'X-XSRF-TOKEN': csrfToken,  // Ceci est crucial
        },
      });
      if (response.status === 204) {
        window.localStorage.setItem('ACCES_TOKEN','test')
        navigate(STUDENT_DASHBORD_ROUTE);
      }
    } catch (error) {
      if (error.response?.status === 419) {
        setError("root", { message: "Session expirée. Rafraîchissez la page." });
      } else {
        // Gestion des autres erreurs
        console.error(error);
      }
    }
  };
      
  

  return (
    <div  >
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type={'password'}  placeholder="password" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isSubmitting} type="submit">
            {isSubmitting && <Loader className={'mx-2 my-2 animate-spin'}/>} {''}Login
            </Button>
      </form>
    </Form>
    </div>
  );
}

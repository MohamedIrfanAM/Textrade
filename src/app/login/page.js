"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Link from "next/link"
import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import { useSearchParams } from 'next/navigation'
import { useEffect } from "react"
import { signIn, useSession } from 'next-auth/react' 

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { DialogBox } from "@/components/VerifyEmailDialog"
import { useRouter } from "next/navigation"
import { Toaster } from "@/components/ui/toaster"

const FormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
})

export default function InputForm() {

  const router = useRouter()
  const [openVerifyEmailDialog,setOpenVerifyEmailDialog] = useState(false)
  const {status} = useSession()

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues:{
      name:'',
      email:'',
      department:'',
      year:'',
      password:'',
      confirmPassword:''
    }
  })

  // Verify email if email and token is present in url
  const searchParams = useSearchParams();
  let urlEmail = searchParams.get('email');
  let token = searchParams.get('token');
  let callBackUrl = searchParams.get('callbackUrl');

  useEffect(() => {
    if(urlEmail != null && token != null) {
      axios.post('api/auth/verifyEmail',JSON.stringify({email:urlEmail,token:token})).then(async (res) => {
        if(res.status == 201){
          urlEmail = null;
          token = null;
          toast({title: "User Verified", description: "User verification successfull login to continue"})
        }
      }).catch((err) => {
        router.push('/signup');
        toast({title: "Error", description: "Invalid verification link,please try again"})
      })
    }
    else if(callBackUrl != null) {
      toast({title: "Authentication Required", description: "Please log in to continue"})
    }
  },[])

  // Redirect to dashboard if already logged in
  if(status == 'loading') return <div>Loading...</div>
  else if(status == 'authenticated' && urlEmail == null && token == null && callBackUrl == null) {
    router.push('/');
    return <div>Redirecting...</div>
  }

  async function onSubmit(data) {
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect:false
    })
    if(!res.error){
      toast({title: "Login Successfull", description: "Redirecting to dashboard"})
      if(callBackUrl != null) router.push(callBackUrl)
      else router.push('/')
    }
    if(res.error == "Invalid Email") {
      form.setError('email', { type: 'custom', message: 'No account found for this email address'}, { shouldFocus: true });
    }
    else if(res.error == "Invalid Password") {
      form.setError('password', { type: 'custom', message: 'Incorrect password'}, { shouldFocus: true });
    }
    else if(res.error == 'Not Activated'){
      toast({title: "Error", description: "Account found, but not activated.Please check you mail to activate your account"})
    }
    else if(res.error){
      toast({title: "Error", description: "Something went wrong, please try again"})
    }
  } 

  return (
    <>
      <DialogBox open={openVerifyEmailDialog} onOpenChange={setOpenVerifyEmailDialog}/>
      <div className="flex flex-col items-center h-full justify-center gap-6 p-3">
        <h1 className="text-5xl">textrade.store</h1>
        <div className="w-[min(100%,450px)] flex flex-col items-center border border-3 border-black p-2 space-y-2 rounded-lg">
          <h1 className="text-black text-2xl">Login</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-3/4 space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="mail@example.com" {...field} />
                    </FormControl>
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
                      <Input type='password' placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Login</Button>
            </form>
          </Form>
          <Link href={'/signup'} className="text-sm pb-1">Don&apos;t have an account?<span className="underline">Sign up</span></Link>
        </div>
      </div>
      <Toaster/>
    </>
  )
}
"use client"
 
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { ProfileSchema } from "@/lib"
import { usePathname, useRouter } from "next/navigation"
import { updateUser } from "@/lib/actions/user.action"

interface Props {
    user:string;
    clerkId:string
}
const Profile = ({user,clerkId}:Props) => {
    const parsedUser=JSON.parse(user)
    const pathname=usePathname()
    const [isSubmiting,setIsSubmitiing]=useState(false)
const router =useRouter()
    const form = useForm<z.infer<typeof ProfileSchema>>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
          name: parsedUser.name || '',
          username:parsedUser.username ||'',
          location:parsedUser.location ||'',
          bio:parsedUser.bio ||'',
          portfolioWebsite:parsedUser.username ||'',

          

        },
      })
      // 2. Define a submit handler.
     async function onSubmit(values: z.infer<typeof ProfileSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
     setIsSubmitiing(true)
     try {
// update user server action 
await updateUser ({clerkId,updateData:{
    name:values.name,
    username:values.username,
    bio:values.bio,
    portfolioWebsite:values.portfolioWebsite,
    location:values.location,
},path:pathname})
router.back()
     }catch(error){
console.log(error);

     }finally{
        setIsSubmitiing(false)
     }
      }
    
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-9 flex w-full gap-9 flex-col">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="space-y-3.5">
            <FormLabel className="paragraph-semibold text-dark400_light800 ">Name <span className="text-primary-500">*</span></FormLabel>
            <FormControl>
              <Input placeholder="Your name" {...field} className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border" />
            </FormControl>
            
            <FormMessage />
          </FormItem>
        )}
      />
       <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem className="space-y-3.5">
            <FormLabel className="paragraph-semibold text-dark400_light800 ">Username <span className="text-primary-500">*</span></FormLabel>
            <FormControl>
              <Input placeholder="Your username" {...field} className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border" />
            </FormControl>
            
            <FormMessage />
          </FormItem>
        )}
      />
       <FormField
        control={form.control}
        name="portfolioWebsite"
        render={({ field }) => (
          <FormItem className="space-y-3.5">
            <FormLabel className="paragraph-semibold text-dark400_light800 ">Portfolio Link </FormLabel>
            <FormControl>
              <Input type="url" placeholder="Your portfolio URL " {...field} className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border" />
            </FormControl>
            
            <FormMessage />
          </FormItem>
        )}
      />
             <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem className="space-y-3.5">
            <FormLabel className="paragraph-semibold text-dark400_light800 ">Location</FormLabel>
            <FormControl>
              <Input  placeholder="Where are your form? " {...field} className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border" />
            </FormControl>  
            
            <FormMessage />
          </FormItem>
        )}
      />
                   <FormField
                  render={({ field }) => (
                      <FormItem className="space-y-3.5">
                          <FormLabel className="paragraph-semibold text-dark400_light800 ">Bio<span className="text-primary-500"> *</span></FormLabel>
                       
                          <Textarea {...field} placeholder="What's special about you? " className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px]" />
                          <FormMessage />
                      </FormItem>
                  )} name={"bio"}      />

      <div className="mt-7 flex justify-end">
      <Button disabled={isSubmiting} type="submit" className="primary-gradient w-fit">{isSubmiting?"Saving...":"Save"}</Button>

      </div>

    </form>
  </Form>
  )
}

export default Profile
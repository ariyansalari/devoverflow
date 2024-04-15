'use client'
import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod"
import { QuestionsSchema } from '@/lib'
import { z } from "zod"





const Question = () => {
    const form = useForm<z.infer<typeof QuestionsSchema>>({
        resolver: zodResolver(QuestionsSchema),
        defaultValues: {
          title: "",
          explanation:'',
          tags:[]
        },
      })
    
      // 2. Define a submit handler.
      function onSubmit(values: z.infer<typeof QuestionsSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }
  return (
    
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" flex w-full flex-col gap-10">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className='flex  w-full  flex-col '>
              <FormLabel className='paragraph-semibold text-dark400_light800 '>Question Title <span className='text-primary-500'>*</span></FormLabel>
              <FormControl className='mt-3.5'>
                <Input className='paragragph-regular no-focus background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border' placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription className='body-regular mt-2.5 text-light-500'>
                Be specific and imagine you&apos;re asking a question  to another person.
              </FormDescription>
              <FormMessage className='text-red-500'/>
            </FormItem>
          )}
        />
      
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className='flex  w-full  flex-col  gap-3'>
              <FormLabel className='paragraph-semibold text-dark400_light800 '>Detailed explanation of your problem  <span className='text-primary-500'>*</span></FormLabel>
              <FormControl className='mt-3.5'>
                {/* /TODO : add an editor component */}
              </FormControl>
              <FormDescription className='body-regular mt-2.5 text-light-500'>
              introduce the problem and expand on what you put in the title. Minimum 20 characters.

              </FormDescription>
              <FormMessage className='text-red-500'/>
            </FormItem>
          )}
        />
              <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className='flex  w-full  flex-col '>
              <FormLabel className='paragraph-semibold text-dark400_light800 '>Tags <span className='text-primary-500'>*</span></FormLabel>
              <FormControl className='mt-3.5'>
                <Input  className='paragragph-regular no-focus background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border' placeholder="Add tags..." {...field} />
              </FormControl>
              <FormDescription className='body-regular mt-2.5 text-light-500'>
                Be specific and imagine you&apos;re asking a question  to another person.
              </FormDescription>
              <FormMessage className='text-red-500'/>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default Question
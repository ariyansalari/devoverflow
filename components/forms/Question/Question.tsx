'use client'
import React, { useRef, useState } from 'react'
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
import { QuestionsSchema, createQuestion } from '@/lib'
import { z } from "zod"
import { Editor } from '@tinymce/tinymce-react';
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { useRouter,usePathname } from 'next/navigation'



const type:any='create';
interface Props {
  mongoUserId:string;
}
const Question = ({mongoUserId}:Props) => {
  console.log(mongoUserId);
  
  const router =useRouter()
  const pathname=usePathname()
  const editorRef = useRef(null);
const [isSubmiting,setIsSubmitiing]=useState(false)
    const form = useForm<z.infer<typeof QuestionsSchema>>({
        resolver: zodResolver(QuestionsSchema),
        defaultValues: {
          title: "",
          explanation:'',
          tags:[]
        },
      })
      const handleInputKeyDown =(e:React.KeyboardEvent<HTMLInputElement>,field:any)=>{
        if(e.key==='Enter' && field.name==="tags"){
          e.preventDefault()
          const tagInput =e.target as HTMLInputElement
          const tagValue =tagInput.value.trim()
          console.log(tagValue);
          
          if( tagValue!==''){
            if(tagValue.length>15){
              return form.setError ('tags',{
                type:"required",
                message :"Tag must be less than 15 characters"
              }
            )
            }
            if(!field.value.includes(tagValue as never)){
              form.setValue('tags',[...field.value,tagValue]);
              tagInput.value=''
              form.clearErrors('tags')
            }
          }else {
            form.trigger()
          }
        }
      }
      const handleTagRemove=(tag:string,field:any)=>{
        const newTags= field.value.filter((t:string)=>t!==tag)
        form.setValue('tags',newTags)

      }
      const onSubmit = async (values: z.infer<typeof QuestionsSchema>) => {
        setIsSubmitiing(true);
    
        try {
   
            await createQuestion({
              title: values.title,
              content: values.explanation,
              tags: values.tags,
              author: JSON.parse(mongoUserId),
              path: pathname,
            });
            router.push("/");
          
        } catch (error) {
        } finally {
          setIsSubmitiing(false);
        }
      };

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
              <Editor
              onBlur={field.onBlur}
              onEditorChange={(content)=>field.onChange(content)}
        apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
      
        onInit={(_evt, editor) => {
          // @ts-ignore
          editorRef.current = editor}}
        initialValue=""
        init={{
          height:350,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'codesample', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | codesample | ' +
            'bold italic forecolor | alignleft aligncenter |' +
            'alignright alignjustify | bullist numlist   | ' +
            'removeformat | help',
          content_style: 'body { font-family:Inter;font-size:16px }'
        }}
      />
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
                <>
                <Input onKeyDown={(e)=>handleInputKeyDown(e,field)}  className='paragragph-regular no-focus background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border' placeholder="Add tags..." />

                {field.value.length>0 && (
                <div className='flex-start mt-2.5 gap-2.5'>

                    {field.value.map((tag:any)=>(
                      <Badge key={tag} className='subtle-medium text-light-400 background-light800_dark300 flex items-center justify-center gap-2 rounded-lg border-none px-4 py-2 capitalize' onClick={()=>handleTagRemove(tag,field)}>
                        {tag}
                        <Image 
                        alt='Close icon'
                        width={12}
                        height={12}
                        src={'/assets/icons/close.svg'}
                        className='cursor-pointer object-contain invert-0 dark:invert'
                        />
                      </Badge>
                    ))}
                </div>

                )}

                </>

              </FormControl>
              <FormDescription className='body-regular mt-2.5 text-light-500'>
                Be specific and imagine you&apos;re asking a question  to another person.
              </FormDescription>
              <FormMessage className='text-red-500'/>
            </FormItem>
          )}
        />
        <Button type="submit" className='primary-gradient w-fit !text-light-900' disabled={isSubmiting}>
          {isSubmiting?(<>
          {type==='edit'?"Editing...":"Posting..."}
          </>):(<>
          {type==='edit'?"Edit Question":"Ask a Question"}</>)}
        </Button>
      </form>
    </Form>
  )
}

export default Question
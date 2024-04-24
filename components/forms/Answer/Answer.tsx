'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem , FormMessage } from '@/components/ui/form'
import { useTheme } from '@/context'
import { AnswerSchema } from '@/lib'
import { createAnswer } from '@/lib/actions/answer.action'
import { zodResolver } from '@hookform/resolvers/zod'
import { Editor } from '@tinymce/tinymce-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
interface Props {
  question:string;
  questionId:string;
  authorId:string
}
const Answer = ({question,questionId,authorId}:Props) => {
  const pathname=usePathname()
  const [isSubmiting,setIsSubmitiing]=useState(false)
  const [isSubmitingAi,setIsSubmitiingAi]=useState(false)

  const editorRef=useRef(null)
  const form =useForm<z.infer<typeof AnswerSchema>>({
    resolver:zodResolver(AnswerSchema),
    defaultValues:{
      answer:""
    }
  })
  const {mode}=useTheme()
  
  const handleCreateAnswer=async(values:z.infer<typeof AnswerSchema>)=>{
    setIsSubmitiing(true)
    try{
await createAnswer({
content:values.answer,
author:JSON.parse(authorId),
question:JSON.parse(questionId),
path:pathname
})

form.reset()

if(editorRef.current){
  const editor =editorRef.current as any;
  editor.setContent('')
}
    }catch(error){
console.log(error);

    }finally{
      setIsSubmitiing(false)
    }
  }
  const generateAiAnswer=async()=>{
    if(!authorId) return 
    setIsSubmitiingAi(true)
    try{
const response=await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/chatgpt`,{
  method:"POST",
  body:JSON.stringify({question})
})
const aiAnswer=await response.json()

alert(aiAnswer.reply)
    }catch(error){
console.log(error);

    }finally{
      setIsSubmitiingAi(false)
    }
  }
  return (
    <div>
<div className='flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2 mt-8'>
  <h4 className='paragraph-semibold text-dark400_light800  '>Write your answer here</h4>
  <Button className='btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500 ' onClick={generateAiAnswer}>
    <Image src={'/assets/icons/stars.svg'} alt='start' width={12} height={12} className='object-contain'/>

    Generate an AI Answer</Button>
</div>
    <Form {...form}  >
      <form className='mt-6 flex w-full flex-col gap-10' onSubmit={form.handleSubmit(handleCreateAnswer)}>
      <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem className='flex  w-full  flex-col  gap-3'>
              <FormControl className='mt-3.5'>
              <Editor
              onBlur={field.onBlur}
              onEditorChange={(content)=>field.onChange(content)}
        apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
      
        onInit={(_evt, editor) => {
          // @ts-ignore
          editorRef.current = editor}}
      
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
          content_style: 'body { font-family:Inter;font-size:16px }',
          skin:mode==='dark'?"oxide-dark":"oxide",
          content_css:mode==='dark'?"dark":"light"
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
        <div className='flex justify-end '>
          <Button type='submit' className='primary-gradient w-fit text-white' disabled={isSubmiting}>{isSubmiting?'Submitting...':"Submit"}</Button>
        </div>
      </form>
    </Form>
    </div>

  )
}

export default Answer
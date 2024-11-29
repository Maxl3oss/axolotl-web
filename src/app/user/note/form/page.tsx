'use client';

import Editor from '@/components/base/Editor';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createNote, fetchNoteById, NoteReq, TypeNote, updateNote } from '@/service/note.services';
import authStore from '@/store/authStore';
import { CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';

const formSchema = z.object({
  id: z.number(),
  title: z.string().min(2).max(50),
  description: z.string().min(2),
  createdBy: z.string(),
  noteCode: z.string(),
});

function FormNote() {
  const { noteCode }: { noteCode: string } = history.state;
  const router = useRouter();
  const { getUserSession } = authStore();
  const userInfo = getUserSession();
  const [data, setData] = useState<TypeNote | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 0,
      noteCode: '',
      title: 'undefined',
      description: '',
      createdBy: '',
    },
  });

  useEffect(() => {
    if (noteCode) {
      Promise.all([fetchData(userInfo?.id ?? '', noteCode)]);
      form.setValue('noteCode', noteCode);
      form.setValue('createdBy', userInfo?.id || '');
    }
  }, [noteCode, userInfo, form]);

  useEffect(() => {
    if (data) {
      form.setValue('id', data.id);
      form.setValue('title', data.title);
      form.setValue('description', data.description);
    }
  }, [data, form]);

  const fetchData = async (uid: string, code: string) => {
    const res = await fetchNoteById(uid, code);
    if (res && res.taskStatus && res.statusCode === 200) {
      setData(res.data);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data = { ...values };
    data.createdBy = userInfo?.id ?? "";
    const isEdit = data.noteCode !== '';

    const res = isEdit ? await updateNote(data) : await createNote(data);
    if (res && res.taskStatus && res.statusCode === 200) {
      toast(`${isEdit ? 'Updated' : 'Created'} note successfully`, {
        description: '',
        icon: <CheckCircle2 className="text-green-500" />,
      });
      router.push('/user/note');
    } else {
      toast(`${isEdit ? 'Updated' : 'Created'} note failed`, {
        description: res?.message ?? '',
        icon: <XCircle className="text-red-500" />,
      });
    }
  };

  return (
    <section className="md:mt-5 grid flex-1 items-start gap-4 md:p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="mx-auto grid flex-1 auto-rows-max gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="max-w-[80vw] flex flex-wrap">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex grow-0">
                    <FormControl>
                      <input type="text" className="input-title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="ml-auto hidden md:flex items-center justify-center gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => router.replace('/user/note')}>
                  Discard
                </Button>
                <Button type="submit" size="sm">
                  {form.getValues('noteCode') ? 'Update' : 'Save'}
                </Button>
              </div>
            </div>
            <div className="w-[80vw] md:w-[60vw]">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Editor content={field.value} onChange={(value) => field.onChange(value)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="ml-auto md:hidden flex items-center justify-center gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => router.replace('/user/note')}>
                Discard
              </Button>
              <Button type="submit" size="sm">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}

export default FormNote;

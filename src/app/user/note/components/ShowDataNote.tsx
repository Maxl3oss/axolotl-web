'use client';

import MarkdownRenderer from '@/components/base/MarkdownRenderer';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { deleteNote, fetchNoteAll, TypeNote } from '@/service/note.services';
import authStore from '@/store/authStore';
import { CheckCircle2, Trash2Icon, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

function ShowDataNote() {
  const router = useRouter();
  const { getUserSession } = authStore();
  const userInfo = getUserSession();
  const [data, setData] = useState<TypeNote[]>([]);

  const fetchData = async (uid: string) => {
    const res = await fetchNoteAll(uid);
    if (res && res.taskStatus && res.statusCode === 200) {
      setData(res.data);
    } else {
      toast('Load data failed', {
        description: res?.message ?? '',
        icon: <XCircle className="text-red-500" />,
      });
    }
  };

  const handleDelete = async (uid: string, noteCode: string) => {
    const res = await deleteNote(uid, noteCode);
    if (res && res.taskStatus && res.statusCode === 200) {
      toast('Delete successfully', {
        description: '',
        icon: <CheckCircle2 className="text-green-500" />,
      });
      Promise.all([fetchData(uid)]);
    } else {
      toast('Delete failed', {
        description: '',
        icon: <XCircle className="text-red-500" />,
      });
    }
  };

  useEffect(() => {
    Promise.all([fetchData(userInfo?.id ?? '')]);
  }, [userInfo]);

  const subString = (str: string) => {
    return str.length > 500 ? str.substring(0, 500) + ' ...' : str;
  };

  return (
    <div className="space-y-5 grid">
      <div className="ml-auto flex justify-end items-center gap-2">
        <Button onClick={() => router.push('/user/note/form')} size="sm" className="h-8 gap-1">
          <span>Add Note</span>
        </Button>
      </div>
      <div />
      <div id="container-card" className="cols-card">
        {data.map((item, idx) => (
          <div key={idx + 'card'} className="max-w-card max-h-fit">
            <Card>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                {/* <CardDescription className="text-pretty break-words"></CardDescription> */}
              </CardHeader>
              <CardContent>
                <MarkdownRenderer content={item.description} />
                {/* <p className="break-words text-balance">{}</p> */}
              </CardContent>
              <CardFooter className="flex justify-between">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2Icon className="icon-sm" />{' '}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account and remove your data
                        from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className={buttonVariants({ variant: 'destructive' })}
                        onClick={() => handleDelete(userInfo?.id ?? '', item.noteCode)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button
                  onClick={() => {
                    history.pushState({ noteCode: item.noteCode }, '', '/user/note/form');
                    router.push('/user/note/form');
                  }}
                >
                  Read more
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowDataNote;

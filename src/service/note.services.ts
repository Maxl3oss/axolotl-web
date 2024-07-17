'use client';

import { useAxios } from '@/lib/service';
import { IErrorAxios } from '@/types/type';

export type TypeNote = {
  id: number;
  noteCode: string;
  title: string;
  description: string;
  createdBy: string;
};

export type NoteReq = Omit<TypeNote, 'id' | 'noteCode'>;

export async function fetchNoteAll(uid: string) {
  try {
    const res = await useAxios.get(`/api/note/get-all?uid=${uid}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return (err as IErrorAxios)?.response?.data;
  }
}

export async function fetchNoteById(uid: string, code: string) {
  try {
    const res = await useAxios.get(`/api/note/get-by-id?id=${code}&uid=${uid}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return (err as IErrorAxios)?.response?.data;
  }
}

export async function createNote(data: NoteReq) {
  try {
    const res = await useAxios.post(`/api/note/create`, data);
    return res.data;
  } catch (err) {
    console.log(err);
    return (err as IErrorAxios)?.response?.data;
  }
}

export async function updateNote(data: TypeNote) {
  try {
    const res = await useAxios.put(`/api/note/update`, data);
    return res.data;
  } catch (err) {
    console.log(err);
    return (err as IErrorAxios)?.response?.data;
  }
}

export async function deleteNote(uid: string, code: string) {
  try {
    const res = await useAxios.delete(`/api/note/delete?id=${code}&uid=${uid}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return (err as IErrorAxios)?.response?.data;
  }
}

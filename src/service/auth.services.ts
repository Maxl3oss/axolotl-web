import { useAxios } from '@/lib/service';
import authStore, { Tokens } from '@/store/authStore';
import { IErrorAxios } from '@/types/type';

export async function fetchRefreshToken(tokens: Tokens) {
  try {
    const res = await useAxios.post(`/auth/refresh-token`, tokens);
    return res.data;
  } catch (err) {
    console.log(err);
    return (err as IErrorAxios)?.response?.data;
  }
}

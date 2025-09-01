import { editUserInfo } from "@/lib/apis/user.api";
import { useMutation } from "@tanstack/react-query";

export function useEditUserInfo() {
  return useMutation({
    mutationFn: (userInfo: { [key: string]: string }) => editUserInfo(userInfo),
  });
}

import { useMutation } from "@tanstack/react-query";
import { editUserInfo } from "../_actions/edit-user-info.action";

export function useEditUserInfo() {
  return useMutation({
    mutationFn: (userInfo: { [key: string]: string }) => editUserInfo(userInfo),
  });
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriendship,
  profileQueryKeys,
} from '../api/friends';
import { notificationQueryKeys } from '../api/notificationApi';
import { removeFriendshipById } from '../lib/friends/friendship-sse-store';

export function useFriendMutations(options?: { onSendSuccess?: () => void }) {
  const queryClient = useQueryClient();

  const invalidateFriendQueries = () => {
    void queryClient.invalidateQueries({ queryKey: profileQueryKeys.friends });
    void queryClient.invalidateQueries({ queryKey: profileQueryKeys.friendsPending });
    void queryClient.invalidateQueries({ queryKey: notificationQueryKeys.inbox });
  };

  const sendRequestMutation = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      options?.onSendSuccess?.();
      invalidateFriendQueries();
    },
  });

  const acceptMutation = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      invalidateFriendQueries();
    },
  });

  const rejectMutation = useMutation({
    mutationFn: rejectFriendRequest,
    onSuccess: (_, rowId) => {
      removeFriendshipById(rowId);
      invalidateFriendQueries();
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeFriendship,
    onSuccess: (_, rowId) => {
      removeFriendshipById(rowId);
      invalidateFriendQueries();
    },
  });

  return {
    sendRequestMutation,
    acceptMutation,
    rejectMutation,
    removeMutation,
  };
}

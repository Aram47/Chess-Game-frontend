import { useFriends } from "../../../helpers/useFriends";

export const FriendsList = () => {
  const { data: friends = [], isLoading } = useFriends();

  if (isLoading) {
    return <p className="text-gray-500 p-4">Loading friends...</p>;
  }

  return (
    <div className="bg-[#1C1C1C] border border-[#CEB86E33] rounded-[20px] p-4">
      <h3 className="text-white mb-4 font-bold">Friends ({friends.length})</h3>

      <div className="flex flex-col gap-y-3">
        {friends.length === 0 ? (
          <p className="text-gray-500 text-sm italic">No friends found.</p>
        ) : (
          friends.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center justify-between bg-[#252525] p-3 rounded-xl"
            >
              <div className="flex items-center gap-x-3">
                <div className="w-8 h-8 bg-[#B7A362] rounded-full flex items-center justify-center text-xs font-bold text-black">
                  {friend.otherUser.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm text-white font-medium">
                    {friend.otherUser.username}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    ELO: {friend.otherUser.elo}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

import { useQueryClient } from 'react-query';
import { Account } from 'types/account';

const useUserProfile = () => {
  const queryClient = useQueryClient();
  return queryClient.getQueryData<Account>('profile');
};

export default useUserProfile;

import { useUsersQuery } from '../generated/graphql';

export function UsersPage() {
  const { loading, error, data } = useUsersQuery();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(data);

  return (
    <div>
      {data!.users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </div>
  );
}

import { Card, CardContent } from '@shared/components/ui/card';
import { Avatar, AvatarImage } from '@shared/components/ui/avatar';
import { FakeUser } from '@/type';

/**
 * Renders a user card component with the provided FakeUser data.
 *
 * @param {{ u: FakeUser }} props - An object containing the FakeUser data
 * @return {JSX.Element} The user card component
 */
export const UserCard = (props: { u: FakeUser }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Card className="w-full p-5 sm:w-[350px] md:w-[500px]">
        <CardContent>
          <Avatar className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 object-cover">
            <AvatarImage
              className="h-full w-full rounded-full border-none object-cover"
              src={props.u?.picture.medium}
              alt={'avatar'}
            />
          </Avatar>
          <div className="mt-2">
            <p className="text-l font-bold">
              {props.u?.name.first} {props.u?.name.last}
            </p>
            <p className="text-md text-gray-400">{props.u?.email} </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

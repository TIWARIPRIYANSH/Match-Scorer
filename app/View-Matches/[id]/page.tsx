import { connectdb } from '@/lib/mongodb';
import Match from '@/model/match';
import ViewMatch from '../../../components/ViewMatch';

const MatchDetailsPage = async ({ params }: { params: { id: string } }) => {
  await connectdb();
      const match = await Match.findById(params.id);
     const plainMatch = JSON.parse(JSON.stringify(match)); // strip Mongoose stuff -> help in get rid of maximum callstack
    return <ViewMatch match={plainMatch} />;

  // const match = await Match.findById(params.id);
  // console.log(`give match in page ${match}`);
  // const name=match.matchName;
  // return (
  //   <>
  //   <h1>Hellow</h1>
  //   <ViewMatch match={match}></ViewMatch>
  //   </>
  // );
};


export default MatchDetailsPage;
